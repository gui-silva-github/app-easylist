import { SafeAreaView, View, StyleSheet, Text, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native';
import ShoppingItem from './components/ShoppingItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from './firebase/index';

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addShoppingItem = async() => {
    try {
      await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false
      });
      setTitle("");
      await getShoppingList(); // Chamada para atualizar a lista
    } catch (e) {
      console.error("Erro: ", e);
    }
  };

  const getShoppingList = async() => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        ...doc.data(),
        id: doc.id
      });
    });
    setShoppingList(items); // Atualiza o estado com todos os itens
  };

  const deleteShoppingList = async() => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    await Promise.all(querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id))));
    getShoppingList(); // Atualiza a lista após deletar
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Easy List</Text>
        <Text style={styles.noOfItems}>{shoppingList.length}</Text>
        <Pressable style={styles.button} onPress={deleteShoppingList}>
          <MaterialIcons name="delete" size={30} color="black"/>
        </Pressable>
      </View>

      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({item}) => (
            <ShoppingItem 
              title={item.title} 
              isChecked={item.isChecked} 
              id={item.id}
              getShoppingList={getShoppingList}
            />
          )}
          keyExtractor={(item) => item.id} // Chave única para cada item
        />
      ) : (
        <ActivityIndicator/>
      )}

      <TextInput
        placeholder='Item de compra'
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  heading: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "500",
    flex: 1
  },
  noOfItems: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20
  },
  button: {
    marginTop: 50
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 50
  }
});

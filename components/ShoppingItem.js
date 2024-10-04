import { StyleSheet, Pressable, View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { db, doc, updateDoc, deleteDoc } from "../firebase/index"

const ShoppingItem = (props) =>{

    const [isChecked, setIsChecked] = useState(props.isChecked)

    const updateIsChecked = async()=> {
        const shoppingRef = doc(db, "shopping", props.id)

        await updateDoc(shoppingRef, {
            isChecked: isChecked
        })
    }

    const deleteShoppingItem = async() => {
        await deleteDoc(doc(db, "shopping", props.id))
        props.getShoppingList()
    }

    useEffect(()=>{
        updateIsChecked()
    }, [isChecked])

    return(
        <View style={styles.container}>

            <Pressable onPress={()=> setIsChecked(!isChecked)}>
                {
                    isChecked ? ( 
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    )
                }
                
            </Pressable>

            <Text style={styles.title}>{props.title}</Text>

            <Pressable onPress={deleteShoppingItem}>
                <MaterialIcons name="delete" size={24} color="black" />
            </Pressable>

        </View>
    )

}

export default ShoppingItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "lightgray",
        justifyContent: "space-between",
        padding: 10, 
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 500
    }
})
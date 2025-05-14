import {useContext, useEffect, useState} from "react";
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SafeAreaView } from "react-native-safe-area-context";
import { storage } from "@/data/data";
import { UserContextPre } from "@/hook/context";
import PressableRipple from "../PressableRipple";
import * as Haptics from 'expo-haptics';
const Header = ({setAppearPopup, appearPopUp, setAppearSideBar}) =>{
    const {data, setData} = useContext(UserContextPre);
    const clear = ()=>{
        console.log('clear');
        
        storage.clearAll();
        setData([]);
        

    }
    const handleSideBarBtn = () =>{
        console.log('toggle sideBar');
        
        setAppearSideBar(true)
    }

    return(
        <SafeAreaView>
            <View style={styles.headerView}> 
                <PressableRipple margin={[0,0,0,0]} wide={''} radius={100} style={styles.edit} onPress={()=>{Haptics.selectionAsync();
                handleSideBarBtn();}}>
                    <FontAwesome6 name="bars" size={24} color="black" />                
                </PressableRipple>
                <PressableRipple margin={[0,0,0,0]} wide={''} radius={100} style={styles.edit} onPress={()=>{Haptics.selectionAsync(); setAppearPopup(appearPopUp ? false : true)}}>
                    <Feather name="plus" size={24} color="black"/>
    
                </PressableRipple>
                
                
            </View>
        </SafeAreaView>
    )    
}

export default Header

const styles = StyleSheet.create({
    headerView : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    edit : {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

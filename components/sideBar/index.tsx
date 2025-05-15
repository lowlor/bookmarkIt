import { Text,Pressable, View, StyleSheet, Alert,Animated } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Dispatch, SetStateAction, useContext,useEffect,useState,useRef } from "react";
import { UserContext } from "@/hook/context";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PressableRipple from "../PressableRipple";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { data } from "@/app/(tabs)";
import { exportFile } from "@/data/data";
interface SideBarSet {
    setSideBar : Dispatch<SetStateAction<boolean>>;
}
export 

const SideBar = ({setSideBar} : SideBarSet) =>{
    const {setData} = UserContext();
    const value = useRef(new Animated.Value(-300)).current;
    const valuePress = useRef(new Animated.Value(-300)).current;
    const opacityAni = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const styles = stylesSheet(insets.top,insets.left);

    const backgroundColor = opacityAni.interpolate({
        inputRange: [0,0.5],
        outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']
    });

    const clear = () =>{
        Alert.alert('Warning','Do you want to remove all of data',
            [{
                text: 'Yes',
                onPress: ()=>setData([]),
                
            },
            {
                text: 'No',
                onPress: ()=> null
            }]
        )
    }

    const handleExport = () =>{


        Alert.alert('Warning','Do you want to export data?',
            [{
                text: 'Yes',
                onPress: ()=>exportFile(),
                
            },
            {
                text: 'No',
                onPress: ()=> null
            }]
        )
    }
    const handleClose = () =>{
        Animated.timing(opacityAni,{
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
        Animated.timing(value,{
            toValue: -300,
            duration: 200,
            useNativeDriver: false
        }).start(()=>{
            setSideBar(false);
        })

    }

    useEffect(()=>{
        Animated.timing(opacityAni,{
            toValue: 0.5,
            duration: 300,
            useNativeDriver: false
        }).start();
        Animated.timing(value,{
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
         Animated.timing(valuePress,{
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
        return()=>{

        };
    },[])
    return(
        
            <Pressable onPress={handleClose} style={styles.wrapper}>
                <Animated.View style={[styles.wrapper,{backgroundColor: backgroundColor}]}>
                    <Pressable onPress={(e: any)=> e.stopPropagation()} style={{width:300,height:'100%'}}>
                        <Animated.View style= {[styles.container,{left:value}]}>
                            <Text style={styles.nameText}>Bookmark</Text>
                            <Text style={styles.desText}>Welcome to bookmarking application</Text>
                            <View style={styles.seperator}></View>
                            <PressableRipple auto={false} margin={[5,0,0,20]} wide={'80%'} onPress={clear} radius={50} style={styles.itemContainer}>
                            <FontAwesome5 name="trash" size={24} color="black" />
                            <Text>Remove Data</Text>
                            </PressableRipple>
                            <PressableRipple auto={false} margin={[5,0,0,20]} wide={'80%'} onPress={handleExport} radius={50} style={styles.itemContainer}>
                            <MaterialCommunityIcons name="exit-to-app" size={24} color="black" />
                            <Text>Export Data</Text>
                            </PressableRipple>
                        </Animated.View>                      
                    </Pressable>
                </Animated.View>
            </Pressable>

    )
}

export default SideBar

const stylesSheet = (insetsTop: number, insetsBottom: number) =>{
    return StyleSheet.create({
        wrapper : {
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: 0,
            
        },
        container : {
            height: '100%',
            width: 300,
            position: 'absolute',
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,1)',
            paddingTop: insetsTop,
            
        },
        seperator: {
            height: 2,
            width: '100%',
            backgroundColor: '#bababa',
            marginTop: 10
        },
        itemContainer : {
            height: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
        },
        itemWrapper :{
            marginLeft: 10,
            marginTop: 10
        },
        nameText : {
            fontSize: 30,
            paddingHorizontal: 10
        },
        desText : {
            paddingHorizontal: 10,
            fontSize: 16
        }
    })
}


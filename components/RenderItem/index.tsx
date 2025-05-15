import { data, userContextType } from "@/app/(tabs)";
import { UserContext, UserContextPre } from "@/hook/context";
import { LinkingContext } from "@react-navigation/native";
import { useContext,useEffect,useState } from "react";
import {FlatList, StyleSheet, Alert, Linking, Pressable, View, Image, Text, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker'
import PressableRipple from '../../components/PressableRipple';
import { ensure } from "@/utils/helper";
import Animated, { interpolate,interpolateColor, LinearTransition, useAnimatedStyle, useSharedValue, withSpring, withTiming ,Easing  } from "react-native-reanimated";


const RenderItem = ({ temporary, item, handleEditBtnIni, handleDeleteBtn, handleSaveBtn, goUrl, handleTextChange, editPhoto } : any) =>{
    const value = useSharedValue(item.isEdit ? 1 : 0)
    const valueStyle = useAnimatedStyle(()=>{
        
        return{
            backgroundColor: interpolateColor(value.value,[0,1],['#fff','#bababa'])
        }
    })
    const unEdit  = () =>{
        return(
                        <>
                                                  <View>
                            <Image style={styles.imageList} source={{uri: item.imagePath}}></Image>
                          </View>
                          <View style={styles.listSub1Container}>
                            <Text style={styles.episode}>{item.episode}</Text>
                            <View>
                              <Text style={styles.name}>{item.name}</Text>
                              {item.altName ?<Text style={styles.altName}>{item.altName}</Text> : <></>}
            
                              <View style={styles.seperator}></View>
                            </View>
                            <View style={styles.listSub2Container}>
                              
                             
                              
                            </View>
                          </View>

                        </>
                    
        )
    }
 
    const edit = () =>{
        return(
            <>
            <View>
                <Pressable onPress={()=>editPhoto(item.id)}>
                  <Image style={styles.imageList} source={{uri: ensure(ensure(temporary).find((x : any )=> x.id === item.id)).imagePath}}></Image>
                </Pressable>
              </View>
              <View style={styles.listSub1Container}>
                <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'name')} style={styles.editInput}
                  value={ensure(ensure(temporary).find((x : any )=> x.id === item.id)).name} keyboardType='default'/>
                  <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'altName')} style={styles.editInput}
                  value={ensure(ensure(temporary).find((x :any) => x.id === item.id)).altName} keyboardType='default'/>
                <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'episode')} style={styles.editInput}
                  value={ensure(ensure(temporary).find((x : any) => x.id === item.id)).episode.toString()} keyboardType='default'/>
                <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'link')} style={styles.editInput}
                  value={ensure(ensure(temporary).find((x : any) => x.id === item.id)).link} keyboardType='default'/>

                <Pressable>
                  <View style={styles.listSub2Container}>      
                      <PressableRipple auto={false} margin={[0,0,0,0]} wide={''} radius={100} onPress={()=>handleDeleteBtn(item.id)} style={styles.editStyle}>
                        <FontAwesome5 name="trash" size={24} color="black" />
                      </PressableRipple>
                      <PressableRipple auto={false} margin={[0,0,0,0]} wide={''} radius={100} onPress={()=>handleSaveBtn(item.id)} style={styles.editStyle}>
                        <FontAwesome5 name="check" size={24} color="black" />
                      </PressableRipple>
                      <PressableRipple auto={false} margin={[0,0,0,0]} wide={''} radius={100} onPress={()=>handleEditBtnIni(item.id,false)} style={styles.editStyle}>
                        <FontAwesome6 name="xmark" size={30} color="black" />
                      </PressableRipple>
                  </View>
                </Pressable>
              </View>
            </>
              
        )
    }
    
    useEffect(()=>{
        console.log('run it');
        
        if(item.isEdit){
            value.value = withTiming(1,{duration: 100,easing: Easing.ease})
        }else{
            value.value = withTiming(0,{duration: 100,easing: Easing.ease})

        }
    },[item.isEdit])

    return(
        <Animated.View style={[styles.listContainer,valueStyle]}>
            {item.isEdit
            ? 
            <Pressable style={styles.listContentContainer}>
                    {edit()}
            </Pressable>
            :
            <Pressable android_ripple={{color:'#111', borderless: false, radius: undefined, foreground: true}} style={styles.listContentContainer} onPress={()=>goUrl(item.link)} onLongPress={()=>handleEditBtnIni(item.id,true)}>
                    {unEdit()}
            </Pressable>
            }
           
        </Animated.View>
    )
}

export default RenderItem
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  //---------------------flat section
  listContainer: {
    height: 200,
    width: '95%',
    borderRadius: 40,
    marginVertical: 0,
    marginHorizontal: 'auto',
    marginBottom: 10,
    overflow: 'hidden'
  },
 listContentContainer: {

    height: 200,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    
    gap: 20,
    
  },
  imageList : {
    height: 180,
    width: 180,
    borderRadius: 35,
    borderWidth: 2
  },
  listSub1Container : {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  listSub2Container : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    alignItems: 'flex-end'
    
  },
  listEditBtn : {
    borderRadius: 20
  },
  flatListStyle : {
    width: '100%',
    flexGrow: 1,
    marginTop: 10,
  },
  editStyle : {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50
  },
  editInput: {
    borderColor: '#fff',
    fontSize:15,
    color: 'white',
    width:140,
    borderWidth: 2,
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: 'black'
  },
  name: {
    fontSize: 18,
    width: 160,
    marginBottom: 1
  },
  altName: {
    fontSize: 14,
    color: 'gray',
    width: 160,
    marginBottom: 4
  },
  seperator :{
    borderTopWidth: 2,
    borderColor: 'gray',
    width: 140
  },
  episode: {
    fontSize: 80,
    position: 'absolute',
    bottom: -20,
    right: 20,
    opacity: 0.1,
    zIndex: -2,
    padding: 0,
    margin: 0
  }
 //--------------------- end of flat section
  
});

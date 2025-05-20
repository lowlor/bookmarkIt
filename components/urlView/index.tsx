import { data, userContextType } from "@/app/(tabs)";
import { UserContext, UserContextPre } from "@/hook/context";
import { LinkingContext } from "@react-navigation/native";
import { useContext,useState } from "react";
import {FlatList, StyleSheet, Alert, Linking, Pressable, View, Image, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker'
import PressableRipple from '../PressableRipple';
import { ensure } from "@/utils/helper";
import RenderItem from "../RenderItem";
import Animated, { interpolate,interpolateColor, LinearTransition, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type vStyle = {
    id : number;
}

const UrlView = () =>{
    const {data, setData, temporary, setTemporary} = UserContext();
    const handleEditBtn = (id: number) =>{
    
    }

    
    const handleEditBtnIni = (id : number, toOpen : boolean) =>{
      if(data){
        const dataToChange = data.filter((curr)=> curr.id === id);
        const dataWithOutWant = data.filter((curr)=> curr.id != id);

      
      
        if(toOpen){
          dataToChange[0].isEdit = true;
          console.log('go this ----------------------------------- trigger open edit color');
          
      
        }else{
          dataToChange[0].isEdit = false;
          console.log('go this ----------------------------------- trigger unedit color');
      

        }
        console.log(data);
        const dataToPut = [...dataWithOutWant, dataToChange[0]];

        setData(dataToPut.sort((a:data,b:data)=>a.id-b.id))

      }else{
        console.error('error occur');
        
      }
    }
    
    const handleChangeDate = async(id: number, date : Date) =>{
        const dataToPut = temporary?.find(curr => curr.id === id);
        const allData = temporary?.filter(curr=> curr.id != id);
        if(dataToPut && allData){
          dataToPut.date = date;
          setTemporary([...allData,dataToPut ])

        }
    }
    const editPhoto = async(id : number) =>{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 1
        })

        console.log(result);

        if(!result.canceled){
          const dataToPut = temporary?.find(curr => curr.id === id);
          
          const data = temporary?.filter(curr=> curr.id != id);
          if(data&&dataToPut){
            dataToPut.imagePath = result.assets[0].uri;
            setTemporary([...data,dataToPut])

          }
        }
        
    }

    
    const handleDeleteBtn = (id : number) =>{
      Alert.alert('Are you sure?','Do you really want to delete this item?',
        [{text: 'Yes', onPress: ()=>{setData(data?.filter(curr=>curr.id!=id))}},
          {text: 'No', onPress: ()=>null}
        ])
    }

    const handleSaveBtn = (id: number) =>{
      console.log(id);
      
      const dataToPut = temporary?.filter(curr => curr.id === id);
    
      const dataToExclude = data?.filter(curr=> curr.id != id);
      if(dataToPut && dataToExclude){
        dataToPut[0].isEdit = false;
        //setData(data?.map((curr)=> curr.id === id ? dataToPut[0] : curr ))
        setData([...dataToExclude, dataToPut[0]])
        
        
      }
      
    }
    const goUrl = async(url : string) =>{
        const isSupported = await Linking.canOpenURL(url)
        if(isSupported){
            await Linking.openURL(url)
        }else{
            Alert.alert('Cannot Open',`Url is incorrect which is ${url}`,[{
                text: 'OK', onPress: ()=> null
            }])
        }
    }
    
    const handleTextChange = (text: string, id : number, value : string) =>{
      setTemporary(prev => prev?.map(curr=> curr.id === id ?  {...curr, [value] : text} :  curr))
    }

    
  
      return (
            
                  <Animated.FlatList 
                    data={data}
                    renderItem={({item})=><RenderItem temporary={temporary} item={item} handleEditBtnIni={handleEditBtnIni} handleDeleteBtn={handleDeleteBtn} handleSaveBtn={handleSaveBtn} goUrl={goUrl} handleTextChange={handleTextChange} editPhoto={editPhoto} handleChangeDate={handleChangeDate}></RenderItem>}
                    keyExtractor={item=>item.id.toString()}
                    contentContainerStyle={styles.flatListStyle}
                    itemLayoutAnimation={LinearTransition}
                    />
                 
      )

}

export default UrlView

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    marginVertical: 0,
    marginHorizontal: 'auto',
    gap: 20,
    marginBottom: 10
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
    paddingBottom: 300
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

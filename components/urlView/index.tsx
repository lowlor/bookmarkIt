import { data, userContextType } from "@/app/(tabs)";
import { UserContext, UserContextPre } from "@/hook/context";
import { LinkingContext } from "@react-navigation/native";
import { useContext,useState } from "react";
import {FlatList, StyleSheet, Alert, Linking, Pressable, View, Image, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker'
import PressableRipple from '../../components/PressableRipple';
import { ensure } from "@/utils/helper";
const UrlView = () =>{
    const [editPress, setEditPress] = useState<Boolean>(false);
    const {data, setData, temporary, setTemporary} = UserContext();
    const [image,setImage] = useState<string>();
    const [text, setText] = useState<string>('');
    const [episode, setEpisode] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const handleEditBtn = (id: number) =>{
    
    }
    const handleEditBtnIni = (id : number, toOpen : boolean) =>{
      if(data){
        const dataToChange = data.filter((curr)=> curr.id === id);
        const dataWithOutWant = data.filter((curr)=> curr.id != id);
        if(toOpen){
          dataToChange[0].isEdit = true;
        }else{
          dataToChange[0].isEdit = false;
        }
        console.log(data);
        const dataToPut = [...dataWithOutWant, dataToChange[0]];

        setData(dataToPut.sort((a:data,b:data)=>a.id-b.id))

      }else{
        console.error('error occur');
        
      }
    }
    
    const editPhoto = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 1
        })

        console.log(result);

        if(!result.canceled){
          setImage(result.assets[0].uri)
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
        if(image){
          dataToPut[0].imagePath = image;
        }
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

    const toRenderUnEdit = (item : data)=>{
      console.log('then render item');
        return(
          <View>
            <Pressable style={styles.listContainer} onPress={()=>goUrl(item.link)} onLongPress={()=>handleEditBtnIni(item.id,true)}>
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
            </Pressable>
          </View>
    
        )
      }
    
      const toRenderEdit = (item : data)=>{
        return(
          <View>
            <Pressable style={styles.listEditContainer}>
              <View>
                <Pressable onPress={()=>editPhoto()}>
                  <Image style={styles.imageList} source={image ? {uri: image} : {uri: item.imagePath}}></Image>
                </Pressable>
              </View>
              <View style={styles.listSub1Container}>
                <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'name')} style={styles.editInput}
                  value={ensure(ensure(temporary).find(x => x.id === item.id)).name} keyboardType='default'/>
                  <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'altName')} style={styles.editInput}
                  value={ensure(ensure(temporary).find(x => x.id === item.id)).altName} keyboardType='default'/>
                <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'episode')} style={styles.editInput}
                  value={ensure(ensure(temporary).find(x => x.id === item.id)).episode.toString()} keyboardType='default'/>
                <TextInput onChangeText={(v)=>handleTextChange(v,item.id,'link')} style={styles.editInput}
                  value={ensure(ensure(temporary).find(x => x.id === item.id)).link} keyboardType='default'/>

                <Pressable onPress={()=>handleEditBtn(item.id)}>
                  <View style={styles.listSub2Container}>      
                      <PressableRipple margin={[0,0,0,0]} wide={''} radius={100} onPress={()=>handleDeleteBtn(item.id)} style={styles.editStyle}>
                        <FontAwesome5 name="trash" size={24} color="black" />
                      </PressableRipple>
                      <PressableRipple margin={[0,0,0,0]} wide={''} radius={100} onPress={()=>handleSaveBtn(item.id)} style={styles.editStyle}>
                        <FontAwesome5 name="check" size={24} color="black" />
                      </PressableRipple>
                      <PressableRipple margin={[0,0,0,0]} wide={''} radius={100} onPress={()=>handleEditBtnIni(item.id,false)} style={styles.editStyle}>
                        <FontAwesome6 name="xmark" size={30} color="black" />
                      </PressableRipple>
                  </View>
                </Pressable>
              </View>
            </Pressable>
          </View>
    
        )
    
        
      }

      return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?  'padding' : 'height'}
          style={{flex:1, height:'100%'}} keyboardVerticalOffset={1000} >
                  <FlatList 
                    data={data}
                    renderItem={({item})=>item.isEdit ? toRenderEdit(item): toRenderUnEdit(item)}
                    keyExtractor={item=>item.id.toString()}
                    contentContainerStyle={styles.flatListStyle}
                    />
        </KeyboardAvoidingView>
        
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
    backgroundColor: 'white',
    marginVertical: 0,
    marginHorizontal: 'auto',
    gap: 20,
    marginBottom: 10
  },
  listEditContainer: {
    height: 200,
    width: '95%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#bababa',
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

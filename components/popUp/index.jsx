import {StyleSheet,BackHandler,View, Text ,TextInput,Pressable,Image, Alert, Animated}  from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, UserContextPre } from '@/hook/context';
import * as Haptics from 'expo-haptics'
const PopUp = ({setAppearPopUp}) =>{
    const [episode, setEpisode] = useState(0);
    const [name, setName] = useState('');
    const [altName, setAltName] = useState('');

    const [link, setLink] = useState('');
    const {data, setData,setTemporary} = UserContext(); 
    const [image, setImage] = useState(null);
    const value = useRef(new Animated.Value(-600)).current;
    const opacityValue = useRef(new Animated.Value(0)).current;
    const check

    const pickImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        })

        console.log(result);

        
        if(!result.canceled){
            setImage(result.assets[0].uri)
        }
    }
    const style = styles(); 
    console.log(data);
    
    const handleSave = () =>{
        const save = () =>{
            let idToPut = '';
            if(data.length > 0){
                idToPut = data[data.length-1].id + 1;
            }else{
                idToPut = data.length + 1
            }
            const toPut = [...data, 
                {
                    id : idToPut,
                    name : name,
                    altName: altName,
                    imagePath : image,
                    episode: episode,
                    isEdit: false,
                    link: link
                }
            ]
            Animated.timing(value,{
            toValue: -600,
            duration: 200,
            useNativeDriver: false
            }).start(()=>{
                console.log(toPut);
                setData(toPut);
                setTemporary(toPut);
                setAppearPopUp(false);

            })
        }
        Haptics.selectionAsync()
        Alert.alert('save message','Do you want to save this to bookmark?',[
            {text: 'Yes', onPress : ()=>{save()}},
            {text : 'No' , onPress: ()=>null}
            ])
        
        
    }

    
    useEffect(()=>{
        console.log('tst');
        Animated.timing(value,{
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
        Animated.timing(opacityValue,{
            toValue: 0.5,
            duration: 200,
            useNativeDriver: false
        }).start()
    
        const exitFunc = () =>{
            Alert.alert('You want to go back?','go back?',[
                {
                    text: 'Cancel',
                    onPress: () => null
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        Animated.timing(value,{
                        toValue: -700,
                        duration: 200,
                        useNativeDriver: false}).start(()=>{
                            setAppearPopUp(false)
                        })
                        }
                }]);
            return true;
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            exitFunc
        )

        return ()=>{
            backHandler.remove();
        }
    },[])

    


    return (
        <Animated.View style={style.overlay}>
            <Animated.View style={[style.container,{bottom: value}]}>
                {image ?
                <Pressable style={style.imageInput} onPress={pickImage}>
                    <Image style={style.previewImage} source={{uri: image}}/>
                </Pressable>
                  :
                 <Pressable style={style.imageInput} onPress={pickImage}></Pressable>}
                
                <View style={[style.inputContainer]}>
                    <Text style={style.text}>Name</Text>
                    <TextInput 
                        style= {style.textInput}
                        onChangeText={setName}
                        value={name}
                        keyboardType='default'
                    />
                </View>
                <View style={[style.inputContainer]}>
                    <Text style={style.text}>Alternate Name</Text>
                    <TextInput 
                        style= {style.textInput}
                        onChangeText={setAltName}
                        value={altName}
                        keyboardType='default'
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.text}>Link</Text>
                    <TextInput
                        style= {style.linkInput}
                        onChangeText = {setLink}
                        value={link}
                        keyboardType='default' 
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.text}>Start With</Text>
                    <TextInput 
                        style= {style.numberInput}
                        onChangeText={setEpisode}
                        value={episode}
                        keyboardType='decimal-pad'/>
                </View>
                <View style={style.saveBtnContainer}>
                    <Pressable android_ripple={{
                        color: '#1d1111',
                        borderless: false,
                        radius: undefined,
                        foreground: true
                    }} style={({pressed})=>[style.saveBtn]} onPress={handleSave}><Text style={style.text}>Save</Text></Pressable>

                </View>
                
              
            </Animated.View>
        </Animated.View>
    )
}

export default PopUp;
const styles = () =>{
    return StyleSheet.create({
        text : {
            color: 'white',
            fontSize: 20
        },
        textInput : {
            borderColor: 'white',
            borderRadius: 20,
            borderWidth: 2,
            width: '90%',
            height: 40,
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 10,
            fontSize: 16
        },
        numberInput : {
            borderColor: 'white',
            borderRadius: 20,
            borderWidth: 2,
            width: '90%',
            height: 40,
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 10,
            fontSize: 16
        },
        linkInput : {
            borderColor: 'white',
            borderRadius: 20,
            borderWidth: 2,
            width: '90%',
            height: 40,
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 10,
            fontSize: 16
        },
        imageInput : {
            backgroundColor: 'white',
            width : 350,
            height: 350,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',

        },
        container : {
            backgroundColor: '#ff9494',
            width : '100%',
            height: 700,
            borderTopLeftRadius : 20,
            borderTopRightRadius: 20,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            opacity: 0.8
        },
        previewImage : {
            width: 350,
            height: 350,
            borderRadius: 50,
            opacity: 1
        },
        previewFrame : {
            width: 400,
            height: 400,
            backgroundColor: 'white'
        },
        overlay: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(218, 255, 171,0.2)',
            zIndex: 10
        },
        saveBtn: {
            height: 50,
            width: 200,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            transitionDuration: '.5s',
           
        },
        saveBtnPress: {
            backgroundColor: 'white'
        },
        inputContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        saveBtnContainer : {
            marginTop: 10,
            borderRadius: 60,
            overflow: 'hidden',
            alignItems: 'center'
        }
        
    })
}
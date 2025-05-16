import { MMKV } from "react-native-mmkv";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import { Alert } from "react-native";
import { data } from "@/app/(tabs)";
export const storage = new MMKV({
    id: `bookmark-storage`
})

export const exportFile = async()=>{
    const rest = storage.getString('item')
    let a;

    if(rest){
        a = JSON.parse(rest)
    }
    
    console.log(a);
    
    const {status} = await MediaLibrary.requestPermissionsAsync();
    
    if(status != 'granted'){
        return Alert.alert('Cannot Export', 'Not granted permission to save',[{text:'OK' , onPress:()=>null}]);

        
    }else{
        console.log('granted');
        
        const fileUri = `${FileSystem.documentDirectory}save.json`;
        await FileSystem.writeAsStringAsync(fileUri,JSON.stringify(a))
        console.log('file wrtiiten to ',fileUri);
        
        const checkShare = await Sharing.isAvailableAsync();
        if(!checkShare){
            return Alert.alert('Cannot Export', 'Not granted permission to save',[{text:'OK' , onPress:()=>null}]);
        }

        await Sharing.shareAsync(fileUri,{
            mimeType: 'application/json',
            dialogTitle:'Save Bookmark file'
        })
        console.log('ok');
        

    }
    

}

export const importFile = async () =>{
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/json'
        })
        
        if(!result.canceled){
            const text = FileSystem.readAsStringAsync(result.assets[0].uri)
            return text;
            
            
        }
    } catch (error) {
        
    }

    
}
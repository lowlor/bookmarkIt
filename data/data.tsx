import { MMKV } from "react-native-mmkv";
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
export const storage = new MMKV({
    id: `bookmark-storage`
})

export const exportFile = ()=>{
    console.log('export file');
    const {status} = await 
    FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}save.json`,'hello')
    console.log('export file');

}
import { Image,Text, StyleSheet, Platform, FlatList,View, Pressable, KeyboardAvoidingView} from 'react-native';
import { storage } from '@/data/data';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Header from '../../components/header';
import PopUp from '../../components/popUp';
import { UserContextPre } from '@/hook/context';
import UrlView from '@/components/urlView';
import SideBar from '@/components/sideBar';

export type data = {
  id: number;
  episode : number;
  name : string;
  altName : string;
  imagePath: string;
  link : string;
  isEdit : boolean;

}

export type userContextType = {
  data : data[] | undefined;
  setData : Dispatch<SetStateAction<data[] | undefined>> ;
  temporary : data[] | undefined;
  setTemporary : Dispatch<SetStateAction<data[] | undefined>> ;
}


export default function HomeScreen() {
  const [data, setData] = useState<data[]>(); 
  const [temporary, setTemporary] = useState<data[]>();
  const [appearPopUp, setAppearPopup] = useState(false);
  const [appearSideBar, setAppearSideBar] = useState(false);
  const [isEdit,setIsEdit] = useState(false);

  useEffect(()=>{
    console.log('log initial');
    
    const fetchData = async() =>{
      const jsonData = storage.getString('item');
      console.log(jsonData);
      
      if(jsonData){
        const dataToPut = JSON.parse(jsonData);
        console.log(dataToPut.sort((a:data,b:data)=> a.id-b.id));
        console.log('resort data');
        setTemporary(dataToPut.sort((a:data,b:data)=> a.id-b.id));
        setData(dataToPut.sort((a:data,b:data)=> a.id-b.id));
      }else{
        console.log('no go to set blank');
        setData([])
      }
      
    }
    fetchData()
  },[])

  useEffect(()=>{
    const saveData = async() =>{
      console.log(data);
      const dataToPut = data?.sort((a:data,b:data)=>a.id - b.id)
      console.log('---------');
      
      console.log(dataToPut);
      console.log('---------');
      console.log('sort data to save');
      
      
      if(data){
        storage.set('item',JSON.stringify(dataToPut))
        
      }else {
        console.log('data empty');
        
        
      }
            
    }
    saveData()
  },[data])

  
  
  console.log('re main page');
  
  return (
    <UserContextPre.Provider value={{data, setData,temporary,setTemporary}}>
      <SafeAreaProvider>
          {appearPopUp ? <PopUp setAppearPopUp={setAppearPopup}></PopUp> : appearSideBar ? <SideBar setSideBar={setAppearSideBar}></SideBar>:<></>}
          <Header setAppearSideBar={setAppearSideBar} appearPopUp={appearPopUp} setAppearPopup={setAppearPopup}></Header>
          <UrlView></UrlView> 
      </SafeAreaProvider>
    </UserContextPre.Provider>
    
  )
}

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
  
});

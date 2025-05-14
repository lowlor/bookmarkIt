import { data, userContextType } from "@/app/(tabs)";
import { createContext, useContext } from "react";

export const UserContextPre = createContext<userContextType | undefined>(undefined);

export const UserContext = () =>{
    const t = useContext(UserContextPre);
    console.log(t);
    
    if(t === undefined){
        throw new Error('error')
    }

    return t;
}
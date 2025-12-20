import { useEffect, useState } from "react";
import { createContext } from "react";

export let UserContext= createContext();
export function UserContextProvider(props){

    const [userLogin, setuserLogin] = useState(null);
    useEffect(()=>{
         if(localStorage.getItem('userToken')!==null)
         {
            setuserLogin(localStorage.getItem('userToken'))
         }
    },[])

    return <UserContext.Provider value={{userLogin,setuserLogin}}>
        {props.children}
    </UserContext.Provider>

}
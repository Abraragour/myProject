import { useState } from "react";
import { createContext } from "react";

export let CounterContext= createContext();
export function CounterContextProvider(props){

    const [counter, setcounter] = useState(0);

    return <CounterContext.Provider value={{counter}}>
        {props.children}
    </CounterContext.Provider>

}
import { createContext,useContext,useReducer } from "react";

const anecdoteReducer=(state,action)=>{
    switch(action.type){
case "SET_NOTIFICATION":
    const content = action
    console.log(content,"this is from anecdoteReducer")
    //return {message:content}
    return content.message
    case "CLEAR_NOTIFICATION":
        return null
        default:
            return state
    }
}


const AnecdoteContext =createContext()
const initalState = null

export const useMessageValue=()=>{
    const messageAndValue = useContext(AnecdoteContext)
    return messageAndValue[0]
}

export const useMessageDispatch=()=>{
    const messageAndDispatch = useContext(AnecdoteContext)
    return messageAndDispatch[1]
}


export const AnectoteContextProvider =(props)=>{
const [notification,dispatch] = useReducer(anecdoteReducer,initalState)
console.log(notification,"this is from context")
return(
    <AnecdoteContext.Provider value={[notification,dispatch]}>
        {props.children}
    </AnecdoteContext.Provider>
)
}

export default AnecdoteContext
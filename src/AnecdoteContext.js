import { createContext, useContext, useState } from "react";

const AnecdoteContext = createContext(); //create context objext
console.log(AnecdoteContext, "i am AnecdoteContext");
//const initalState = "";

export const useMessageValue = () => {
  const messageAndValue = useContext(AnecdoteContext);
  return messageAndValue[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(AnecdoteContext);
  return messageAndDispatch[1];
};

export const AnectoteContextProvider = (props) => {
  // const [notification, dispatch] = useReducer(anecdoteReducer, initalState);
  const [notification, dispatch] = useState("");
  console.log(notification, "this is from context notification");
  return (
    <AnecdoteContext.Provider value={[notification, dispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  );
};

export default AnecdoteContext;

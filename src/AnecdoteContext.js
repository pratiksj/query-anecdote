import { createContext, useContext, useState } from "react";

const AnecdoteContext = createContext(); //create context objext
console.log(AnecdoteContext, "i am AnecdoteContext");
//const initalState = "";

export const useMessageValue = () => {
  const messageAndValue = useContext(AnecdoteContext);
  return messageAndValue.notification;
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(AnecdoteContext);
  return messageAndDispatch.dispatch;
};

export const AnectoteContextProvider = (props) => {
  // const [notification, dispatch] = useReducer(anecdoteReducer, initalState);
  const [notification, dispatch] = useState("");
  console.log(notification, "this is from context notification");
  const contextValue = {
    notification,
    dispatch,
  };
  return (
    // <AnecdoteContext.Provider value={[notification, dispatch]}>
    <AnecdoteContext.Provider value={contextValue}>
      {props.children}
    </AnecdoteContext.Provider>
  );
};

export default AnecdoteContext;

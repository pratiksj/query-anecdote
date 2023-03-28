//import { useContext } from 'react'
//import AnecdoteContext from '../AnecdoteContext'
import { useMessageValue } from "../AnecdoteContext";

const Notification = () => {
  //const [notification,dispatch] = useContext(AnecdoteContext)
  const notification = useMessageValue();
  console.log(notification, "first notification");

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;

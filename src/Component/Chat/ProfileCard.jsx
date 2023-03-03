import {
  useState,
  useEffect,
  useRef,
} from "react"
import db from "./Firebase.jsx"
import "./ProfileCard.css"

export default function ProfileCard({sender,receiver}) {
  const [data,setData]=useState([])
  const pscrollTo=useRef()
  const pmess = useRef()
  const pmessin = useRef();
let username = localStorage.getItem('R1username')
const fetchChat = "users/"+sender+"/connection/"+receiver+"/messages/";
  function sendMessage(e) {
    e.preventDefault();
    const d = Date.now();
    let message = pmessin.current.value;
    if (message.length == 0)
      return;
    pmessin.current.value = "";
    let timestamp = new Date().toLocaleString()
    // create db collection and send in the data
    db.ref(fetchChat+d+sender).set({
      username,
      message,
      timestamp,
    }); 
    
    db.ref("users/"+receiver+"/connection/"+sender+ "/messages/"+d+sender).set({
      username:sender,
      message,
      timestamp,
    });
  }

  function HandleKeyPress(e){
    // e.preventDefault();
     if(e.key && e.key === 'Enter'){
       return sendMessage(e)
     }
   
   }
  useEffect(()=> {
    username = localStorage.getItem('R1username')
    async function fetch() {
      db.ref(fetchChat).on("child_added", function (snapshot) {
        const messages = snapshot.val();

        setData(data=>[...data, {
          message: messages.message, username: messages.username,
          timestamp: messages.timestamp
        }]);

      })
    }
    fetch()

  }, [])

  useEffect(()=>{
    pscrollTo.current.scrollIntoView({ behavior:"instant", block: "end", inline: "nearest" });
   
  },[data]) 
  
  return (
    <div id="ProfileCard">
    <p style={{position:"fixed",left:"40vw",transform:"translateY(-30px)"}}>
    <h2 > You are Chatting with <b>{receiver}</b></h2>
    </p> 
    <div id="chat">
     <ul id="messages">
     {
      data.map((messages, i)=>(
        <div ref={pmess} className="bdc">
      <li className={
          username === messages.username ? "sent": "receive"
          } id={messages.username}>
      <span id={messages.username}>{messages.username}: </span>{messages.message}
     </li>
     <p className={
          username === messages.username ? "times": "timer"
          } id={messages.username}>
          {messages.timestamp}
        </p>
        </div>

      )) 
      }
    <li ref={pscrollTo} ></li>
    </ul>
     <form onSubmit={(e)=>sendMessage(e)} id="message-form">
      <textarea ref={pmessin} id="message-input"
        onKeyDown={(e)=>HandleKeyPress(e)}
        ></textarea> <button id="message-btn" type="submit">Send</button>
    </form>
    </div>
    </div>
  )

}
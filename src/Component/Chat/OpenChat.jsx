import {
  useState,
  useEffect,
  useRef,
} from "react"
import db from "./Firebase"
import "./OpenChat.css"
import Card from "./Card.jsx"
import ProfileCard from "./ProfileCard.jsx"

let username = localStorage.getItem('R1username')
const fetchChat = db.ref("messages/");


let mi = 0;
export default function OpenChat({
  link1, pdata
}) {

  const [usercard,
    SetUsercard] = useState({
      isload: false, name: ""
    });
  const [data,
    setData] = useState([])
  const [prof,
    setProf] = useState({
      sender: "", receiver: ""
    });

  const scrollTo = useRef()
  const mess = useRef()
  const messin = useRef();
  //const card= useRef()

  function sendMessage(e) {
    e.preventDefault();
    const d = Date.now();
    let message = messin.current.value;
    if (message.length == 0)
      return;
    messin.current.value = "";
    let timestamp = new Date().toLocaleString()
    // create db collection and send in the data
    db.ref("messages/" + d + username).set({
      username,
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
  function cardhandler(e) {
    e.stopPropagation();
    let a = e.currentTarget.id;
    SetUsercard({
      isload: true, name: a
    });
  }
  function setFusercard() {
    SetUsercard({
      isload: false, name: username
    });
  }

  useEffect(() => {
    username = localStorage.getItem('R1username')
    /*  async function fetch() {
      fetchChat.on("child_added", function (snapshot) {
        const messages = snapshot.val();
        setData(data=>[...data, {
          message: messages.message, username: messages.username,
          timestamp: messages.timestamp
        }]);
      })
    }
   fetch()
  */


    link1.current.style.backgroundColor = "#ff0000";
    return () => link1.current.style.backgroundColor = "";
  }, [])

  useEffect(() => {
    setData(pdata);
  }, [pdata])
  useEffect(() => {
    //
    scrollTo.current.scrollIntoView({
      behavior: "instant", block: "end", inline: "nearest"
    });

  }, [data])
  function openProf(a, b) {
    setProf({
      sender: a,
      receiver: b
    })
  }


  return (
    <>

      {prof.sender ? (
        <>
          <ProfileCard sender={prof.sender}
            receiver={prof.receiver} />
        </>
      ) : (<>
        <div style={{ position: "fixed", left: "40vw", transform: "translateY(-30px)" }}>
          <h2 > Open Chat App </h2>
        </div>

        <div>
          {usercard.isload ?
            <Card openProf={openProf} usercard={usercard.name} setFusercard={setFusercard} /> : ""}
        </div>
        <div id="chat">
          <ul id="messages">
            {
              data.map((messages, i) => (
                <div ref={mess} className="bdc">
                  <li key={i.toString()} className={
                    username === messages.username ? "sent" : "receive"
                  } id={messages.username}>

                    <span id={messages.username} onClick={(e) => cardhandler(e)}>{messages.username}: </span>{messages.message}
                  </li>
                  <p className={
                    username === messages.username ? "times" : "timer"
                  } id={messages.username}>
                    {messages.timestamp}
                  </p>
                </div>

              ))
            }
            <li ref={scrollTo}>  </li>
          </ul>
          <form onSubmit={(e) => sendMessage(e)} id="message-form">
            <textarea ref={messin} id="message-input"
              onKeyDown={(e)=>HandleKeyPress(e)}
            ></textarea> <button id="message-btn" type="submit">Send</button>
          </form>
        </div> </>)}  </>
  )

}


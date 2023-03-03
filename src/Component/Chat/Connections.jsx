import {useRef,useState,useEffect} from "react"
import "./Connections.css"
import db from "./Firebase.jsx"
import Card from "./Card.jsx"
import ProfileCard from "./ProfileCard.jsx"
export default function Connection ({link2}){
const [conn,setConn]=useState([])
const [prof,setProf]=useState({sender:"",receiver:""}); 

const [searchUser,setSearchUser]=useState("");
const searchInp=useRef()
let username = localStorage.getItem('R1username')
function HandleSubmit(e){
  e.preventDefault();
  
  if(searchInp.current.value.length==0) 
  return 
 const nameS=searchInp.current.value.replace(/ /g,'');
  db.ref("users/"+nameS).on("value",snap=>{
    if(snap.exists()) 
    setSearchUser(nameS);
    else
    alert("no such user exists")
  })
}
function HandleKeyPress(e){
  if(e.key && e.key === 'Enter'){
    return HandleSubmit(e)
  }

}
function removeCard(){
  setSearchUser("");
}

useEffect(()=>{
  const fetchChat = "users/"+username+"/connection/";
  db.ref(fetchChat).on("child_added",async snapshot=>{
   // const messages = snapshot.val();
   
   const avatar=await db.ref("users/"+snapshot.key+"/details/avatar").on("value",snap=>{
       setConn(conn=>[...conn, {
      sender:username ,
      receiver:snapshot.key,
      ravatar:snap.val()
  }])
   })
   
  })
  link2.current.style.backgroundColor = "#ff0000"; 
return ()=>link2.current.style.backgroundColor = "";
},[])
function imgclk(e) {
  setSearchUser(e.target.id);
} 

function openProf (a,b){
 
  setProf({
    sender:a,
    receiver:b
  })
}
return (
  <> 
  { prof.sender? <ProfileCard sender={prof.sender} 
  receiver={prof.receiver} /> 
  :(
<div id="connection">
<div id="search" >
<input onKeyDown={(e)=>HandleKeyPress(e)} ref={searchInp}  type="text" className="search-inp" placeholder="Search Users here by their username" /> 
<button onClick={(e)=>HandleSubmit(e)} type="submit" className="search-inpbtn" >
<i className="bx bx-search icon"></i> 
</button> 
<br/>
<hr/>
{searchUser?<Card openProf={openProf} usercard={searchUser} setFusercard={removeCard}/>:""}
</div>

<div id="connected-users" >  
{conn.map((data,i)=>(
<div>
<div id="receivers">
<img onClick={(e)=>imgclk(e)} id={data.receiver} src={data.ravatar} />
 <p className={data.receiver} onClick={(e)=>openProf(username,e.target.className)}>{data.receiver}</p>
 </div>
 </div>
))
}
</div>
</div>
)}
</>
)

}
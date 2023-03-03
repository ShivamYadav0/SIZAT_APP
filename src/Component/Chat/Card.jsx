
import {useEffect,useRef} from "react"
import "./Card.css"
import db from "./Firebase.jsx"

export default function Card({openProf,usercard,setFusercard}){
  const fname=useRef();
  const uimg=useRef();
  const about=useRef();
  const cut=(e)=>{
    if(e.target.id!="ubox") 
    setFusercard();
  }
  const name = localStorage.getItem("R1username");
useEffect(()=>{
  db.ref("users/"+usercard+"/details").on("value",
  snap=>{
    uimg.current.src=snap.val().avatar
    fname.current.innerText="Full name :"+snap.val().fullName
 about.current.innerText=snap.val().about
 if(snap.val().status==1) 
 uimg.current.style.border="4px solid green"; 
 else 
 uimg.current.style.border="none"; 
  })
},[])
function Add(){
  const name = localStorage.getItem("R1username");
  if(name!=null){
 const fetchCon= db.ref("users/"+name+"/connection/"+usercard) 
 if(fetchCon){
 fetchCon.on("value",snap=>{
   if(!snap.exists())
   fetchCon.set({ 
    "join_at":Date.now()
  })
  
  openProf(name,usercard)
//  alert("yay")
 })
 }
  }
}
  return (
    <>
    <div onClick={(e)=>cut(e)} id="ucard"> 
    </div>
    <div id="ubox"> 
    
    <img ref={uimg} src="" id="uimg"/>
   <h2>username :{usercard} </h2>
  <h2> About :  <div id="about" ref={about}>  </div> </h2>
   <h2 ref={fname}> </h2>
   {usercard!=name?(
   <button onClick={Add}> Chat </button>
   ):""}
    </div>
    </>
    )
}
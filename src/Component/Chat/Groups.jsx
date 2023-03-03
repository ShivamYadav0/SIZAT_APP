
import {useEffect} from "react"

export default function Groups ({link3}){
useEffect(()=>{
  link3.current.style.backgroundColor = "#ff0000"; 
return ()=>link3.current.style.backgroundColor = "";
},[])
return (
<>
Groups 
<br/> 
This feature is not available right now
</>
)

}
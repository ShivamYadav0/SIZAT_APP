import {
  useState,
  useEffect
} from "react"
import './App.css';

import Login from "./Component/Login.jsx"
import Home from "./Component/Home.jsx"

function App() {

  const [islog,
    setLog] = useState(false)

  function LogC(value) {
    
   
    setLog(value);
  }
  useEffect(() => {

     // localStorage.removeItem("R1isLog");
    let lsg = localStorage.getItem("R1isLog");
    // alert(lsg)
    setLog(lsg);

  }, [])

  return (

    <>
      <div className="App" >

        {!islog ? <Login logC={LogC} /> : <Home logC={LogC} />
        }

      </div>
    </>
  );
}

export default App;
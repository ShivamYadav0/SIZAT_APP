import {
  useEffect,
  useState,
  useRef
} from "react"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  
} from "react-router-dom"

import "./Home.css"
import OpenChat from "./Chat/OpenChat"
import Connections from "./Chat/Connections"
import Groups from "./Chat/Groups"
import Settings from "./Chat/Settings"
import db from "./Chat/Firebase.jsx"
let uimgsrc;
let tempfname;
export default function Home({ logC }) {

  const {
    avatar,
    setAvatar
  } = useState(0)
  const {
    fullName,
    setfullName
  } = useState("");

  const [pdata,
    setpdata] = useState([])


  const body = useRef()
  const sidebar = useRef()
  const toggle = useRef()
  const searchBtn = useRef()
  const modeSwitch = useRef()
  const modeText = useRef()
  const link1 = useRef()
  const link2 = useRef()
  const link3 = useRef()
  const link4 = useRef()
  const imgup = useRef();
  const fname = useRef();
  let linkClr = "#ff34aa";

  function Loggout() {
    
    const uname = localStorage.getItem("R1username");
    localStorage.removeItem("R1isLog");
    let lg=localStorage.getItem("R1isLog")
    localStorage.removeItem("R1username");
    localStorage.removeItem("R1fullName");
    localStorage.removeItem("R1online");

    db.ref("users/" + uname + "/details/").update({
      status: 0
    }).then(() => {
      })
     setTimeout(() => {
      logC(false)
     }, 1000);
      
  }


  function toggleSH() {
    sidebar.current.classList.toggle("close");
    modeSwitch.current.classList.toggle("cl");
  }

  function SearchBt() {
    /*   sidebar.current.classNameList.remove("close");
    */
  }

  function modeSw() {
    body.current.classList.toggle("dark");

    if (body.current.classList.contains("dark")) {
      modeText.current.innerText = "Light";
      linkClr = "#ff0303";

    } else {
      modeText.current.innerText = "Dark";
      linkClr = "#ff34aa";
    }
  }
  const setfullNameF = (e) => {
    fname.current.innerText = e;
  }
  const setAvatarF = (e) => {
    imgup.current.src = e;

  }

  useEffect(() => {
    tempfname = localStorage.getItem("R1fullName")
    let username = localStorage.getItem("R1username");

    db.ref("users/" + username + "/details").on("value", snap => {
      uimgsrc = snap.val().avatar

      imgup.current.src = uimgsrc;
      fname.current.innerText = snap.val().fullName
    })

    //  link1.current.style.backgroundColor="#ff34aa"
    fname.current.innerText = tempfname;
    const fetchChat = db.ref("messages/");
    async function ofetch() {
      fetchChat.on("child_added", function (snapshot) {
        const messages = snapshot.val();

        setpdata(pdata => [...pdata, {
          message: messages.message, username: messages.username,
          timestamp: messages.timestamp
        }]);

      }
      )
    }
    ofetch();

    alert("TO KNOW ABOUT HOW TO USE THIS APP GO TO SETTINGS")
    // close tab 
    return () => {
      const uname = localStorage.getItem("R1username");
      db.ref("users/" + uname + "/details/").update({
        status: 0
      })
    }
  }, [])

  return (
    <>
      <Router>

        <div ref={body} className="bodyy">
          <div className="side-wrap">
            <nav ref={sidebar} className="sidebar close">
              <header>
                <div className="image-text">
                  <span className="image">

                    <img ref={imgup} id="userImg" /> </span>
                  <div className="text logo-text">
                    <span ref={fname} className="name"><br /></span> <span className="profession"> </span>
                  </div>
                </div>

              </header>
              <div className="menu-bar">
                <div className="menu">
                  <li key="10000" ref={searchBtn} className="search-box" onClick={SearchBt}> <i className="bx bx-search icon"></i> <input type="text" placeholder="Search..." /> </li>
                  <ul className="menu-links">


                    <li key="20000" className="nav-link">   <Link ref={link1} exact="true" to="/">   <i className="bx bx-home-alt icon"></i> <span className="text nav-text">Open Chat</span> </Link> </li>

                    <li key="30000" className="nav-link"><Link ref={link2} to="/connections">
                      <i className="bx bx-bell icon"></i>
                      <span className="text nav-text"> Connections</span>  </Link>  </li>

                    <li key="40000" className="nav-link"><Link ref={link3} to="/groups"> <i
                      className="bx bx-bar-chart-alt-2 icon"></i> <span className="text nav-text">Groups</span>  </Link> </li>
                    <li key="500000" className="nav-link"> <Link ref={link4} exact="true" to="/settings">   <i
                      className="bx bx-pie-chart-alt icon"></i> <span className="text nav-text">Settings</span> </Link>  </li>
                    

                  </ul>
                </div>
                <div className="bottom-content">
                  <li key="60000" onClick={Loggout} className="loggout"> <a href="/" > <i className="bx bx-log-out icon"></i> <span className="text nav-text">Logout</span> </a> </li>
                  <li key="70000" className="mode">
                    <div className="sun-moon">
                      <i className="bx bx-moon icon moon"></i> <i className="bx bx-sun icon sun"></i>
                    </div>
                    <span ref={modeText} className="mode-text text">Dark</span>
                    <div ref={modeSwitch} className="toggle-switch cl" onClick={modeSw}>
                      <span className="switch"></span>
                    </div>
                  </li>
                </div>
              </div>
            </nav>
          </div>

          <div className="home">

            <Routes>
              <Route exact="true" path="/" element={<OpenChat link1={link1} pdata={pdata} />} />
              <Route  path="/connections" element={<Connections link2={link2} />} />
              <Route  path="/groups" element={<Groups link3={link3} />} />
              <Route  path="/settings" element={<Settings link4={link4} setAvatarF={setAvatarF} setfullNameF={setfullNameF} />} />
            </Routes>

          </div>

        </div>

      </Router>

    </>

  )
}
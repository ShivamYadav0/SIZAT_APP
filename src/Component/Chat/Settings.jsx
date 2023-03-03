import {
  useRef,
  useState,
  useEffect
} from "react"
import "./Settings.css"
import db from "./Firebase.jsx"

let username = localStorage.getItem("R1username");
export default function Settings({ link4, setfullNameF, setAvatarF }) {
  const [abouts, setAbouts] = useState();
  const [Fname, setFname] = useState();
  const ifile = useRef();
  const simg = useRef();
  function imageS() {

    const imgPath = ifile.current.files[0];
    if (ifile.current.files[0]) {
      const file = ifile.current.files[0];
      var pattern = /image-*/;

      if (!file.type.match(pattern)) {
        alert('Invalid format');
        return;
      }
    }

    const reader = new FileReader();
    const name = localStorage.getItem("R1username");
    let imm = ""
    reader.addEventListener("load", function () {
      // convert image file to base64 string and save to
      //   localStorage.setItem("R1image", reader.result);
      imm = reader.result;
      db.ref("users/" + name + "/details/").update({
        "avatar": imm
      })

      simg.current.src = imm;
      setAvatarF(imm);

    }, false);
    /*  setTimeout(()=>{
       
      },3000);*/
    if (imgPath) {
      reader.readAsDataURL(imgPath);
    }

  }
  function funAbout() {
    if (abouts.length == 0)
      return;
    const name = localStorage.getItem("R1username");

    db.ref("users/" + name + "/details/").update({
      "about": abouts
    })

  }
  function funFname() {
    if (Fname.length == 0)
      return;
    const name = localStorage.getItem("R1username");

    db.ref("users/" + name + "/details/").update({
      "fullName": Fname
    })
    setfullNameF(Fname);
  }

  useEffect(() => {
    db.ref("users/" + username + "/details/").on("value", snap => {
      if (!simg.current.src)
        simg.current.src = snap.val().avatar
    })
    link4.current.style.backgroundColor = "#ff0000";
    return () => link4.current.style.backgroundColor = "";
  }, [])
  return (
    <>
      <div id="setting" >
        <img ref={simg} />
        Insert Image As New Avatar
        <input ref={
          ifile
        } type="file" accept="image/png, image/gif, image/jpeg" />

        <button onClick={imageS}> Click </button>
        <label htmlFor="abouts"> About You :</label>
        <input value={abouts} type="text" id="abouts" onChange={(e) => setAbouts(e.target.value)} />
        <button onClick={funAbout} >Click </button>
        <label htmlFor="fname"> Your Fullname :</label>
        <input value={Fname} type="text" id="fname" onChange={(e) => setFname(e.target.value)} />
        <button onClick={funFname} >Click </button>
        <div >
          <h3 >You can openly chat with everyone on openchat section.</h3>
          <h3 >There are 2 ways to chat with someone in private considering that they use this web app. </h3>
          <h4 >1.Search them through their username from connections section and <br />you will see a card and there will be "chat" button <br />click on it to chat.</h4>
          <h4 >2.From openchat section ,Click on the username ( present at left side of message) and <br />you will see a card and there will be "chat" button <br />click on it to chat.</h4>
        </div>
      </div>
    </>
  )

}
import {
  useState,
  useEffect,
  useRef
} from "react"
import "./Login.css"
import db from "./Chat/Firebase.jsx"
import bcrypt  from "bcryptjs"
let ctx;
export default function Login({
 logC
}) {

  const [name,
    setName] = useState();
  const [pass,
    setPass] = useState();
  const [mail,
    setMail] = useState();
  const [fname,
    setFname] = useState();
  
  const cnv = useRef()
  const a = useRef();
  const b = useRef();
  const cv = useRef()
  useEffect(() => {

    ctx = cnv.current.getContext("2d")

    draw(ctx);
  }, [])
  function Loginn(e) {
    e.preventDefault()
    let fireuser,
      firepass, flname;
      
    db.ref("users/" + name + "/details").on("value", snapshot => {

      if (!snapshot.exists() || !snapshot.val().username || !snapshot.val().password) {
        alert("Entered username and password are incorrect ")
      }
      fireuser = snapshot.val().username;
      firepass = snapshot.val().password
      flname = snapshot.val().fullName
      let bpass=bcrypt.compareSync(pass, firepass); 
      if (name != fireuser ||
        !bpass)
        alert("Entered username and password are incorrect ")
      else {
        db.ref("users/" + name + "/details").update({
          status: 1
        })
        localStorage.setItem("R1isLog", "yes");
        localStorage.setItem("R1username", name);
        localStorage.setItem("R1fullName", flname);
        localStorage.setItem("R1online", "yes");

       logC(true);
      }
      //
    })


  }
  function SignUpp(e) {

    e.preventDefault()
    e.stopPropagation()
    db.ref("users/" + name).on("value", snapn => {
      if (snapn.exists()) {
        alert("Username is already exist")
        return;
      }
      else {

        localStorage.setItem("R1isLog", "yes");
        localStorage.setItem("R1username", name);
        localStorage.setItem("R1fullName", fname);
        let status = 1;
        let avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWSr0yXrqZ94BH71-zg845mRN3LfK3Rx2sxH-9nX3jk_vHShYlgeFuDYJ5&s=10";
       let hpass= bcrypt.hashSync(pass, bcrypt.genSaltSync())
        db.ref("users/" + name + "/details/").set({
          "username": name,
          "mail": mail,
          "fullName": fname,
          "password": hpass,
          "status": status,
          "avatar": avatar,
          "about": "Hii!"
        })
       logC(true);
      }
    })
  }
  function toLogin() {
    cnv.current.style.animation = "anm2 0.3s ease-in-out";
    b.current.style.display = "none";
    a.current.style.display = "flex";
    console.log(name, pass)
  }

  function toSign() {
    cnv.current.style.animation = "anm 0.3s ease-in-out";
    a.current.style.display = "none";
    b.current.style.display = "flex";

  }
  function setNamee(e) {
    e.target.value = e.target.value.replace(/ /g, '');
    e.target.value = e.target.value.toLowerCase();
    setName(e.target.value);
  }
  function setPasss(e) {
    e.target.value = e.target.value.replace(/ /g, '');
    setPass(e.target.value);
  }

  return (
    <>

      <div id="mn">
        <span style={{ width: "200px" }} >  <img style={{ width: "200px" }} src="/Screenshot__58_-removebg-preview.png" /></span>

        <div id="Lwrap">
          <div id="glass">
            <canvas ref={cnv} id="card"></canvas>
          </div>

          <div id="c">
            <form onSubmit={(e) => Loginn(e)}>
              <div ref={a} id="login-box">
                <h1> Login</h1> <label htmlFor="name"> Username:</label>
                <input id="name" type="text" placeholder="Username" value={name} onChange={(e) => setNamee(e)} required />
                <label id="ps"> Password:</label>
                <input id="pass" type="password" value={pass} pattern=".{8,}" onChange={(e) => setPasss(e)} placeholder="Enter 8 or more characters"
                  required />
                <p id="fp">
                  forgot password?
                </p>
                <button type="submit"> Submit</button>
                <div id="ltcl">
                  Don't have a Account <br /><a onClick={toSign} style={{ color: "red" }}> Click Here! </a>
                </div>
              </div>
            </form>
            <form onSubmit={(e) => SignUpp(e)}>
              <div ref={b} id="sign-box" style={{ display: "none" }}>
                <h1> Sign Up </h1> <label htmlFor="name"> Username:</label>
                <input id="name" type="text" placeholder="Username" value={name} onChange={(e) => setNamee(e)} required />
                <label style={{ width: "100px" }}> Full name:</label>
                <input id="fname" type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />

                <label> Password:</label>
                <input id="pass" type="password" value={pass} pattern=".{8,}" onChange={(e) => setPasss(e)}
                  placeholder="Enter 8 or more characters" required />
                <label> Email:</label>
                <input id="mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} required /> <button onSubmit={(e) => SignUpp(e)} type="submit">Submit</button>
                <div id="stcl">
                  To Log in <a onClick={toLogin} style={{ color: "red" }}>Click Here! </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <h1 className="neonText">
            Welcome<br /> To The App
          </h1>
        </div>
      </div>
    </>
  )
}

function draw(ctx) {
  ctx.beginPath();
  ctx.moveTo(300, 0);
  let y = 0;
  for (let i = 0; i < 155; i++) {
    if (i < 75) y += 1;
    else y -= 1;

    ctx.lineTo(300 - 3 * y + y * y / 100, i)
    ctx.lineWidth = 0.1;
    ctx.stroke()
    ctx.fillStyle = "#0fffff"
    ctx.globalAlpha = 0.1;
    ctx.fill()

  }
  ctx.closePath();

}
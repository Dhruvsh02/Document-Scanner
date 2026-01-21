import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


function Register() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();


 const register = async () => {
   try {
     await createUserWithEmailAndPassword(auth, email, password);
     navigate("/dashboard");
   } catch (err) {
     alert(err.message);
   }
 };
  return (
   <div>
     <h2>Register</h2>
     <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
     <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
     <button onClick={register}>Register</button>
   </div>
 );
}


export default Register;


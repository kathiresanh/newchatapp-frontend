import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Adminchat from './Adminchat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Join_room from './Join-room';
import Chatbox from './Chatbox';
import CreateUser from './Create-User';
import Admin from './Admin';
const { io } = require("socket.io-client");





const socket = io("http://localhost:3001");

function App() {
  
  const [name,setname] = useState("")
  const [email,setemail] = useState("") 
  const [currentuser,setcurrentuser]=useState({})
  let call = (values)=>{
      setcurrentuser(values)
  }



  const [userName,setUserName] = useState("kathiresan")
  const [room,setRoom] = useState("hkathiresan@gmail.com")
  const [isloggedin,setlogin] = useState(false)
 

  const joinRoom = ()=>{

    if(userName !== "" && room !== ""){
      socket.emit("join_room", room)
      setlogin(true)
    }
}

  return (
<BrowserRouter>
<div className="container">
      <div className='row'>

        <Routes>
          <Route path='/admin' element={<Admin socket={socket} call={call}></Admin>}></Route>
          <Route path='/' element={<Join_room socket={socket} call={call}></Join_room> }></Route>
          <Route path='/register' element={   <CreateUser></CreateUser> }></Route>
          <Route path='/chat' element={<Chatbox socket={socket}></Chatbox>}></Route>
          <Route path="/personal" element={ <Adminchat socket={socket} currentuser={currentuser} ></Adminchat>}></Route>
        </Routes>
       
   
       
      </div>
     
    </div>
</BrowserRouter>
  );
}

export default App;

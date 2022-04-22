import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from "react-router-dom";


export default function Adminchat({socket,currentuser}){

    const [messagelist, setmessagelist] = useState([])
    const [names,setname]=useState("Admin")
    const [newvalue,setnewvalue]=useState({name:names,email:currentuser.email,message:"",time: new Date().toLocaleTimeString(),})

    const formik = useFormik({
        initialValues: {
            name: names,
            email: currentuser.email,
            message: "",
            time: new Date().toLocaleTimeString(),
        },
        onSubmit: messageData => {
            socket.emit("send_message", messageData)
            setmessagelist([...messagelist, messageData])
            console.log(messagelist)
        },
    });
      
  
    

   let set = ()=>{
       alert("hii")
   }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setmessagelist([...messagelist, data])
        })
    }, [messagelist, socket])
    

    return(
        <div className=" card col-sm-6 mt-5" id="message-box-color">
            <div className="d-flex justify-content-end">
                <Link to="/admin"><button className="btn btn-success">Goback</button></Link>
            </div>
          <div className="card"> 
         <div className="d-flex justify-content-center">
         <h4>{currentuser.email}</h4>
         </div>
          </div>
        <ScrollToBottom>
     <div className="" id="message-box">
   
         <div className="card-body">
         
             {

                 messagelist.map((item) => {
                     return <div class={item.name == names ? "d-flex justify-content-end" : "d-flex justify-content-start"} >
                         <div className="card p-1 mt-4">
                             <p class="message-content">{item.message} <br></br>
                             <span style={{ color: "black" }}> <small> {item.name}  </small></span>     <span style={{ color: "black" }}> <small> {item.time}  </small></span>
                             </p>

                         </div>

                     </div>
                 })
             }
               
         </div>
         
     </div>
     </ScrollToBottom>
     <div className="card p-2">
         <form onSubmit={formik.handleSubmit}>
             <div className="d-flex">

                 <input
                     required
                     className="form-control"
                     id="message"
                     name="message"
                     type="text"
                     placeholder="Enter Message here.."
                     onChange={formik.handleChange}
                     value={formik.values.message}
                 />
                 <button className="btn btn-success" type="submit">Send</button>

             </div>
         </form>
     </div>
 </div>
    )
}
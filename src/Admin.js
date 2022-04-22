import React, { useEffect } from "react";
import Chatbox from "./Chatbox";
import { useState } from "react";
import axios from "axios";
import ScrollToBottom from 'react-scroll-to-bottom';
import Adminchat from "./Adminchat";
import { useFormik } from "formik";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Admin({socket,call}){
    const navigate = useNavigate();


    let joinchat = (values)=>{
        setcurrentuser(values)
        socket.emit("join_room", values.email)
        call(values)
        formik.setValues(newvalue)
        navigate("/personal")
        
    }



    
    const [currentuser,setcurrentuser] = useState({})

  
    

    const [user,setuser] = useState([])

    useEffect(()=>{
    
        const fetchhandler = async () => {
            try {
               await  axios.get("http://localhost:3001/getuser").then(function (response) {
                    setuser(response.data)
                   
                })
            }
            catch (error) {
                console.log(error)
                alert("something went wrong")
            }
        }
        fetchhandler()
          },[])

          console.log(user)

   
        
        

              // adminchat start


    const [messagelist, setmessagelist] = useState([])
    const [names,setname]=useState("Admin")
    const [newvalue,setnewvalue]=useState({name:names,email:currentuser.email,message:"",time: new Date().toLocaleTimeString(),})

    const formik = useFormik({
        initialValues: {
            name: names,
            email: "hkathiresan@gmail.com",
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


    // admin chat end
    


    return(
        <div className="row">
         <div className="col-sm-4">
          <div className="card mt-5" id="user-list">
          <ScrollToBottom>
              <div className="d-flex justify-content-center"><h4>USERS</h4></div>
              <div className="card-body">
                {
                    user.map((obj)=>{
                        return <div className="card shadow p-3 mt-2" key={obj.email} onClick={()=>{joinchat(obj)}}>
                                <h4>{obj.name}</h4>
                                <h5>{obj.email}</h5>
                            </div>
                    })
                }
              </div>
              </ScrollToBottom>
          </div>
         </div>
        
         
           
      
          

         {/* <div className=" card col-sm-6 mt-5" id="message-box-color">
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
 </div> */}
        </div>
    )
}
import React from "react";
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Join_room({socket,call}) {
          
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name : "",
            email: '',
        },
        onSubmit: async values => {
         try {
            axios.post("http://localhost:3001/login",values).then(function(response){
             
          
                localStorage.setItem("name",response.data.name)
                localStorage.setItem("email",response.data.email)
               
                socket.emit("join_room", values.email)
                
                navigate("/chat")
              })
        
         } catch (error) {
             
         }
        },
    });

    return (
        <div className="col-sm-6">

            <div className="card bg-secondary shadow mt-5">
                <div className="d-flex justify-content-center">
                    <h3>Login</h3>
                </div>
                <div className="card-body">

                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">Enter Name</label>
                        <input
                            required
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        /><br></br>
                        
                        <label htmlFor="email">Email Address</label>
                        <input
                            required 
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        /><br></br>

                     <div className="d-flex justify-content-center">
                     <button className="btn btn-primary" type="submit">Login</button> &nbsp;
                 
                     </div>
                    </form>
                   <div className="d-flex justify-content-between">
                   <Link to="/register" style={{color:"white"}}>Register</Link>
                   <Link to="/admin" style={{color:"white"}}>Admin page</Link>
                   </div>
                </div>
            </div>
            {/* <button onClick={()=>{call()}}>onlcli</button> */}

        </div>
    )
}
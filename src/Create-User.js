import React from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreateUser(){


    const formik = useFormik({
        initialValues: {
            name : "",
            email: '',
        },
        onSubmit: async values => {
           try {
               await axios.post("http://localhost:3001/register",values)
               alert("registered sucessfully")
           } catch (error) {
               alert("something went wrong")
           }
        },
    });


    return(
        <div className="col-sm-6 mt-5">
            <div className="card">
                <div className="d-flex justify-content-center">
                    <h3>Register</h3>
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
                     <button className="btn btn-primary" type="submit">Submit</button>
                     </div>
                    </form>
                    <Link to="/" style={{color:"black"}}>Login page</Link>
                </div>
              
            </div>
        </div>
    )
}
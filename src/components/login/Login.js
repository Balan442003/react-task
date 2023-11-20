//Importing React from react
import React from 'react'
//Importing yupresolver from @hookform/resolvers 
import { yupResolver } from '@hookform/resolvers/yup';
//Importing Yup as yup
import * as Yup from "yup";
//Importing useForm from react-hook-form
import { useForm } from "react-hook-form";
//Importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//Importing Toastcontainer,toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
//Importing react-toastify css 
import 'react-toastify/dist/ReactToastify.css';
//Importing useState from react
import { useState } from 'react';
//starting login schema validation , By:K.K.BALAN
const validationSchema = Yup.object().shape({

    email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Must Be in Email Format')
        .email('Email is invalid').trim(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g, 'Password should need atleast 1 uppercase & 1 lowercase & 1 special character & 1 lowercase')
        .max(15, 'Password must be in 15 characters')
        .required('Password is required').trim(),


});
//End login schema validation

//starting react main login function , By: K.K.BALAN
const Login = () => {
    //creating a variable for maintaining password's state , initially as false 
    const [showPassword, setShowPassword] = useState(false);
    //creating a variable for useNavigate
    const navigate = useNavigate();
    // functions to build form returned by useForm() hook, By:K.K.BALAN
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    });
    //End useForm() hook

    //StartingPasswordFieldVisiblity Function, By:K.K.BALAN
    const togglePasswordVisibility = () => {
        try{
        setShowPassword(!showPassword);
        }catch(error){
            alert(error,'Something went wrong in loginpassword')
        }
    };
    //Ending PasswordFieldVisible Function

    //Starting Login onSubmit Function , By:K.K.BALAN
    function onSubmit(data) {
        // display form data on success
        try{
        //Creating a variable for getItem from localstorage UserDetails
        const StoredData = JSON.parse(localStorage.getItem('UserDetails')) || [];
        //Creating a variable for find UserDetail Email & Password Equal or not currently giving inputs
        let user = StoredData.length && JSON.parse(localStorage.getItem('UserDetails')).find(obj => obj.email.toLowerCase() === data.email.toLowerCase() && obj.password === data.password);
        //Condition checking user have or not, By: K.K.BALAN
        if (!user) {
            alert("Invalid Login")
        } else {
            //Creating variable to get user's firstname 
            const firstName = user.firstName
            //Creating variable for push small letter email
            const email = data.email.toLowerCase()
            //Creating variable to get user's id 
            const loginid = user.id
            //Creating variable pushing data , firstname ,loginid
            const datas = { ...data, firstName, loginid, email }
            //setting LoginData in localstorage
            localStorage.setItem("LoginData", JSON.stringify(datas))
            //toast message
            toast.success("Login Successfully!")
            //reset all input fields
            reset()
            //starting & using setTimeout Function , By:K.K.BALAN
            setTimeout(() => {
                navigate("/Dashboard")
            }, 3000)
            //End SetTimeout Function
        }
        //end user condition
    }catch(error){
        alert(error,'Something went wrong in login onSubmit function')
    }
    }
    //end login onSubmit Function
    return (
        <div className='container'>
            <div className='toast-container'>
                <ToastContainer limit={2} />
            </div>
            <div className='container-fluid mt-5 p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5><i class="fa-solid fa-right-to-bracket fa-beat-fade"></i>  Student Login</h5>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Email</label><i class="fa-regular fa-envelope fa-beat-fade"></i><input name="email" type="text"  {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoFocus/>
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label><i class="fa-solid fa-lock fa-beat-fade"></i>
                            <div className="input-group">
                                <input name="password" type={showPassword ? "text" : "password"} {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <button
                                    type="button"
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility}>
                                    {showPassword ? (
                                        <i class="fa-regular fa-eye fa-beat-fade"></i>
                                    ) : (
                                        <i class="fa-regular fa-eye-slash fa-beat-fade"></i>
                                    )}
                                </button>
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn btn-outline-info text-dark mr-1 m-2"><i class="fa-solid fa-clipboard-check fa-beat-fade"></i>  Login</button>
                    </div>
                </form>

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}

export default Login
//Ending react main login function
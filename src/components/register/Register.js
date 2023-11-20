//Importing React from react
import React from 'react'
//Importing useForm from react-hook-form
import { useForm } from "react-hook-form";
//Importing yupresolver from @hookform/resolvers 
import { yupResolver } from '@hookform/resolvers/yup';
//Importing Yup as yup
import * as Yup from 'yup';
//Importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//Importing Toastcontainer,toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
//Importing react-toastify css 
import 'react-toastify/dist/ReactToastify.css';
//Importing usesState from react
import { useState } from 'react';

//starting register schema validation , By : K.K.BALAN
const validationSchema = Yup.object().shape({
    Name: Yup.string()
        .required('Name is required').trim()
        .min(3, 'Name must be at least 3 characters')
        .max(30, 'Name must be in 30 characters only'),
    email: Yup.string()
        .required('Email is required')
        .lowercase()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Must Be in Email Format')
        .email('Email is invalid').trim(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(15, 'Password must be in 15 characters')
        .matches(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g, 'Password should need atleast 1 uppercase & 1 lowercase & 1 special character & 1 lowercase')
        .required('Password is required').trim(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required').trim(),
    acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Terms & Conditions is required'),

});
//End register Schema validation

//Starting React Main Register function, By: K.K.BALAN
const Register = () => {
    //Creating a state for maintaining password's state. Initially declare as false here
    const [showPassword, setShowPassword] = useState(false);
    //Creating a state for maintaining Confirmpassword's state. Initially declare as false here
    const [showCnfPassword, setShowCnfPassword] = useState(false);
    //Creating a variable for useNavigate
    const navigate = useNavigate();


    // functions to build form returned by useForm() hook, By:K.K.BALAN
    const { register, handleSubmit, reset,trigger, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    });
    //End useForm() hook

    //StartingPasswordFieldVisiblity Function, By:K.K.BALAN
    const togglePasswordVisibility = () => {
        try {
            setShowPassword(!showPassword);
        }
        catch (error) {
            alert(error, 'Something went wrong togglepassword')
        }
    };
    //Ending PasswordFieldVisible Function

    //StartingConfirmPasswordFieldVisiblity Function, By:K.K.BALAN
    const toggleConfirmPasswordVisibility = () => {
        try {
            setShowCnfPassword(!showCnfPassword);
        } catch (error) {
            alert(error, 'Something went wrong toggleconfirmpassword')
        }
    };
    //Ending ConfirmPasswordFieldVisiblity Function


    //Starting register onSubmit Function, By : K.K.BALAN
    function onSubmit(data) {
        // display form data on success

        try {
            //Creating a variable for getting localstorage UserDetails
            const StoredData = JSON.parse(localStorage.getItem('UserDetails')) || []
            //Creating a variable for getting email in StoredData
            const IsEmailAlreadyExists = StoredData.some((user) => user.email === data.email)

            //Condition checking email already have or not , By: K.K.BALAN
            if (IsEmailAlreadyExists) {
                //toast message
                toast.error("Email Already Exists")
            } else {
                //Creating variable for making id in StoredData
                const id = StoredData.length + 1
                //Creating variable for pushing data, id
                const datas = { ...data, id }
                //Using array push concept
                StoredData.push(datas);
                //setting in localstorage UserDetails
                localStorage.setItem('UserDetails', JSON.stringify(StoredData))
                //toast message
                toast.success("Successfully Registered!")
                //reset all input fields
                reset()

                //starting & using setTimeout function , By:K.K.BALAN 
                setTimeout(() => {
                    navigate("/Login")
                }, 3000)
                //End SetTimeout Function
            }
            //End email condition checking
        } catch (error) {
            alert(error, 'Something Went Wrong In Register onSubmit function')
        }
    }
    //End register Onsubmit function
    return (
        <div className='container-fluid mt-5 p-5'>
            <div className="card m-3 p-5">

                <h5 className="card-header bg-success text-white text-center"><i class="fa-solid fa-circle-info"></i>  Student - Details</h5>
                <div className="card-body">
                    <div className='toast-container'>
                        <ToastContainer limit={2} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Name</label><i class="fa-solid fa-user fa-beat-fade"></i><br />
                                <input name="Name" type="text" {...register('Name')} className={`form-control ${errors.Name ? 'is-invalid' : ''}`} autoFocus />
                                <div className="invalid-feedback">{errors.Name?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Email</label><i class="fa-regular fa-envelope fa-beat-fade"></i><br /><input name="email" type="text"  {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Password</label><i class="fa-solid fa-lock fa-beat-fade"></i><br />
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
                            <div className="form-group col">
                                <label>Confirm Password</label><i class="fa-solid fa-check fa-beat-fade"></i><br />
                                <div className="input-group">

                                    <input name="confirmPassword" onBlur={()=>trigger('confirmPassword')} type={showCnfPassword ? "text" : "password"} {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                                    <button
                                        type="button"
                                        className="input-group-text"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showCnfPassword ? (
                                            <i class="fa-regular fa-eye fa-beat-fade"></i>
                                        ) : (
                                            <i class="fa-regular fa-eye-slash fa-beat-fade"></i>
                                        )}
                                    </button>
                                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                            <i class="fa-regular fa-circle-check fa-beat-fade"></i><label for="acceptTerms" className="form-check-label">Accept Terms & Conditions</label><br />
                            <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn btn-outline-dark text-white mr-1 m-2"><i class="fa-solid fa-clipboard-check fa-beat-fade"></i>  Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
//End react main register function

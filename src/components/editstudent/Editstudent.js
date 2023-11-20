//Importing React from react
import React, { useEffect } from 'react';
//Importing useForm from react-hook-form
import { useForm } from 'react-hook-form';
//Importing useNavigate & useParams from react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
// Import Yup for schema validation
import { yupResolver } from '@hookform/resolvers/yup';
//Importing Yup as yup 
import * as Yup from 'yup';
//Importing usesState from react
import { useState } from 'react';
//Importing Toastcontainer,toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
//Importing react-toastify css 
import 'react-toastify/dist/ReactToastify.css';
//starting react main Editstudent function , By: K.K.BALAN
const Editstudent = () => {
    //creating variable for using useParams
    const params = useParams();
    //creating variable for using useNavigate
    const navigate = useNavigate();
    //creating a variable for maintaining tamil's state , initially as empty string 
    const [tamil, setTamil] = useState('');
    //creating a variable for maintaining english's state , initially as empty string 
    const [english, setEnglish] = useState('');
    //creating a variable for maintaining cs's state , initially as empty string 
    const [cs, setCs] = useState('');
    //Creating variable to get LoginData from localstorage  
    const user = JSON.parse(localStorage.getItem('LoginData'));
    //Creating variable to get user's email from user 
    const loguser = user.email;
    //Creating variable to get loguser from localstorage
    const singleStudent = JSON.parse(localStorage.getItem(loguser));
    //Creating a variable for find particular currently click button(rowid)
    const studentToEdit = singleStudent.find((student) => student.id == params.id);
    //starting Editstudent schema validation , By:K.K.BALAN

    const validationSchema = Yup.object().shape({
        Studentrollno: Yup.string().required('Product Name is required')
            .max(10, 'Student Roll No must be in 10 characters').trim(),
        Studentname: Yup.string()
            .required('Student Name is required')
            .min(3, 'Student Name must be at least 3 characters').trim(),
        Studentclass: Yup.string()
            .required('Student Class is required').trim(),
        Tamil: Yup.string()
            .required('Tamil Mark is required').trim()
            .matches(/^(\d{1,2}|100)$/g, 'Must 0 to 100')
            .max(3, 'Tamil marks must be in 3 Digits only'),
        English: Yup.string()
            .required('English Mark is required').trim()
            .matches(/^(\d{1,2}|100)$/g, 'Must 0 to 100')
            .max(3, 'English marks must be in 3 Digits only'),
        Cs: Yup.string()
            .required('Computer Science Mark is required').trim()
            .matches(/^(\d{1,2}|100)$/g, 'Must 0 to 100')
            .max(3, 'Computer Science marks must be in 3 Digits only(100 marks)'),
        Total: Yup.string()
            .required('Total Marks is required').trim(),
    });
    //End Editstudent schema validation


    // functions to build form returned by useForm() hook, By:K.K.BALAN
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        // defaultValues: {
        //     Studentrollno: studentToEdit.Studentrollno,
        //     Studentname: studentToEdit.Studentname,
        //     Studentclass: studentToEdit.Studentclass,
        //     Tamil: studentToEdit.Tamil,
        //     English: studentToEdit.English,
        //     Cs: studentToEdit.Cs,
        //     Total: studentToEdit.Total,
        // },
        mode: 'all',
    });
    useEffect(()=>{
        reset(studentToEdit)
    },[reset])

    //Ending useForm() hook

    //Starting handleTamilChange Function, By:K.K.BALAN
    const handleTamilChange = (e) => {
        try {
            setTamil(e.target.value);
        } catch (error) {
            alert(error, 'Something went wrong Edit Tamil')
        }
    };
    //Ending handleTamilChange Function

    //Starting handleEnglisChange Function, By:K.K.BALAN
    const handleEnglishChange = (e) => {
        try {
            setEnglish(e.target.value);
        } catch (error) {
            alert(error, 'Something went wrong Edit English')
        }
    };
    //Ending handleEnglishChange Function

    //Starting handleCsChange Function, By:K.K.BALAN
    const handleCsChange = (e) => {
        try {
            setCs(e.target.value);
        } catch (error) {
            alert(error, 'Something went wrong Edit Cs')
        }
    };
    //Ending handleCsChange Function

    //Starting calculateTotal Function, By:K.K.BALAN
    const calculateTotal = () => {
        try {
            const tamilValue = parseFloat(tamil) || 0;
            const englishValue = parseFloat(english) || 0;
            const csValue = parseFloat(cs) || 0;
            return tamilValue + englishValue + csValue;
        } catch (error) {
            alert(error, 'Something went wrong Edit Total')
        }
    };
    //Ending calculateTotal Function


    //Starting onSubmit Function, By:K.K.BALAN

    const onSubmit = (data) => {
        try {
            // Calculate the Total value
            const total = calculateTotal();
            // Include the Total value in the data object
            data = { ...data, Total: total };
            //Creating a variable for find particular currently click button(rowid)
            const studentIndex = singleStudent.findIndex((student) => student.id == params.id);
            //Creating variable for copying singlestudent
            const updatedStudent = [...singleStudent];
            //Accessing particularIndex then using spread pushing updateddata
            updatedStudent[studentIndex] = {
                ...studentToEdit,
                ...data,
            };
            //setting localstorage loguser
            localStorage.setItem(loguser, JSON.stringify(updatedStudent));
            //toast message
            toast.success("Student Data Updated Successfully")
            //reset all input fields
            reset()
            //starting & using setTimeout Function , By:K.K.BALAN
            setTimeout(() => {
                navigate('/Studentlist');
            }, 3000)
            //End SetTimeout Function
        } catch (error) {
            alert(error, 'Something went wrong EditStudent')
        }

    };
    //Ending onSubmit Function

    return (
        <div className='container-fluid col-12 mt-5 p-5'>
            <div className='toast-container'>
                <ToastContainer limit={2} />
            </div>
            <div className='container-fluid col-12 mt-5'><br /><br /><br />
                <button type="submit" className="btn btn-primary btn-outline-info text-white" onClick={() => navigate('/Studentlist')}><i class="fa-solid fa-backward-step fa-bounce"></i>  Go Back</button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Student rollno:</label>
                            <input name="Studentrollno" type="text" {...register('Studentrollno')} className={`form-control ${errors.Studentrollno ? 'is-invalid' : ''}`} disabled />
                            <div className="invalid-feedback">{errors.Studentrollno?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Student Name:</label>
                            <input name="Studentname" type="text" {...register('Studentname')} className={`form-control ${errors.Studentname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.Studentname?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Student Class:</label>
                            <input name="Studentclass" type="text" {...register('Studentclass')} className={`form-control ${errors.Studentclass ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.Studentclass?.message}</div>
                        </div>
                        <div className="form-row">
                            {/* Other input fields here */}
                            <div className="form-group col">
                                <label>Tamil:</label>
                                <input
                                    name="Tamil"
                                    type="text"
                                    value={tamil}
                                    {...register('Tamil')}
                                    onChange={handleTamilChange}
                                    className={`form-control ${errors.Tamil ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.Tamil?.message}</div>
                            </div>
                            <div className="form-group col">
                                <label>English:</label>
                                <input
                                    name="English"
                                    type="text"
                                    value={english}
                                    {...register('English')}
                                    onChange={handleEnglishChange}
                                    className={`form-control ${errors.English ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.English?.message}</div>
                            </div>
                            <div className="form-group col">
                                <label>Cs:</label>
                                <input
                                    name="Cs"
                                    type="text"
                                    value={cs}
                                    {...register('Cs')}
                                    onChange={handleCsChange}
                                    className={`form-control ${errors.Cs ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.Cs?.message}</div>
                            </div>
                            {/* Total is calculated and displayed below */}
                            <div className="form-group col">
                                <label>Total Mark:</label>
                                <input
                                    name="Total"
                                    type="text"
                                    {...register('Total')}
                                    value={calculateTotal()}
                                    readOnly
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <button type='submit' className='btn btn-success btn btn-outline-info text-white mr-1 m-2'>
                        <i class="fa-solid fa-clipboard-check fa-beat-fade"></i>    Submit list
                    </button>
                </form>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Editstudent;
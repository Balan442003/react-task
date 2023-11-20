//Importing React from react
import React from 'react'
//Importing Datatable from react-data-table-component
import DataTable from 'react-data-table-component';
//Importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//starting react main Dashboard function , By: K.K.BALAN
const Dashboard = () => {
    //creating a variable for useNavigate
    const navigate = useNavigate()
    //Creating variable for getting LoginData from localstorage
    const show = JSON.parse(localStorage.getItem('LoginData'));
    //Creaating Variable for getting email from show
    const loguser = show.email;
    //Creating variable for getting loguser from localstorage
    const students = JSON.parse(localStorage.getItem(loguser)) || [];
    //Starting logout Function, By:K.K.BALAN
    function logout() {
        try{
        localStorage.removeItem("LoginData")
        navigate('/Login');
        }catch(error){
            alert(error,'Something went wrong in logout function')
        }
    }
    // Ending logout function

    //Starting & Creating a variable for getting data-table in using selector
    const col = [
        {
            name: 'Student Roll No',
            selector: 'Studentrollno',
        },
        {
            name: 'Student Name',
            selector: 'Studentname',
        },
        {
            name: 'Class',
            selector: 'Studentclass',
        },
        {
            name: 'Tamil',
            selector: 'Tamil',
        },
        {
            name: 'English',
            selector: 'English',
        },
        {
            name: 'Computer Science',
            selector: 'Cs',
        },
        {
            name: 'Total Marks',
            selector: 'Total',
        }]
    //Ending Datatable's array format 
    return (
        <div>
            <div className='container mt-5'>
                <br />
                <br />
                <h1><center>Students Count: {students.length}</center></h1>
                <br />
                <center>
                    <button type="submit" className="btn btn-success btn-outline-dark m-2" onClick={() => navigate('/Addstudent')}><i class="fa-solid fa-user-plus fa-bounce"></i> Add Student Data</button>
                    <button type="submit" className="btn btn-success btn-outline-dark" onClick={() => navigate('/Studentlist')}><i class="fa-solid fa-database fa-bounce"></i>  Show Student Lists</button>
                    <button type="submit" className="btn btn-success btn-outline-dark m-2" onClick={() => logout()}><i class="fa-solid fa-arrow-down fa-bounce"></i>  Logout</button>
                </center>
            </div>
            <br />
            <div className='container'>
                {/* <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Student Roll No</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Tamil</th>
                            <th scope="col">English</th>
                            <th scope="col">Computer Science</th>
                            <th scope="col">Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.slice(0, 5).map((student, index) => {
                            return (
                                <tr>
                                    <td>{student.Studentrollno}</td>
                                    <td>{student.Studentname}</td>
                                    <td>{student.Studentclass}</td>
                                    <td>{student.Tamil}</td>
                                    <td>{student.English}</td>
                                    <td>{student.Cs}</td>
                                    <td>{student.Total}</td>
                                </tr>
                            )
                        })
                            : <h1>No data found</h1>
                        }
                    </tbody>
                </table> */}
                <h1><center>Student Data</center></h1>
                <DataTable
                    title=''
                    columns={col}
                    data={students.slice(0, 5)}
                    pagination
                    id='data-table'
                />
            </div>
        </div>
    )
}

export default Dashboard
//Ending React main Dashboard function

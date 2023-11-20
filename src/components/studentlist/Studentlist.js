// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'


// const Showlist = () => {
//     const navigate = useNavigate()
//     const show = JSON.parse(localStorage.getItem('LoginData'));
//     const loguser = show.email;
//     const [students, setStudents] = useState(JSON.parse(localStorage.getItem(loguser)) || []);
//     // const Delete = (id) => {
//     //     Swal.fire({
//     //         title: 'Are you sure?',
//     //         text: "Your Record will be delete now?",
//     //         icon: 'warning',
//     //         showCancelButton: true,
//     //         confirmButtonColor: '#3085d6',
//     //         cancelButtonColor: '#d33',
//     //         confirmButtonText: 'Yes, delete it!'
//     //     }).then((result) => {
//     //         if (result.isConfirmed) {
//     //             Swal.fire(
//     //                 'Deleted!',
//     //                 'Your file has been deleted.',
//     //                 'success'
//     //             )
//     //             // console.log(productname)
//     //             const listitems = students.filter((item) =>
//     //                 item.id !== id)
//     //             setStudents(listitems)
//     //             localStorage.setItem(loguser, JSON.stringify(listitems))
//     //         }
//     //     })
//     // }
//     return (
//         <div className='container mt-5 p-5'><br />
//             <center><button type="submit" className="btn btn-success m-2" onClick={() => navigate('/addlist')}>Add lists</button></center>
//             <h1><center>Student Datas</center></h1><br />
//             <table class="table">
//                 <thead>
//                     <tr>
//                         <th scope="col">Student Roll No</th>
//                         <th scope="col">Student Name</th>
//                         <th scope="col">Class</th>
//                         <th scope="col">Tamil</th>
//                         <th scope="col">English</th>
//                         <th scope="col">Computer Science</th>
//                         <th scope="col">Total Marks</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.length > 0 ? students.slice(0, 5).map((student, index) => {
//                         return (
//                             <tr>
//                                 <td>{student.Studentrollno}</td>
//                                 <td>{student.Studentname}</td>
//                                 <td>{student.Studentclass}</td>
//                                 <td>{student.Tamil}</td>
//                                 <td>{student.English}</td>
//                                 <td>{student.Cs}</td>
//                                 <td>{student.Total}</td>
//                             </tr>
//                         )

//                     })
//                         : <h1>No data found</h1>
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Showlist
//Importing Datatable from react-data-table-component
import DataTable from 'react-data-table-component';
//Importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//Importing useState from react
import { useState } from 'react';
//Importing Swal from sweetalert2
import Swal from 'sweetalert2'

//starting react main Studentlist function , By: K.K.BALAN
const Studentlist = () => {
  //creating a variable for useNavigate
  const navigate = useNavigate()
  //Creating variable for getting LoginData from localstorage
  const show = JSON.parse(localStorage.getItem('LoginData'));
  //Creaating Variable for getting email from show
  const loguser = show.email;
  //creating variable for getting loguser => loguser means loggeduser's studentdata in all places
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem(loguser)) || []);
  //Starting Delete Function, By:K.K.BALAN
  const Delete = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Your Record will be delete now?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          //using filter function if condition true means it will not delete , if false means delete(ex:2!==2,false) 
          const listitems = students.filter((item) =>
            item.id !== id)
          //pushing listitems into setstudents
          setStudents(listitems)
          //setting localstorage listitems
          localStorage.setItem(loguser, JSON.stringify(listitems))
        }
      })
    } catch (error) {
      alert(error, 'Something went wrong Delete')
    }
  }
  // Ending Delete function

  //Starting Datatable array
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
    },
    {
      name: "Actions/Delete",
      cell: (row) => (
        <button className="btn btn-danger btn btn-outline-dark"
          onClick={() => Delete(row.id)}><i class="fa-solid fa-trash fa-beat-fade"></i>Delete
        </button>
      ),
    },
    {
      name: "Actions/Edit",
      cell: (row) => (
        <button className="btn btn-primary btn btn-outline-dark"
          onClick={() => navigate(`/Editstudent/${row.id}`)}><i class="fa-solid fa-pen-to-square fa-beat-fade"></i>Edit..
        </button>
      ),
    }
  ];
  //ending data table array
  return (
    <div className='container mt-5 p-5'><br />
      <center><button type="submit" className="btn btn-primary btn-outline-info text-dark" onClick={() => navigate('/Dashboard')}><i class="fa-solid fa-backward-step fa-bounce"></i>  Dashboard</button>
        <button type="submit" className="btn btn-success btn-outline-dark m-2" onClick={() => navigate('/Addstudent')}><i class="fa-solid fa-user-plus fa-bounce"></i>  Add Student</button></center>
      <br />
      <h1><center>Student Datas</center></h1><br />
      <DataTable
        title=''
        columns={col}
        data={students}
        pagination
        id='data-table'
      />
    </div>
  )
}

export default Studentlist

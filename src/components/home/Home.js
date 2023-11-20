//Importing React from react
import React from 'react'
//Starting React Main Home Function , By: K.K.BALAN
const Home = () => {
  return (
    <div className='container-fluid mt-5 p-5'>
      <br />
      <br />
      <div className="row">
        <div className="col-sm-3">
          <img src={require('../images/student.jpg')} alt='some' width="200px" height="250px"></img>
        </div>
        <div className="col-sm-9">
          <h3>About Me</h3><br />
          <p>I’m actually not small boy & not funny, I’m just mean and people think I’m joking & I’m not perfect, I make mistakes, I hurt people. But when I say sorry, I really mean it</p>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9">
            <h1>React Main Task</h1>
            <h3>Student Management</h3><br />
            <br />
            <br /> 
          </div>
          <span className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-info btn btn-outline-success text-dark" type="submit"><i className="fa-solid fa-download"></i>    Download Resume</button>
          </span>
        </div>
      </div>
      <br />
    </div>
  )
}

export default Home
//Ending React Main Home Function

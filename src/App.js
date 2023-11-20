//Importing Header Component
import Header from "./components/header/Header";
//Importing Routes & Route from react-router-dom
import { Routes, Route } from 'react-router-dom'
//Importing Register Component
import Register from "./components/register/Register";
//Importing Login Component
import Login from "./components/login/Login";
//Importing Footer Component
import Footer from "./components/footer/Footer";
//Importing Home Component
import Home from "./components/home/Home";
//Importing Dashboard Component
import Dashboard from "./components/dashboard/Dashboard";
//Importing Studentlist Component
import Studentlist from "./components/studentlist/Studentlist";
//Importing Errorpage Component
import Errorpage from "./components/error/Errorpage";
//Importing Navigate from react-router-dom
import { Navigate } from 'react-router-dom';
//Importing Editstudent Component
import Editstudent from "./components/editstudent/Editstudent";
//Importing Addstudent Component
import Addstudent from "./components/addstudent/Addstudent";

//Starting React Main App Function , By: K.K.BALAN
function App() {
  //Starting PrivateRoute Function , By: K.K.BALAN
  const PrivateRoute = ({ component }) => {
    const loguser = JSON.parse(localStorage.getItem('LoginData'))
    //(Condition:If user login then only show privateroute pages otherwise not) 
    if (loguser) {
      return component
    }else {
      return <Navigate to='/Login' />
    }
    //Ending Condition
  }
  const PrivateRouter = ({ components }) => {
    const loguser = JSON.parse(localStorage.getItem('LoginData'))
    //(Condition:If user login then only show privateroute pages otherwise not) 
    if (loguser) {
      return <Navigate to='/Dashboard' />
    }else {
      return components
    }
    //Ending Condition
  }
  //Ending PrivateRoute Function
  return (
    <div>
      {/* Using Header Component */}
      <Header />
      {/* Starting : Using Routes & Route From react-router-dom */}
      <Routes>
        {/* Using Home Component */}
        <Route path="/" element={<Home />} />
        {/* Using Register Component */}
        <Route path="/Register" element={<PrivateRouter components={<Register />} />} />
        {/* Using Login Component */}
        <Route path="/Login" element={<PrivateRouter components={<Login />} />} />
        {/* Start Using PrivateRoute Function */}
        {/* Using Dashboard Component */}
        <Route path="/Dashboard" element={<PrivateRoute component={<Dashboard />} />} />
        {/* Using Addstudent Component */}
        <Route path="/Addstudent" element={<PrivateRoute component={<Addstudent />} />} />
        {/* Using Studentlist Component */}
        <Route path="/Studentlist" element={<PrivateRoute component={<Studentlist />} />} />
        {/* Using Editstudent Component */}
        <Route path="/Editstudent/:id" element={<PrivateRoute component={<Editstudent />} />} />
        {/* End Using PrivateRoute Function */}
        {/* Using Errorpage Component */}
        <Route path="/*" element={<Errorpage />} />
      </Routes>
      {/* Ending : Routes & Route From react-router-dom */}
      {/* Using Footer Component */}
      <Footer />
    </div >
  );
}

export default App;
//Ending React Main App Function

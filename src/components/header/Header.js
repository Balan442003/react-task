//Importing React from react
import React from 'react'
//Importing useNavigate From react-router-dom
import { useNavigate } from 'react-router-dom'

//Starting React Main Header Function, By: K.K.BALAN
const Header = () => {
    //Creating variable for using useNavigate
    const navigate = useNavigate()
    //Starting logout Function, By:K.K.BALAN
    const show = JSON.parse(localStorage.getItem('LoginData'));
    function logout() {
        try {
            localStorage.removeItem("LoginData")
            navigate('/Login');
        } catch (error) {
            alert(error, 'Something went wrong in logout function')
        }
    }
    // Ending logout function 
    return (
        <div>
            <navbar class="navbar fixed-top navbar-dark bg-success">
                <ul class="nav justify-content-right">
                    <li class="nav-item">
                        <button class="nav-link btn btn-outline-dark" onClick={() => navigate('/')}><img class="rounded-pill" src={require('../images/student1.jpg')} alt="logo" style={{ width: '45px' }}></img></button>
                    </li>
                </ul>
                <ul class="nav justify-content-end">
                    {show ? (
                        <li class='nav-item'>
                            <button onClick={() => logout()} class="nav-link text-white btn btn-outline-dark">Logout</button>
                        </li>
                    ) : (
                        <>                        <li class="nav-item">
                            <button onClick={() => navigate('/Register')} class="nav-link text-white btn btn-outline-dark"><i class="fa-solid fa-registered fa-beat-fade"></i>  Register</button>
                        </li>
                            <li class="nav-item">
                                <button onClick={() => navigate('/Login')} class="nav-link text-white btn btn-outline-dark"><i class="fa-solid fa-arrow-right-to-bracket fa-beat-fade"></i>  Login</button>
                            </li>
                        </>

                    )}
                </ul>
            </navbar>
        </div>
    )
}

export default Header
//Ending React Main Header Function

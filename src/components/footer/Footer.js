//Importing React from react
import React from 'react'
//Starting React Main Footer Function , By : K.K.BALAN
const Footer = () => {
    //Creating variable for current date dynamically 
    const date = new Date();
    //Creating variable for current year in date variable
    const year = date.getFullYear();
    return (
            <div className='fixed-bottom container-fluid bg-success text-white'>
                <p><center><b>Copyright &copy; {year}</b></center></p>
            </div>
            )
}

export default Footer
//End React Main Footer Function
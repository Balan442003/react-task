//Importing react from react
import React from 'react'
//Starting react main Errorpage function,By:K.K.BALAN 
const Errorpage = () => {
  return (
    // <div className='position-absolute top-50 start-50 translate-middle bg-dark text-white'>
    //   <h1>404 Page Not Found</h1>
    // </div>
    <div className='container mt-5'>
      <img src={require('../images/errorimage.jpg')} alt='404 Error' style={{width:'800px'}}></img>
    </div>
  )
}

export default Errorpage
//Ending react main Errorpage function
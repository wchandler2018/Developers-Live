import React from 'react';
import spinner from "./spinner.gif"

 function Spinner() {
  return (
    <div>
      <img 
        src={spinner} 
        style={{margin: "auto", width: "200px", display: "block"}}
        alt="loading..."/>
    </div>
  )
}

export default Spinner

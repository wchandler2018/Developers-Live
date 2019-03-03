import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Developers Live | <span className="signature">William Chandler</span> <i className="fa fa-heart" aria-hidden="true"></i>
    </footer> 
  )
}

export default  Footer

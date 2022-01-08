import React from 'react'
import './Header.css'
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
import {Button, Table, Badge} from "react-bootstrap";

class Header extends React.Component {
  
  
pageHome(){
  console.log("login")
  window.location.href = "/"
}
submitHandler = (e) =>{
    this.pageHome()
}
  display(){
    if(Cookies.get('jwt')){
      return(
        <p>{jwt(Cookies.get('jwt')).username} || {jwt(Cookies.get('jwt')).role}
        <div id="logoutbut"><Button variant="dark" onClick={this.submitHandler} id="logoutsize">Logout</Button></div></p>
        
      )
    }
  }



    render(){
    return(
     
      <div className='header-container'>
          <section className='header-subscription'>
          <p classname='header-subscription-heading'>
            <b><font size="32">
              Trygo POS App
            </font></b>
            
          </p>
          {this.display()}


        </section>
      </div>
    )
    }
    
  
}

export default Header

//<div className='input-areas'>
//<form>
//<input 
  //type="email" 
  //name="email" 
  //placeholder="YourE Email"
  //className='footer-input'
  ///>
//</form>
//</div>
import React from 'react'
import './Header.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
import {Button, Table, Badge, utils} from "react-bootstrap";
import {host} from "../utils/get-host"

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        cookies: Cookies.get('jwt'),  
    }
}
  
pageHome(){ //homepage
  window.location.href = "/"
}

submitHandler = (e) =>{ //logout
  e.preventDefault()
  axios.post(`${host}logout`,this.state)
  .then(response=>{
      if(response.data.status == "ok"){
        Cookies.remove('jwt'); //remove the cookies when logging out
        this.pageHome()
        return false;
      }
  })
}
  display(){//logout button
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

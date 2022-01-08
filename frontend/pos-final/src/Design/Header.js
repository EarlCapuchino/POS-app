import React from 'react'
import './Header.css'
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
class Header extends React.Component {
  display(){
    if(Cookies.get('jwt')){
      return(
        <p>{jwt(Cookies.get('jwt')).username} || {jwt(Cookies.get('jwt')).role}</p>
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
            {this.display()}
            
          </p>

          

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
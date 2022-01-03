import React from 'react'
import './Header.css'

function Header() {
  return(
    
    <div className='header-container'>

      <section className='header-subscription'>
        <p classname='header-subscription-heading'>
          <b><font size="32">
            POS APP
            </font></b>
        </p>
        <video src="https://static.videezy.com/system/resources/previews/000/046/563/original/LCB17FEB2020_187.mp4" autoplay="autoplay" loop="loop" muted id="video">
        </video>
      </section>
    </div>
  )
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
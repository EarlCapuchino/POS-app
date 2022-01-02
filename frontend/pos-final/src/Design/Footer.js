import React from 'react'
import './Footer.css'

function Footer() {
  return(
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p classname='footer-subscription-heading'>
          <b>
            LET THERE BE LIGHT
          </b>
        </p>
        <p classnName='footer-subscription-text'>
          sadsad
        </p>
        <div className='input-areas'>
          <form>
            <input 
              type="email" 
              name="email" 
              placeholder="YourE Email"
              className='footer-input'
              />
          </form>
        </div>
      </section>
      <p>
        <font face='arial' color='red' size="32">LOLOLOL</font>
        
      </p>

    </div>
  )
}

export default Footer
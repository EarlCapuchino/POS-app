import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
import "./ChangePassword.css"
import {host} from "../../utils/get-host"

class ChangePassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            oldPassword:'',
            newPassword:'',
            cookies: Cookies.get('jwt')
        }
      

    }
    pageSuccess(){
        window.location.href = "/success"
    }
    pageError(){
        window.location.href = "/error"
    }
    changeHandlerOld = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    changeHandlerNew = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{ //put back button going to homepage
        e.preventDefault()
        console.log(this.state)
        axios.post(`${host}change-password`,this.state)
        .then(response=>{
            console.log(response.data.status)
            if (response.data.status == "ok"){this.pageSuccess()}
            else{this.pageError()}
        })
        .catch(error=>{
            console.log(error)
        })

    }
    render(){
        const {oldPassword, newPassword} = this.state
        return(
            
            <div>
                <div className = "bg-overlay">
                <div id="titleCP">Change Password</div>
                <div id="CPdivider"></div>
                <div id="editP"> Account Details </div>
                <div id="editP"> Username: {jwt(Cookies.get('jwt')).username} </div>
                <div id="editP"> Email: {jwt(Cookies.get('jwt')).email} </div>
                <div id="CPDiv"></div>
                <form onSubmit={this.submitHandler}>
                    <div id="CPtext">
                        Existing Password:
                        <input 
                        type="password" 
                        name="oldPassword" 
                        value={oldPassword} 
                        onChange={this.changeHandlerOld}></input>
                    </div>
                    <div id="CPtext">
                        New Password: 
                        <input 
                        type="password" 
                        name="newPassword" 
                        value={newPassword} 
                        onChange={this.changeHandlerNew}></input>
                    </div>
                    <input type="submit"  id="buttonsuser"></input>
                </form>
                <form action="/" >
                    <input type="submit" value="Return" id="buttonsuser"/>
                </form>
            </div>
            </div>
        )
    }
}

export default ChangePassword
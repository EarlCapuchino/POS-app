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
                <h1>Change Password</h1>
                <h3>Account Details</h3>
                <h5>username: {jwt(Cookies.get('jwt')).username}</h5>
                <h5>email: {jwt(Cookies.get('jwt')).email} </h5>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Existing password: </label>
                        <input 
                        type="password" 
                        name="oldPassword" 
                        value={oldPassword} 
                        onChange={this.changeHandlerOld}></input>
                    </div>
                    <div>
                        <label>New Password: </label>
                        <input 
                        type="password" 
                        name="newPassword" 
                        value={newPassword} 
                        onChange={this.changeHandlerNew}></input>
                    </div>
                    <input type="submit"></input>
                </form>
                <form action="/" >
                    <input type="submit" value="Return"/>
                </form> 
            </div>
            </div>
        )
    }
}

export default ChangePassword
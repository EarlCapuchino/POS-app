import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {host} from "../../utils/get-host"
import './SetUpAccount.css'
class SetUpAccount extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            email:'',
            pasword:'',
            role: 'Admin'
            //role: '' //default role, to be changed by the admin
        }
      
        this.changeHandler1 = this. changeHandler1 .bind(this);
    }
    
    promptPageSuccess(){
        window.location.href = "/success"
    }
    promptPageError(){
        window.location.href = "/error"
    }
    changeHandler = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    changeHandler1(event) {
        this.setState({role: event.target.value});
      }

    submitHandler = e =>{ //put back button going to homepage
        e.preventDefault()
        console.log(this.state)
        axios.post(`${host}set-up-account`,this.state)
        .then(response=>{
            console.log(response.data.status)
            if (response.data.status == "valid"){ //will redirect for success and errors
                Cookies.set('jwt', response.data.token)
                this.promptPageSuccess()
            }else{
                this.promptPageError()
            }
        })
        .catch(error=>{
            console.log(error)
        })

    }
    render(){
        const {username, email, password, role} = this.state
        return(
            <div>
                <div className="bg">
                <div className="title">
                <br/>
                <h1>
                    Set up Account
                </h1>
                <h3>
                    Welcome to Trygo POS app! 
                </h3>
                <h4>For setting up an initial account, register your company and be its initial Admin</h4>
                </div>
                <form onSubmit={this.submitHandler}>

                    <div>
                        <label className="label-text">Username: </label>
                        <input type="text" 
                        name="username" 
                        value={username}
                        onChange={this.changeHandler}></input>
                    </div>
                    <br/>
                    <div>
                        <label className="label-text">email: </label>
                        <input type="email" 
                        name="email" 
                        value={email} 
                        onChange={this.changeHandler}></input>
                    </div>
                    <br/>
                    <div>
                        <label className="label-text">Password: </label>
                        <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={this.changeHandler}></input>
                    </div>
                    <br/>
                    <div>
                    <label className="label-text">Role</label>
                    <select value={this.state.role} onChange={this.changeHandler1}>
                    <option value="Admin">Admin</option>
                    </select>
                    </div>
                    <br/>
                    <input type="submit"></input>
                </form>
                </div>
            </div>
        )
    }
}

export default SetUpAccount
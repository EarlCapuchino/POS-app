import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./AddUser.css"
import {host} from "../../utils/get-host"

class AddUser extends React.Component {
 
    
    
    pageSuccess(){ //prompts for success and error
        window.location.href = "/success"
    }
    pageError(){
        window.location.href = "/error"
    }

    changeHandler = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    changeHandler1(event) { 
        this.setState({role: event.target.value});
      }

    constructor(props){
        super(props)

        this.state = {
            cookies: Cookies.get('jwt'),
            username: '',
            email:'',
            pasword:'',
            role: 'Cashier'
            
        }
        this.changeHandler1 = this. changeHandler1 .bind(this);
    }



    
  
    submitHandler = e =>{ //put back button going to homepage
        e.preventDefault()
        axios.post(`${host}add-user`,this.state)
        .then(response=>{
            if (response.data.status == "ok"){this.pageSuccess()}
            else{this.pageError()}
        })
        .catch(error=>{
            console.log(error)
        })

    }

    pageHome(){
        window.location.href = "/"
    }

    display(){
        if(Cookies.get('jwt')){
          return
        }else{
          return this.pageHome()

        }
      }
    render(){
        const {username, email, password, role} = this.state
        return(
            <div id="setfooterAU">
                {this.display()}
                <div id="title">
                    NEW USER 
                </div>
                <div id="AUdivider"></div>
                <div id="signup">
                <form onSubmit={this.submitHandler}>

                    <div>
                        <label id="AddU">Username: </label>
                        <input type="text" 
                        name="username" 
                        value={username}
                        onChange={this.changeHandler}></input>
                    </div>

                    <div>
                        <label id="AddU">E-mail: </label>
                        <input type="email" 
                        name="email" 
                        value={email} 
                        onChange={this.changeHandler}></input>
                    </div>

                    <div>
                        <label id="AddU">Password: </label>
                        <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={this.changeHandler}></input>
                    </div>
                    

                    <div>
                    

                    <label id="AddU">Role: </label>
                    <select value={this.state.role} onChange={this.changeHandler1}>
                    <option value="Cashier">Cashier</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    </select>
                    </div>
                    
                    <input type="submit" id="buttonsuser"></input>
                </form>
                <form action="/" >
                    <input type="submit" value="Return" id="buttonsuser"/>
                </form>
                </div>
            </div>
        )
    }
}

export default AddUser
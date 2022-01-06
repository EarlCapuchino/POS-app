import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Form, Badge, FloatingLabel} from "react-bootstrap";
import '../../App.css'
class Login extends React.Component {
    
    constructor(props){
        super(props)

        this.state = {
            email:'',
            password:''
        }
      

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

    submitHandler = e =>{ //put back button going to homepage
      
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:4000/login',this.state)
        .then(response=>{
            if(response.data.status == "ok"){
                console.log("from login"+ JSON.stringify(response.data.token))
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
            <>
                <div id="maindiv1">
                <div id="titleL">
                    LOGIN
                </div>
                <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                >
                    <Form.Control type="email" 
                    placeholder="name@example.com" 
                    name="email"
                    value={email}
                    onChange={this.changeHandler} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" 
                    placeholder="Password"
                    name="password" 
                    value={password}
                    onChange={this.changeHandler}/>
                </FloatingLabel>
                <br/>
                <input type="submit" onClick={this.submitHandler}></input>
                </div>
            </>
        )
    }
}

export default Login
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
class AddUser extends React.Component {
 
    
    
    pageSuccess(){
        window.location.href = "http://localhost:3000/success"
    }
    pageError(){
        window.location.href = "http://localhost:3000/error"
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
        console.log(this.state)
        axios.post('http://localhost:4000/add-user',this.state)
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
        const {username, email, password, role} = this.state
        return(
            <div>
                <h1>
                    Sign Up 
                </h1>
                <form onSubmit={this.submitHandler}>

                    <div>
                        <label>Username</label>
                        <input type="text" 
                        name="username" 
                        value={username}
                        onChange={this.changeHandler}></input>
                    </div>

                    <div>
                        <label>email</label>
                        <input type="email" 
                        name="email" 
                        value={email} 
                        onChange={this.changeHandler}></input>
                    </div>

                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={this.changeHandler}></input>
                    </div>

                    <div>
                    <label>Role</label>
                    <select value={this.state.role} onChange={this.changeHandler1}>
                    <option value="Cashier">Cashier</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    </select>
                    </div>
                    
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default AddUser
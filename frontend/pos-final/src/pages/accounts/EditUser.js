import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './EditUser.css'
import {host} from "../../utils/get-host"

class EditUser extends React.Component {
    constructor(props){
        super(props)
            
      
        this.state = {
            cookies: Cookies.get('jwt'),
            chosenName:'',
            previousRole:'',
            chosenRole: '',
            users:[]
        }
      
        this.changeHandler1 = this. changeHandler1.bind(this);
        this.changeHandler2 = this. changeHandler2.bind(this);
        this.DisplayOptions = this.DisplayOptions.bind(this)
    }

    componentDidMount(){
        fetch(`${host}edit-user`) 
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({users: body})
            this.setState({chosenName: this.state.users[0].username})
            this.setState({chosenRole: this.state.users[0].role})
            this.setState({previousRole: this.state.users[0].role})
        })
    }

    pageSuccess(){ //success and error prompts
        window.location.href = "/success"
    }
    pageError(){
        window.location.href = "/error"
    }

    promptPage(){
        window.location.href = "/edit-inventories/add-item/success-prompt"
    }

    changeHandler1(event) { 
        this.setState({chosenRole: event.target.value});
    }
    changeHandler2(event) {
        this.setState({chosenName: event.target.value});
        
    }

    submitHandler = e =>{ //put back button going to homepage
        e.preventDefault()
        axios.post(`${host}edit-user`,this.state)
        .then(response=>{
            if (response.data.status == "ok"){this.pageSuccess()}
            else{this.pageError()}
        })
        .catch(error=>{
            console.log(error)
        })
    

    }
    DisplayOptions = () => {
        const onSelect  = ({target:{selectedOptions:[option]}}) => 
        (
            this.setState({chosenName: option.value}),
            this.setState({previousRole: option.getAttribute('data-prevRole')})


        )
        return (
          <select onChange={onSelect}>
            {
            this.state.users.map((user, i)=>{
                return(
                <option value={user.username} data-prevRole={user.role}>{user.username}</option>
                )
            })
            }
          </select>
        )
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
        return(
            <div id="setfooterEU">
               {this.display()}
               <div id="positionusercomp">
                <div id="title">
                    EDIT USER
                </div>
                
                {
                        this.state.users.map((user, i)=>{
                            return(
                            <div id="usersSection">
                            <pre>
                            <b id="size">Username: {user.username}</b><br/> 
                            Email: {user.email} <br/> 
                            Role: {user.role}
                            </pre>
                            </div>
                            )
                        })
                }
                </div>
                   
                <div id="actionsau">
                <div className="rightCard">
                <form onSubmit={this.submitHandler}>
               
                <div className="desc">
                Choose user to change
                {this.DisplayOptions()}<br/>
                Current Role: {this.state.previousRole}<br/>
                
                Change role to:
                    <select value={this.state.chosenRole} onChange={this.changeHandler1}>
                    <option value="Cashier">Cashier</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    </select><br/>
                </div>
                    <input type="submit" className="buttonsuser"></input> 
                </form>
                <form action="/" >
                    <input type="submit" value="Return" className="buttonsuser"/>
                </form> 
                </div>
                </div>
                
                
             <br/>
             <br/>
             <br/>
             <br/>
            </div>
        )
    }
}

export default EditUser
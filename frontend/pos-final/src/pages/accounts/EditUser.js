import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './EditUser.css'

class EditUser extends React.Component {
    constructor(props){
        super(props)
            
      
        this.state = {
            cookies: Cookies.get('jwt'),
            chosenName:'',
            previousRole:'',
            chosenRole: '',
            users:[]
            
            //role: '' //default role, to be changed by the admin
        }
      
        this.changeHandler1 = this. changeHandler1.bind(this);
        this.changeHandler2 = this. changeHandler2.bind(this);
        this.DisplayOptions = this.DisplayOptions.bind(this)
    }

    componentDidMount(){
        fetch('http://localhost:4000/edit-user') 
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({users: body})
            this.setState({chosenName: this.state.users[0].username})
            this.setState({chosenRole: this.state.users[0].role})
            this.setState({previousRole: this.state.users[0].role})
        })
    }

    pageSuccess(){
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
        console.log("Name "+ event.target.value)
        this.setState({chosenName: event.target.value});
        
        console.log("Previous Role "+ event.target.prevRole)
    }

    submitHandler = e =>{ //put back button going to homepage
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:4000/edit-user',this.state)
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
            console.log(option.value),
            console.log(option.getAttribute('data-prevRole')),
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
        console.log("login")
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
                <div id="title">
                    EDIT USER
                </div>
                
                {
                        this.state.users.map((user, i)=>{
                            return(
                            <div id="usersSection">
                            <pre>
                            <b>Username: {user.username}</b><br/> 
                            Email: {user.email} <br/> 
                            Role: {user.role}
                            </pre>
                            </div>
                            )
                        })
                }
                
                

                <form onSubmit={this.submitHandler}>
                <label>Choose user to change</label>
                {this.DisplayOptions()}<br/>
                <label>Current Role: {this.state.previousRole}</label>
                
                <div>
                    <label>Change role to:</label>
                    <select value={this.state.chosenRole} onChange={this.changeHandler1}>
                    <option value="Cashier">Cashier</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    </select>
                </div><br/>
                    
                    <input type="submit"></input>
                </form>

              

             <br/>
             <br/>
             <br/>
             <br/>
            </div>
        )
    }
}

export default EditUser
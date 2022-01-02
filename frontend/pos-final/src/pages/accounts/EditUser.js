import React from 'react'
import axios from 'axios'


class EditUser extends React.Component {
    constructor(props){
        super(props)
            
      
        this.state = {
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

    
    promptPage(){
        window.location.href = "http://localhost:3000/edit-inventories/add-item/success-prompt"
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
            console.log(response)
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

    render(){
        return(
            <div>
                <h1>
                    Edit User
                </h1>
               
                {
                        this.state.users.map((user, i)=>{
                            return(
                            <p>
                            <b>{user.username}</b><br/> 
                            {user.email} <br/> 
                            {user.role}
                            </p>
                            )
                        })
                }
               
                <form onSubmit={this.submitHandler}>
                <label>Choose user to change</label>
                {this.DisplayOptions()}<br/>
                Current Role: {this.state.previousRole}
                
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
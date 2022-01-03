import React from 'react'
import './Homepage.css'

class Homepage extends React.Component{
    pageSetUp(){
        window.location.href = "http://localhost:3000/set-up-account"
    }
    pageLogin(){
        console.log("login")
        window.location.href = "http://localhost:3000/login"
    }
    componentDidMount() {
        fetch('http://localhost:4000/') //this will call find all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            console.log(body.status)
            if (body.status == "existent"){this.pageLogin()}//{this.pageLogin()} //if accounts are present, proceed to login page
            else{this.pageSetUp()}//{this.pageSetUp()} //else, proceed to set-up-account page
        })
    }
    
    render(){
        return(
            <>
            <div id="maindiv1">
            <div id="Divider"></div>
            <div id="mmessage">
                <h1><b>Welcome to Homepage</b></h1>
                </div>
                </div>
            </>
        )
    }
}

export default Homepage
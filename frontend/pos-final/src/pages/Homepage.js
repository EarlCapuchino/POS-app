import React from 'react'


class Homepage extends React.Component{
    pageSetUp(){
        window.location.href = "http://localhost:3000/set-up-account"
    }
    pageLogin(){
        window.location.href = "http://localhost:3000/login"
    }
    componentDidMount() {
        fetch('http://localhost:4000/homepage') //this will call find all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            if (body.status == "existent"){console.log("accounts exist")}//{this.pageLogin()} //if accounts are present, proceed to login page
            else{console.log("no accounts exists")}//{this.pageSetUp()} //else, proceed to set-up-account page
        })
    }
    
    render(){
        return(
            <>
                <h2>Welcome to Homepage</h2>
                
            </>
        )
    }
}

export default Homepage
import React from 'react'
import {Alert} from "react-bootstrap";

class Success extends React.Component{
    constructor() {
        super();
        this.state = {
           display: "",
        }
    }

    componentDidMount=()=>{
        fetch('http://localhost:4000/prompt') //i-trigger mo yung find-all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({display: body.status})
            console.log(body.status)
        })
    }
    render(){
        return(
            <>
            <Alert variant="success">
                <Alert.Heading>Successfully saved!</Alert.Heading>
                <p>
                <h4>{this.state.display}</h4>
                <a href="/dashboard">Return</a><br/>
                </p>
            </Alert>
            </>
        )
    }
}

export default Success
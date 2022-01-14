import React from 'react'
import {Alert} from "react-bootstrap";
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
import './prompts.css'
import {host} from '../utils/get-host'

class ErrorTrans extends React.Component{
    constructor() {
        super();
        this.state = {
           display: ""
        }
    }

    componentDidMount=()=>{
        fetch(`${host}prompt`)
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({display: body.status})
        })
    }

    render(){
        return(
            <>
                <div id="footerpush">
                <Alert variant="danger">
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                <h4>Transaction failed.</h4>
                <p>Unsuccessful query</p>
                <a href="/">Return</a><br/>
                </p>
                </Alert>
                </div>
            </>
        )
    }
}

export default ErrorTrans


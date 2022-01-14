import React from 'react'
import {Alert} from "react-bootstrap";
import {host} from '../utils/get-host'

class Success extends React.Component{
    constructor() {
        super();
        this.state = {
           display: "",
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
            <Alert variant="success">
                <Alert.Heading>Successfully saved!</Alert.Heading>
                <p>
                <h4>{this.state.display}</h4>
                <a href="/">Return</a><br/>
                </p>
            </Alert>
            </div>
            </>
        )
    }
}

export default Success
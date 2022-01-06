import React from 'react'
import {Alert} from "react-bootstrap";

class NotFound extends React.Component{

    render(){
        return(
            <>
                <Alert variant="danger">
                <Alert.Heading>404 Not Found</Alert.Heading>
                <a href="/dashboard">Return</a><br/>
                </Alert>
            </>
        )
    }
}

export default NotFound


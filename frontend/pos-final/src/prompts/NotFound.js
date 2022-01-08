import React from 'react'
import {Alert} from "react-bootstrap";

class NotFound extends React.Component{

    render(){
        return(
            <>
             <div id="footerpush">
                <Alert variant="danger">
                <Alert.Heading>404 Not Found</Alert.Heading>
                <a href="/">Return</a><br/>
                </Alert>
                </div>
            </>
        )
    }
}

export default NotFound


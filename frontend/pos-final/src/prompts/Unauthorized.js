import React from 'react'
import {Alert} from "react-bootstrap";

class Unauthorized extends React.Component{

    render(){
        return(
            <>
                <Alert variant="danger">
                <Alert.Heading>401 Unauthorized Access</Alert.Heading>
                <a href="/dashboard">Return</a><br/>
                </Alert>
            </>
        )
    }
}

export default Unauthorized


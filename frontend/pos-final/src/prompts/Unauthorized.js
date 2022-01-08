import React from 'react'
import {Alert} from "react-bootstrap";

class Unauthorized extends React.Component{

    render(){
        return(
            <>
             <div id="footerpush">
                <Alert variant="danger">
                <Alert.Heading>401 Unauthorized Access</Alert.Heading>
                <a href="/">Return</a><br/>
                </Alert>
                </div>
            </>
        )
    }
}

export default Unauthorized


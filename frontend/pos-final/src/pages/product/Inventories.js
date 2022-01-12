import React from 'react'
import Cookies from 'js-cookie'
import {host} from "../../utils/get-host"

class Inventories extends React.Component{
    constructor(props){
        super(props)

        this.state={
            cookies: Cookies.get('jwt'),
            products:[]
           
        }
    }

    componentDidMount() {
        fetch(`${host}view-inventory`) //i-trigger mo yung find-all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({products: body})
        })
      }

    pageLogin(){
        console.log("login")
        window.location.href = "/login"
    }

    display(){
        if(Cookies.get('jwt')){
            return
        }else{
            return this.pageLogin()

        }
    }

    render(){
        return(
            <>

                <h2>Inventories Page</h2>
                <br></br><br></br><br></br><br></br>
                <div>
                    {this.display()}{
                        this.state.products.map((product, i)=>{
                            return(
                            <div class = "div3"><p>
                                <div class = "div4">
                                    <pre>
                                ID: {product._id}                       Name: {product.name}<br/>
                                Price: ₱{product.price} </pre>                   
                                Stock: {product.stock}<br/>
                                -------------------------------------------------------------------------------------------------------------------------
                            </div>
                            <br></br>
                            </p>
                            <br></br>
                            </div>
                            
                            ) 
                        })
                    }
                    <form action="/" >
                    <input type="submit" value="Return" id="returndash"/>
                </form>
                </div>
                <br></br><br></br>
            </>
        )
    }
}

export default Inventories
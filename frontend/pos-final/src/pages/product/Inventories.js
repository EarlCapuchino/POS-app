import React from 'react'
import Cookies from 'js-cookie'
import {host} from "../../utils/get-host"
import './prod.css'

class Inventories extends React.Component{
    constructor(props){
        super(props)

        this.state={
            cookies: Cookies.get('jwt'),
            products:[]
           
        }
    }

    componentDidMount() {
        fetch(`${host}view-inventory`) 
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({products: body})
        })
      }

    pageLogin(){
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
                <div id="setfooterprod">
                <div id="margin2"></div>

                <div id="titleprod">Inventories Page</div>
                <br></br>
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
                                <font color="black">---------------------------------------------------------------------------------------------------------------------------</font>
                            </div>
                            <br></br>   
                            </p>
                            <br></br>
                            </div>
                            
                            ) 
                        })
                    }
                    <div id="margin2"></div><div id="margin2"></div><div id="margin2"></div>
                    <form action="/" >
                    <input type="submit" value="Return" id="returndashinv"/>
                </form>
                </div>
                <br></br><br></br>
                </div>
            </>
        )
    }
}

export default Inventories
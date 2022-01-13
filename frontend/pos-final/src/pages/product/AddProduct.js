import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './prod.css'
import {host} from "../../utils/get-host"

class AddProduct extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            price:'',
            stock:'',
            cookies: Cookies.get('jwt')
        }
      

    }
    
    pageSuccess(){
        window.location.href = "/success"
    }
    pageError(){
        window.location.href = "/error"
    }
    changeHandler = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{
        if (this.state.price=="" || this.state.name=="" || this.state.stock=="" || this.state.stock<0){
            return this.pageError()
        }
        e.preventDefault()
        console.log(this.state)
        
        axios.post(`${host}add-product`,this.state)
        .then(response=>{
            console.log(response.data.status)
            if (response.data.status == "ok"){this.pageSuccess()}
            else{this.pageError()}
        })
        .catch(error=>{
            console.log(error)
        })

    }
    render(){
        const {name, price, stock} = this.state
        return(

            <div id="setfooterprod">
                <div id="margin2"></div>
                <div>
                    <div id="titleprod">

                        Add Items in Inventory

                    </div>
                    
                </div>
                <br></br>
                <form onSubmit={this.submitHandler}>
                    <div class = "div">
                        <font color= "white" align = "center" text-align = "center">
                        Product Name<br></br>
                        </font>
                        <input type="text" 
                        name="name" 
                        value={name}
                        onChange={this.changeHandler}></input>
                    </div>
                    <div class = "div">
                        <font color= "white" align = "center" text-align = "center">
                        Price<br></br>
                        </font>
                        <input type="number" 
                        name="price" 
                        value={price} 
                        onChange={this.changeHandler}></input>
                    </div>
                    <div class = "div">
                        <font color= "white" align = "center" text-align = "center">
                        Stock<br></br>
                        </font>
                        <input 
                        type="number" 
                        name="stock" 
                        value={stock} 
                        onChange={this.changeHandler}></input>
                    </div>
                    <input type="submit" id="submitbutinv"></input>
                </form>
                <form action="/" >
                    <input type="submit" value="Return" id="returndashinv"/>
                </form>
            </div>
        )
    }
}

export default AddProduct
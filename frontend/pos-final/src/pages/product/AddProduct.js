import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './prod.css'

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
    
    promptPage(){
        window.location.href = "http://localhost:3000/edit-inventories/add-item/success-prompt"
    }
    changeHandler = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        
        axios.post('http://localhost:4000/add-product',this.state)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })

    }
    render(){
        const {name, price, stock} = this.state
        return(
            <div>
                <div class= "div2">
                    <font text-size="100" color= "black" align = "center" face = "Caslon" text-align = "center">
                    <div class = "div3">
                        <h2>Add Items in Inventory</h2> <br></br>
                    </div>
                    </font>
                </div>
                <br></br>
                <form onSubmit={this.submitHandler}>
                    <div class = "div">
                        <font text-size="30" color= "black" align = "center" face = "Caslon" text-align = "center">
                        Product Name<br></br>
                        </font>
                        <input type="text" 
                        name="name" 
                        value={name}
                        onChange={this.changeHandler}></input>
                    </div>
                    <div class = "div">
                        <font text-size="30" color= "black" align = "center" face = "Caslon" text-align = "center">
                        Price<br></br>
                        </font>
                        <input type="number" 
                        name="price" 
                        value={price} 
                        onChange={this.changeHandler}></input>
                    </div>
                    <div class = "div">
                        <font text-size="30" color= "black" align = "center" face = "Caslon" text-align = "center">
                        Stock<br></br>
                        </font>
                        <input 
                        type="number" 
                        name="stock" 
                        value={stock} 
                        onChange={this.changeHandler}></input>
                    </div>
                    <input type="submit" onClick={this.promptPage} ></input>
                </form>
            </div>
        )
    }
}

export default AddProduct
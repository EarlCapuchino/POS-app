import React from 'react'
import axios from 'axios'
import {Button, Table, Badge} from "react-bootstrap";
import Cookies from 'js-cookie'
import './transaction.css'
import {host} from "../../utils/get-host"
import '../../App.css'

class AddTransaction extends React.Component{
    constructor() {
        super();
        this.state = {
            cookies: Cookies.get('jwt'),
            products: [],
            purchased:[],
            total: 0
        }
    }
    
    displayPurchase() {
        return(
        <Table striped bordered hover bgcolor="#dadfeb">
        <thead>
            <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.purchased.map((purchase, i) => {
                    return (
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{purchase.name}</td>
                            <td>{purchase.price}</td>
                            <td>{purchase.quantity}</td>
                            <td>{purchase.amount}</td>
                            <td>
                                <Button variant="dark"
                                value={i} 
                                onClick={e => this.decrease(e)} 
                                >-</Button>
                                <Button variant="warning"
                                value={i} 
                                onClick={e => this.increase(e)}
                                >+</Button>
                                {" "}

                            </td>
                        </tr>
                       
                    )
                })
            }
        </tbody>
    </Table>
        )
    }

    stockCheck(e){
        const name = this.state.purchased[e.target.value].name
        const index = this.state.products.findIndex(element => element.name === name) //to find the stock
        if( this.state.products[index].stock > 0){ //if there are stocks left, proceed
            this.state.products[index].stock -=1; //decrease the stock 
            this.setState({products: this.state.products})
            return true //can add
        }else{
            return false //cannot add 
        }
    }

    increase = (e) =>{
        if(this.stockCheck(e)){ //demand should not exceed supply
            let price = this.state.purchased[e.target.value].price
            this.state.purchased[e.target.value].quantity += 1;
            this.state.purchased[e.target.value].amount = +(this.state.purchased[e.target.value].amount + price).toFixed(2)
            //in order to simplify to 2 decimal places
            this.state.total = +(this.state.total + price).toFixed(2)
            this.setState({purchased: this.state.purchased, total: this.state.total})
        }
    }
    decrease = (e) =>{
        const name = this.state.purchased[e.target.value].name
        const index = this.state.products.findIndex(element => element.name === name) //to find the stock
        if (this.state.purchased[e.target.value].quantity > 0){
            console.log("true")
            let price = this.state.purchased[e.target.value].price
            this.state.purchased[e.target.value].quantity -= 1;
            this.state.purchased[e.target.value].amount = +(this.state.purchased[e.target.value].amount - price).toFixed(2)
            //in order to simplify to 2 decimal places
            this.state.products[index].stock += 1; //increase the stock again as the item is returned
            this.state.total = +(this.state.total - price).toFixed(2)
            this.setState({products: this.state.products, purchased: this.state.purchased})
        }
    }

    purchase = (e) =>{
        const index = e.target.value
        const id = e.target.dataset.index 

        if (this.state.products[index].stock > 0){ //cherck first if it has stock left
            const name = this.state.products[index].name
            const price = this.state.products[index].price
            const newPurchase = {
                _id: e.target.dataset.index,
                name: name,
                price: price,
                quantity: 1,
                amount: price
            }
            this.state.purchased.push(newPurchase)
            this.state.products[index].stock -= 1;
            this.state.total += newPurchase.price
            this.setState({purchased: this.state.purchased, products: this.state.products, total: this.state.total})
        }
    }

    componentDidMount=()=>{
        fetch(`${host}view-inventory`) //i-trigger mo yung find-all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({products: body})
        })
    
    }
    pageSuccess(){
        window.location.href = "/success"
    }
    pageError(){
        window.location.href = "/error"
    }
    pageErrorTrans(){
        window.location.href = "/error-transaction"
    }

    submitHandler = (e) =>{
        if (this.state.total=="0"){
            return this.pageErrorTrans()
        }
        e.preventDefault()
        console.log(this.state)
        axios.post(`${host}add-transaction`,this.state) //return ng add transaction
        .then(response=>{
            console.log(response.data.status)
            if (response.data.status == "ok"){this.pageSuccess()}
            else{this.pageError()}
        })
        .catch(error=>{
            console.log(error)
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

    render() {
        return (
            <div id ="setfooterAT">
                {this.display()}
                <div id="titleL">ADD TRANSACTION</div>
            
                <Button variant="dark" id="butSize">Product
                           {" "}<Badge pill bg="warning"><font color="black">stock</font></Badge>
                </Button><br/>
                <h2>Select product/s to purchase:</h2>
                 {
                 this.state.products.map((product, i)=>{
                            return(
                            <p>
                           {" "}
                           <Button id="butSize" key = {i} variant="outline-dark" 
                           name={product.name}
                           data-index={product._id}
                           onClick={(e)=> this.purchase(e)} value={i}
                           >
                           {product.name}
                           {" "}<Badge pill bg="warning"><font color="black">{product.stock}</font></Badge>
                           </Button>
                           </p>
                            )
                        })
                 }
                      
                 <div id="margin">
                 </div>
               {this.displayPurchase()}
                

                <Table striped bordered hover bgcolor="#dadfeb">
                <thead>
                    <tr>
                        <th>Total: ₱</th><th>{this.state.total}</th>
                    </tr>
                </thead>
                </Table>
                <Button variant="dark" id="paySize" onClick={this.submitHandler}>PAY</Button>{' '}
                <div id="margin">
                 </div>
            </div>
        )
    }

}
export default AddTransaction
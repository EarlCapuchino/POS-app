import React from 'react'
import axios from 'axios'
import {Button, Table, Badge} from "react-bootstrap";
import Cookies from 'js-cookie'
import './transaction.css'


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
    
    display() {
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
        fetch('http://localhost:4000/view-inventory') //i-trigger mo yung find-all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({products: body})
        })
    
    }
    pageSuccess(){
        window.location.href = "http://localhost:3000/success"
    }
    pageError(){
        window.location.href = "http://localhost:3000/error"
    }
    submitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:4000/add-transaction',this.state) //return ng add transaction
        .then(response=>{
            console.log(response.data.status)
            if (response.data.status == "ok"){this.pageSuccess()}
            else{this.pageError()}
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <br></br><br></br><br></br><br></br><br></br>
                <h1>ADD TRANSACTION</h1>
            
                <Button variant="dark">Product
                           {" "}<Badge pill bg="warning">stock</Badge>
                </Button><br/>
                <h2>Select product to purchase:</h2>
                 {
                 this.state.products.map((product, i)=>{
                            return(
                            <p>
                           {" "}
                           <Button key = {i} variant="outline-dark" 
                           name={product.name}
                           data-index={product._id}
                           onClick={(e)=> this.purchase(e)} value={i}
                           >
                           {product.name}
                           {" "}<Badge pill bg="warning">{product.stock}</Badge>
                           </Button>
                           </p>
                            )
                        })
                 }
                      
            
               {this.display()}
            

                <Table striped bordered hover bgcolor="#dadfeb">
                <thead>
                    <tr>
                        <th>Total: ₱</th><th>{this.state.total}</th>
                    </tr>
                </thead>
                </Table>
                <Button variant="dark" onClick={this.submitHandler}>PAY</Button>{' '}
            </div>
        )
    }

}
export default AddTransaction
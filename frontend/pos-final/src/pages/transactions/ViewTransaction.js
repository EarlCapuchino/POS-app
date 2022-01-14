import React from 'react'
import Cookies from 'js-cookie'
import {Button, Table, Badge} from "react-bootstrap";
import './transaction.css'
import {host} from "../../utils/get-host"


class ViewTransaction extends React.Component{
    constructor(props){ //list of transactions
        super(props)

        this.state={
            transactions:[]
        }
    }

    componentDidMount(){
        fetch(`${host}view-transactions`)
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({transactions: body})
        })
    }

    method(transaction){ //finds transactions
        let prod =[]
        for (let j=0;j<transaction.products.length;j++){
            prod.push(
            
                <tr key={j}>
                    <td>{transaction.products[j].productName}</td>
                    <td>{transaction.products[j].productQuantity}</td>
                    <td>{transaction.products[j].productPrice}</td>
                </tr>
            
            )
        
        }
        return(prod)
    }
    
    pageLogin(){
        window.location.href = "/login"
    }

    display(){ //if not logged in, goes to login page
        if(Cookies.get('jwt')){
            return
        }else{
            return this.pageLogin()

        }
    }  
    
    render(){
        return(
            <div>
                {this.display()}

            <div id="VTbackground">

                <element class = "view">

                <div id="VTtitle">TRANSACTIONS PAGE</div>
                {
                        this.state.transactions.map((transaction, i)=>{
                            return(
                            <p>
                            <Table bordered bgcolor="#dadfeb">
                            <thead>
                                <tr>
                                    <th>ID: {transaction._id}</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.method(transaction)}
                            </tbody>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Amount to be paid: </th>
                                    <th>₱{transaction.amountToBePaid}</th>
                                </tr>
                            </thead>
                            </Table>
                            </p>
                            )
                        })
                    }
                   
                </element>


                <form action="/" >
                    <input type="submit" value="Return" id="returndash"/>
                </form>
            </div>


            </div>
        )
    }
}

export default ViewTransaction
import React from 'react'


class ViewTransaction extends React.Component{
    constructor(props){
        super(props)

        this.state={
            transactions:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:4000/view-transactions') //i-trigger mo yung find-all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({transactions: body})
        })
    }

    method(transaction){
        let prod =[]
        for (let j=0;j<transaction.products.length;j++){
            prod.push(
                <div key={j}>
                {transaction.products[j].productName}
                ...{transaction.products[j].productQuantity}
                ......{transaction.products[j].productPrice}
                </div> 
           
             )
        }
        return(prod)
    }
    
    
    
    render(){
        return(
            <>
                <h2>Transactions Page</h2>
               
        
                {
                        this.state.transactions.map((transaction, i)=>{
                            return(
                            <p>
                            ID: {transaction._id}<br/>
                           
                            {this.method(transaction)}
                            Amount to be paid: ₱{transaction.amountToBePaid}<br/>
                            </p>
                            )
                        })
                    }
            </>
        )
    }
}

export default ViewTransaction
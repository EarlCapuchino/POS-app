import React from 'react'
import Cookies from 'js-cookie'

class Inventories extends React.Component{
    constructor(props){
        super(props)

        this.state={
            cookies: Cookies.get('jwt'),
            products:[]
           
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/view-inventory') //i-trigger mo yung find-all
        .then(response=>response.json()) //app.get('/find-all', controller.findAll) 
        .then(body=>{
            this.setState({products: body})
        })
      }
    
    
    render(){
       
        return(
            <> <element class = "view">
                <h2>Inventories Page</h2>
                <div>
                   
                    {
                        this.state.products.map((product, i)=>{
                            return(
                            <p>
                            ID: {product._id}<br/>
                            Name: {product.name}<br/>
                            Price: ₱{product.price}<br/>
                            Stock: {product.stock}<br/>
                            </p>
                            )
                        })
                    }
                   
                </div>
                </element>
            </>
        )
    }
}

export default Inventories
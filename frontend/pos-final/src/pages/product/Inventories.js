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
            <>

                <h2>Inventories Page</h2>
                <br></br><br></br><br></br><br></br>
                <div>
                    {
                        this.state.products.map((product, i)=>{
                            return(
                            <div class = "div3"><p>
                                <div class = "div4">
                                    <pre>
                                ID: {product._id}                       Name: {product.name}<br/>
                                Price: ₱{product.price} </pre>                   
                                Stock: {product.stock}<br/>
                                ---------------------------------------------------------------------------------------------------------------------------
                            </div>
                            <br></br>
                            </p>
                            <br></br>
                            </div>
                            
                            ) 
                        })
                    }
                </div>
                <br></br><br></br>
            </>
        )
    }
}

export default Inventories
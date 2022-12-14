/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import { Component } from 'react';
import AccountBalance from './AccountBalance';

class Credits extends Component {
    constructor (props) {  // Create and initialize state
        super(props)
        this.state = {
          accountBalance: this.props.accountBalance,
          credits: this.props.credits,
          creditInput: {
            description: '',
            amount: 0
          }
        }
      }

    // update description field
    handleDescriptionChange = (e) => {
        const updatedCreditInput = {...this.state.creditInput}
        updatedCreditInput.description = e.target.value
        this.setState({creditInput: updatedCreditInput})
    }

    // update amount field
    handleAmountChange = (e) => {
        const updatedCreditInput = {...this.state.creditInput}  
        updatedCreditInput.amount = e.target.value 
        this.setState({creditInput: updatedCreditInput}) 
    }

    handleSubmit = (creditInfo) => {
        creditInfo.preventDefault()
        this.props.addCreditInfo(this.state.creditInput)  // Update state in the top-level component (App.js)
    }
      
    render() {
        return (
            <div>
              <h1 className='App-header'>Credits</h1>
              
              <div id="credits">
                {
                    // extract data from JSON
                    this.state.credits.map( (credit) => { 
                        let date = credit.date.slice(0,10);  
                        return (
                            <li className='list-item' key={credit.id}>${credit.amount} {credit.description} {date}</li>
                        )
                        }
                    )
                }
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="description" onChange={this.handleDescriptionChange}/>
                    <input type="number" step="0.01"name="amount" onChange={this.handleAmountChange}/>
                    <button type="submit">Add Credit</button>
                </form>
                <br/>
                <div className='App-header'>
                    <AccountBalance accountBalance={this.props.accountBalance.toFixed(2)}/>
                </div>
            </div>
            <br/>
            
              <Link to="/">Return to Home</Link>
            </div>
          )
    }
}
export default Credits;
/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import { Component } from 'react';
import AccountBalance from './AccountBalance';

class Debits extends Component {
    constructor (props) {  // Create and initialize state
        super(props)
        this.state = {
          accountBalance: this.props.accountBalance,
          debits: this.props.debits,
          debitInput: {
            description: '',
            amount: 0
          }
        }
      }

    // update description field
    handleDescriptionChange = (e) => {
        const updatedDebitInput = {...this.state.debitInput}
        updatedDebitInput.description = e.target.value
        this.setState({debitInput: updatedDebitInput})
    }

    // update amount field
    handleAmountChange = (e) => {
        const updatedDebitInput = {...this.state.debitInput}  
        updatedDebitInput.amount = e.target.value 
        this.setState({debitInput: updatedDebitInput}) 
    }

    handleSubmit = (debitInfo) => {
        debitInfo.preventDefault()
        this.props.addDebitInfo(this.state.debitInput)  // Update state in the top-level component (App.js)
    }
      
    render() {
        return (
            <div>
              <h1 className='App-header'>Debits</h1>

              <div id="debits">
                {
                    // extract data from JSON
                    this.state.debits.map( (debit) => { 
                        let date = debit.date.slice(0,10);  
                        return (
                            <li key={debit.id}>${debit.amount} {debit.description} {date}</li>
                        )
                        }
                    )
                }
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="description" onChange={this.handleDescriptionChange}/>
                    <input type="number" step="0.01"name="amount" onChange={this.handleAmountChange}/>
                    <button type="submit">Add Debit</button>
                </form>
                <br/>
                <div className='App-header'>
                    <AccountBalance accountBalance={this.props.accountBalance.toFixed(2)}/>
                </div>
                <br/>
            </div>
            <br/>
            
              <Link to="/">Return to Home</Link>
            </div>
          )
    }
}
export default Debits;
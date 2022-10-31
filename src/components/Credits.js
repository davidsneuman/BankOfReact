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
          debits: this.props.debits,
          creditInput: {
            description: '',
            amount: 0
          }
        }
      }

        // When User Name input is changed, capture the new input value and update state
  handleDescriptionChange = (e) => {
    const updatedCreditInput = {...this.state.creditInput}  // Create an object for state
    updatedCreditInput.description = e.target.value  // Set object's userName to the new input value
    this.setState({creditInput: updatedCreditInput})  // Update state with object values
    console.log(this.state.creditInput)
  }

    // When User Name input is changed, capture the new input value and update state
    handleAmountChange = (e) => {
    const updatedCreditInput = {...this.state.creditInput}  // Create an object for state
    updatedCreditInput.amount = e.target.value  // Set object's userName to the new input value
    this.setState({creditInput: updatedCreditInput})  // Update state with object values
    console.log(this.state.creditInput)
    }

    handleSubmit = (creditInfo) => {
        creditInfo.preventDefault()
        this.props.addCreditInfo(this.state.creditInput)  // Update state in the top-level component (App.js)
    }
      
    render() {
        return (
            <div>
              <h1>Credits</h1>
              <AccountBalance accountBalance={this.props.accountBalance}/>

              <div id="credits">
                {
                this.state.credits.map( (credit) => {  // Extract "id", "name", and "email" properties of each user JSON array element
                    let date = credit.date.slice(0,10);  
                    return (
                        <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
                    )
                    }
                )
                }
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="description" onChange={this.handleDescriptionChange}/>
                    <input type="number" name="amount" onChange={this.handleAmountChange}/>
                    <button type="submit">Add Credit</button>
                </form>
            </div>
            <br/>
              <Link to="/">Return to Home</Link>
            </div>
          )
    }


}

export default Credits;
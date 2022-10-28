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
          debits: this.props.debits
        }
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
            </div>
            <br/>
              <Link to="/">Return to Home</Link>
            </div>
          )
    }


}

export default Credits;
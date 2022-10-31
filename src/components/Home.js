/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import '../App.css';

class Home extends Component {
  render() {
    return (
      <div className='App'>
        <img src="https://picsum.photos/200/200" alt="bank"/>

        <h1>Bank of React</h1>
        <ul className='App-header'>
        <Link to="/userProfile" className='App-link'>User Profile</Link>

        <Link to="/login" className='App-link'>Login</Link>

        <Link to="/credits" className='App-link'>Credits</Link>

        <Link to="/debits" className='App-link'>Debits</Link>
        </ul>

        <br/><br/>
        <div className='App-header'>
        <AccountBalance accountBalance={this.props.accountBalance.toFixed(2)}/>
        </div>
        
      </div>
    );
  }
}

export default Home;
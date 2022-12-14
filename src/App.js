/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      uniqueId: 0, //required for duplicate entries in credit/debit
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // add a new credit entry
  addCreditInfo = (creditInfo) => {
    let today = new Date()
    let date = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate() 
    const newCreditInfo = {
        amount: parseFloat(creditInfo.amount),
        date: date,
        description: creditInfo.description,
        id: this.state.uniqueId
    }
    var newCreditList = this.state.creditList
    newCreditList.push(newCreditInfo)
    const newAccountBalance = this.state.accountBalance + newCreditInfo.amount
    this.setState({credits: newCreditList})
    this.setState({accountBalance: newAccountBalance})
    this.setState({uniqueId: this.state.uniqueId + 1})    
  }

    // add a new credit entry
    addDebitInfo = (debitInfo) => {
        let today = new Date()
        let date = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate() 
        const newDebitInfo = {
            amount: parseFloat(debitInfo.amount),
            date: date,
            description: debitInfo.description,
            id: this.state.uniqueId
        }
        var newdebitList = this.state.debitList
        newdebitList.push(newDebitInfo)
        const newAccountBalance = this.state.accountBalance - newDebitInfo.amount
        this.setState({debits: newdebitList})
        this.setState({accountBalance: newAccountBalance})
        this.setState({uniqueId: this.state.uniqueId + 1})    
      }

  // sum credits
  addCredits = () => {
    var sumCredits = 0;
    this.state.creditList.forEach((credit) => sumCredits += credit.amount)
    this.setState({accountBalance: this.state.accountBalance + sumCredits})
  }

    // sum debits
    addDebits = () => {
        var sumDebits = 0;
        this.state.debitList.forEach((debit) => sumDebits += debit.amount)
        this.setState({accountBalance: this.state.accountBalance - sumDebits})
      }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} accountBalance={this.state.accountBalance} addCreditInfo={this.addCreditInfo}/>)
    const DebitsComponent = () => (<Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} addDebitInfo={this.addDebitInfo}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/BankOfReact">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }

        // Make async API call to retrieve data from remote website
        async componentDidMount() {
            //CREDIT API CALL
            let creditEndpoint = 'https://moj-api.herokuapp.com/credits';  // Link to remote website API endpoint
        
            // Await for promise (completion) returned from API call
            try {  // Accept success response as array of JSON objects
                let response = await axios.get(creditEndpoint);
                // To get data object in the response, need to use "response.data"
                this.setState({creditList: response.data}); 
                this.addCredits(); 
            } 
            catch (error) {  // Print out errors at console when there is an error response
              if (error.response) {
                // The request was made, and the server responded with error message and status code.
                console.log(error.response.data);  // Print out error message (e.g., Not Found)
                console.log(error.response.status);  // Print out error status code (e.g., 404)
              }    
            }


            //DEBIT API CALL
            let debitEndpoint = 'https://moj-api.herokuapp.com/debits';  // Link to remote website API endpoint
        
            // Await for promise (completion) returned from API call
            try {  // Accept success response as array of JSON objects
                let response = await axios.get(debitEndpoint);
                // To get data object in the response, need to use "response.data"
                this.setState({debitList: response.data}); 
                this.addDebits();
            } 
            catch (error) {  // Print out errors at console when there is an error response
              if (error.response) {
                // The request was made, and the server responded with error message and status code.
                console.log(error.response.data);  // Print out error message (e.g., Not Found)
                console.log(error.response.status);  // Print out error status code (e.g., 404)
              }    
            }

          }  
}

export default App;
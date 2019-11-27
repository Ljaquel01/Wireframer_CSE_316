import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

//import Navbar from './components/navbar/Navbar.js';
//import RegisterScreen from './components/register_screen/RegisterScreen.js';
//import LoginScreen from './components/login_screen/LoginScreen.js';
//import HomeScreen from './components/home_screen/HomeScreen.js';
//import EditScreen from './components/edit_screen/EditScreen.js';
import DatabaseTester from './test/DatabaseTester'

class App extends Component {
  render() {
    return (
      <div>
        QLok
        
        <DatabaseTester/>
      </div>
    )
  }
}

export default App;

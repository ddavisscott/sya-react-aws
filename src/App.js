import React, { Component } from 'react';
import './App.css';
import Title from './title'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Analytics } from 'aws-amplify'
import { Storage } from 'aws-amplify';
import UploadImage from './UploadImage';
import NavigationBar from './components/NavigationBar';
import UploadPage from './components/UploadPage';
import CssBaseline from "@material-ui/core/CssBaseline";
import "./main.css";
import Dashboard from './Dashboard';
import CardMedia from './CardMedia';
const aws = require('aws-sdk');
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "./components/NavigationBar.js";
import UploadPage from "./components/UploadPage.js";
import "./main.css";

Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err));

class App extends Component {
    constructor(props){
        super(props);
    }

      signOut = () => {
        Auth.signOut()
          .then(data => console.log(data), window.location.reload(true))
          .catch(err => console.log(err));
      }

      onChange(e) {
          const file = e.target.files[0];
          Storage.put('example2.png', file, {
              contentType: 'image/png',
              bucket: 'myapp-20181030214040-deployment'
          })
          .then (result => console.log(result))
          .catch(err => console.log(err));
      }

      render() {
          return (
            <div>
                <UploadImage/>
                <Dashboard/>
                
              
                <button onClick = {this.signOut}>Sign Out</button>
            </div>
            <React.Fragment>
            <CssBaseline />
            <NavigationBar />
            <UploadPage />
            </React.Fragment>
          )
      }
    }
    




export default withAuthenticator(App);



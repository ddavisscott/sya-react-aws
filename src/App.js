import React, { Component } from 'react';
import './App.css';
import Title from './title'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Analytics } from 'aws-amplify'
import { Storage } from 'aws-amplify';
import UploadImage from './UploadImage'
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
          .then(data => console.log(data))
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



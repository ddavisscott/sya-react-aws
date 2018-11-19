import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import UploadImage from './UploadImage';
import NavigationBar from './components/NavigationBar';
import UploadPage from './components/UploadPage';
import CssBaseline from "@material-ui/core/CssBaseline";
import "./main.css";
import Dashboard from './Dashboard';
import ArtistSignUp from './ArtistSignUp';

class App extends Component {

    render() {
          return (
            <div>
                <React.Fragment>
                    <CssBaseline />
                    <NavigationBar />
                    <UploadPage />
                </React.Fragment>
                <ArtistSignUp/>
                <UploadImage/>
                <Dashboard/>
            </div> 
          )
    }
}
    
export default withAuthenticator(App);

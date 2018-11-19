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

import CardMedia from './CardMedia';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const aws = require('aws-sdk');
const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const uploadArt = () => <UploadPage/>;

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/artistDashBoard">Dashboard</Link>
    </li>
    <li>
      <Link to="/uploadArt">Upload Art</Link>
    </li>
    
  </ul>
);

const mainPage = () => <h1>MAIN PAGE</h1>;
const artistDashBoard = () => <Dashboard/>;




Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err));

class App extends Component {
    render() {
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
                <NavigationBar />
                <button onClick = {this.signOut}>Sign Out</button>
                <Router>
                    <div>
                        <Header />

                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/artistDashBoard" component={artistDashBoard} />
                        <Route path="/uploadArt" component={uploadArt} />
                    </div>
                </Router>
            </div>
          )
    }
}
    
export default withAuthenticator(App);

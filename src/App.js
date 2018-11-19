import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import NavigationBar from './components/NavigationBar';
import UploadPage from './components/UploadPage';
import UploadImage from './UploadImage';
import "./main.css";
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PersistentDrawerLeft from './components/PersistentDrawerLeft';

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


class App extends Component {
    render() {
          return (
            <div>
                <PersistentDrawerLeft /> 
                <UploadImage/>
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

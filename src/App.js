import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import NavigationBar from './components/NavigationBar';
import UploadPage from './components/UploadPage';
import "./main.css";
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ArtInfo from './ArtInfo';

const Home = () => <h2>Home</h2>; //unused
const About = () => <h2>About</h2>; //unused

const uploadArt = () => <UploadPage/>;
const mainPage = () => <h1>MAIN PAGE</h1>;
const artistDashBoard = () => <Dashboard/>;
const artInfo = () => <ArtInfo/>;

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

function uploadArtD({ match }) {
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}`}><UploadPage/></Link>
        </li>
        <li>
          <Link to={`${match.url}`}><ArtInfo/></Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

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
    <li>
      <Link to="/artInfo">ART INFO (DEBUG)</Link>
    </li>
    
  </ul>
);




class App extends Component {
    render() {
          return (
            <div>
                <NavigationBar />
                <Router>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/artistDashBoard" component={artistDashBoard} />
                        <Route path="/uploadArt" component={uploadArt} />
                        <Route path="/artInfo" component={artInfo} />
                    </div>
                </Router>
            </div>
          )
    }
}
    
export default withAuthenticator(App);

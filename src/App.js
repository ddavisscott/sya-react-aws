<<<<<<< HEAD
import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { Drawer, List, ListItem, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      clickedDrawer: false
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
=======
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
>>>>>>> e5763e987ed0468ecc77f7cff5d0378d83c18142
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/SignIn");
  };

  handleDrawer = event => {
    this.setState({ clickedDrawer: this.state.clickedDrawer ? false : true });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              {this.state.isAuthenticated ? (
                <Navbar.Brand>
                  <IconButton onClick={this.handleDrawer}>
                    <MenuIcon />
                  </IconButton>
                </Navbar.Brand>
              ) : null}

              <Navbar.Brand>
                <Link to="/">
                  {
                    <img
                      src="https://i.imgur.com/5vIKxfR.png"
                      alt=""
                      height="45"
                      width="45"
                    />
                  }
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <Fragment>
                    <LinkContainer to="/settings">
                      <NavItem>Settings</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Sign Out</NavItem>
                  </Fragment>
                ) : (
                  <Fragment>
                    <LinkContainer to="/SignIn">
                      <NavItem>Sign In</NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Drawer
            anchor="left"
            open={this.state.clickedDrawer}
            onClick={this.handleDrawer}
          >
            <List>
              <LinkContainer to="/Dashboard">
                <ListItem>
                  <DashboardIcon /> Dashboard
                </ListItem>
              </LinkContainer>
              <LinkContainer to="/UploadPage">
                <ListItem>Upload Art</ListItem>
              </LinkContainer>
            </List>
          </Drawer>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);

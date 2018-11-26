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
              <Link to="/Home">              
              {<img
                  src="https://i.imgur.com/5vIKxfR.png"
                  alt=""
                  height="45"
                  width="45"
                />}
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
                <Fragment>
                    <LinkContainer to="/Home">
                    <NavItem>Home</NavItem>
                    </LinkContainer>
                </Fragment>
                <Fragment>
                    <LinkContainer to="/AboutUs">
                    <NavItem>About Us</NavItem>
                    </LinkContainer>
                </Fragment>
              {this.state.isAuthenticated
                ? (<Fragment>

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

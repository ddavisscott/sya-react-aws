import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { Drawer, List, ListItem, IconButton, Input } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";

import Button from '@material-ui/core/Button';
import "./App.css";

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            clickedDrawer: false,
            role: "",
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

        Auth.currentAuthenticatedUser().then( user => {
            console.log(user.attributes["custom:role"]);
            this.setState({ role: user.attributes["custom:role"]})
        });
    };

    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);

        this.props.history.push("/SignIn");
    };

    handleDrawer = event => {
        this.setState({
            clickedDrawer: this.state.clickedDrawer ? false : true
        });
    };

    renderBusiness() {
        return(
            <List>
            <LinkContainer to="/BusinessSubmissions">
                <ListItem>
                    <Button>
                    <DashboardIcon /> Submissions 
                    </Button>
                </ListItem>
            </LinkContainer>
            <LinkContainer to="/MyAccount">
                <ListItem>My Account</ListItem>
            </LinkContainer>
        </List>
        );
    }

    renderArtist() {
        return(
            <List>
            <LinkContainer to="/UploadPage">
                <ListItem>
                <Button color="red">
                    Upload Art 
                    </Button>
                </ListItem>
            </LinkContainer>
            <LinkContainer to="/Dashboard">
                <ListItem>
                    <Button>
                    <DashboardIcon /> Dashboard 
                    </Button>
                </ListItem>
            </LinkContainer>
            <LinkContainer to="/MyAccount">
                <ListItem>My Account</ListItem>
            </LinkContainer>
            <LinkContainer to="/ArtistReviews">
                <ListItem>Reviews</ListItem>
            </LinkContainer>
        </List>
        );
    }


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
                                {this.state.isAuthenticated ? (
                                    <Fragment>
                                        <NavItem onClick={this.handleLogout}>
                                            Sign Out
                                        </NavItem>
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
                        width="200"
                    >
                    {this.state.role === "artist"? 
                        this.renderArtist() : this.renderBusiness() }
                    </Drawer>
                    <Routes childProps={childProps} />
                </div>
            )
        );
    }
}

export default withRouter(App);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { Button } from "@material-ui/core";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({ isLoading: false });
  }



  renderLander() {
    return (
      <div className="lander">
        <h1>Share Yourself Artists</h1>
        <p>A place to share your art</p>
        <div>
          <Link to="/SignIn" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/ArtistSignUp" className="btn btn-success btn-lg">
            Sign up
          </Link>
        </div>
      </div>
    );
  }


  render() {
    return (
      <div className="Home">
      <h1>Your Art, Our Way </h1>
      <h2>Share Yourself Artists is the easiest way to share your artwork 
        to millions of art lovers AROUND THE WORLD!
      </h2>
      <LinkContainer to="/BusniessSignUp">
          <Button>Busniess Sign Up</Button>
      </LinkContainer>
      <LinkContainer to="/ArtistSignUp">
          <Button>Artist Sign Up</Button>
      </LinkContainer>
      </div>
    );
  }
}
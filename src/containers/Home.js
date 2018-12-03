import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
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

  render() {
    return (
      <div className="Home" align='center'>
      <h1>Your Art, Our Way </h1>
      <h2>Share Yourself Artists is the easiest way to share your artwork 
        to millions of art lovers AROUND THE WORLD!
      </h2>
      <img
      src = "https://i.imgur.com/y6Bn06P.png"
      alt = "banner"
      width = '100%'
      />
      

      { this.props.isAuthenticated? (null) : (
        <div>
          <LinkContainer to="/BusinessSignUp">
              <Button variant = "outlined">Business Sign Up</Button>
          </LinkContainer>
          <LinkContainer to="/ArtistSignUp">
              <Button variant = "outlined">Artist Sign Up</Button>
          </LinkContainer>
        </div>
      )}
      <img
      src = "https://i.imgur.com/yuSOiQf.png"
      alt = "bannerinstructions"
      width = '100%'
      />
      </div>
    );
  }
}
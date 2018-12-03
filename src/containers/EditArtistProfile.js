import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { FormGroup, FormControl } from "react-bootstrap";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import { addArtAction } from "../actions/addArtAction"
import { Redirect } from 'react-router';

class EditArtistProfile extends Component {
  constructor(props) {
    const uuidv4 = require("uuid/v4");
    super(props);
    this.state = {
      mySub: "",
      instagram: "n/a",
      twitter: "n/a",
      tumblr: "n/a",
      facebook: "n/a",
      redirect: false,
    };

    Auth.currentAuthenticatedUser().then(user => {
      this.setState({mySub: user.attributes.sub})
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.instagram == "") {
      alert("Instagram field cannot be left blank.");
    }
    else if (this.state.twitter == "") {
      alert("Twitter field cannot be left blank.");
    } 
    else if (this.state.tumblr == "") {
      alert("Tumblr field cannot be left blank.");
    } 
    else if (this.state.facebook == "") {
      alert("Facebook field cannot be left blank.");
    } 
    else {
      const uploadFile = {
        role: "artist",
        userID: this.state.mySub,
        instagram: this.state.instagram,
        twitter: this.state.twitter,
        tumblr: this.state.tumblr,
        facebook: this.state.facebook,
      };
      fetch(
        "https://rehhhhon7i.execute-api.us-east-1.amazonaws.com/prod/update-artist-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          mode: "no-cors",
          body: JSON.stringify(uploadFile)
        }
      )
      .then(result => console.log(result))
      .catch(err => console.log(err));
    }    
  };
  
  //Handles redirect when page is submitted
  Redirectrender = () => {
    if (this.state.redirect) {
      return <Redirect to ="/Dashboard" />
    }
  }
  //Function for handling change within render function, by setting states in constructor
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  /*
  //Render displays all info for the update information page
  */
  render() {
    return (     
      <div className="ArtInfo">
        {this.Redirectrender()}
        <h1>Update Artist Profile Information:</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Contact Handles: </h2>
          <FormGroup bsSize="large">
            <InputLabel>Instagram Handle*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="instagram"
              value={this.state.instagram}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <InputLabel>Twitter Handle*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="twitter"
              value={this.state.twitter}
              onChange={this.handleChange}
            />
          <FormGroup bsSize="large">
            <InputLabel>Tumblr*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="tumblr"
              value={this.state.tumblr}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <InputLabel>FaceBook*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="facebook"
              value={this.state.facebook}
              onChange={this.handleChange}
            />
          </FormGroup>
          </FormGroup>
          <LinkContainer to="/Dashboard">
            <Button>Cancel</Button>
          </LinkContainer>
          <Button type="submit">Update Profile Information</Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  image:state.imageReducer.image
})

const mapDispatchToProps =  {
  addArt: addArtAction
}

export default connect (mapStateToProps, mapDispatchToProps)(EditArtistProfile);

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { Auth, Storage } from "aws-amplify";
import { addArtAction } from "../actions/addArtAction"
import { Redirect } from 'react-router';

class EditBusinessProfile extends Component {
  constructor(props) {
    const uuidv4 = require("uuid/v4");
    super(props);

    this.state = {
      image: "",
      info: [],
      mySub: "",
      about: "n/a",
      worthKnowing: "n/a",
      addNotes: "n/a",
      instagram: "n/a",
      twitter: "n/a",
      tumblr: "n/a",
      facebook: "n/a",
      redirect: false,
      fileNotSelected: true,
      imageKey: uuidv4() + "-avatar"
    };

    Auth.currentAuthenticatedUser().then(user => {
      this.setState({mySub: user.attributes.sub})
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.fileNotSelected) {
      alert("File Not Chosen");
    }
    else if (this.state.about === "") {
      alert("About field cannot be left blank.");
    }
    else if (this.state.worthKnowing === "") {
      alert("Worth Knowing field cannot be left blank.");
    } 
    else if (this.state.addNotes === "") {
      alert("Additional Notes field cannot be left blank.");
    } 
    else if (this.state.instagram === "") {
      alert("Instagram field cannot be left blank.");
    }
    else if (this.state.twitter === "") {
      alert("Twitter field cannot be left blank.");
    } 
    else if (this.state.tumblr === "") {
      alert("Tumblr field cannot be left blank.");
    } 
    else if (this.state.facebook === "") {
      alert("Facebook field cannot be left blank.");
    } 
    else {
      const uploadFile = {
        role: "business",
        userID: this.state.mySub,
        about: this.state.about,
        worthKnowing: this.state.worthKnowing,
        additionalNotes: this.state.addNotes,
        instagram: this.state.instagram,
        twitter: this.state.twitter,
        tumblr: this.state.tumblr,
        facebook: this.state.facebook,
        url: "https://s3.amazonaws.com/myapp-20181030214040-deployment/public/" + this.state.imageKey
      };

      Storage.put(this.state.imageKey, this.state.image, {
        contentType: 'image',
        bucket:'myapp-20181030214040-deployment'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));

      fetch(
        "https://h0cf9xpvb2.execute-api.us-east-1.amazonaws.com/prod/update-profile",
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

      this.setState({redirect: true});
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

  handleChangeImg = event => {
    if (event.target.files[0]) {
        this.setState({fileNotSelected: false});
    }
    this.setState({image: event.target.files[0]});
};

  /*
  //Render displays all info for the update information page
  //Render also displays a business card, which is found in BusinessCardMedia.js
  */
  render() {
    return (     
      <div className="ArtInfo">
        {this.Redirectrender()}
        <form onSubmit={this.handleSubmit}>
        <h3>Please upload an <strong>Avatar</strong>.</h3>
        <Button variant="contained" color="secondary">
          <input
            type="file"
            onChange={this.handleChangeImg}
            accept="image/*"
          />
          Upload an Avatar
        </Button>
        <h3>The <strong>About</strong> section is a summary of what your page is, and what makes you a unique content creator.</h3>
          <FormGroup bsSize="large">
            <ControlLabel>About*</ControlLabel>
            <FormControl
              autofocus
              type="text"
              name="about"
              value={this.state.about}
              onChange={this.handleChange}
            />
          </FormGroup>
          <h3>The <strong>Worth Knowing</strong> section is everything that makes you great. What can you offer these artists?</h3>
          <FormGroup bsSize="large">
            <InputLabel>Worth Knowing*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="worthKnowing"
              value={this.state.worthKnowing}
              onChange={this.handleChange}
            />
          </FormGroup>
          <h3>The <strong>Additional Notes</strong> section is optional, but feel free to include anything you want the artists to know that you didn't already include.</h3>
          <FormGroup bsSize="large">
            <InputLabel>Additional Notes*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="addNotes"
              value={this.state.addNotes}
              onChange={this.handleChange}
            />
          </FormGroup>
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
          <LinkContainer to="/BusinessDashboard">
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

export default connect (mapStateToProps, mapDispatchToProps)(EditBusinessProfile);

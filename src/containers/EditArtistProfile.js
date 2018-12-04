import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { FormGroup, FormControl } from "react-bootstrap";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { addArtAction } from "../actions/addArtAction";
import { Redirect } from "react-router";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";

class EditArtistProfile extends Component {
  constructor(props) {
    const uuidv4 = require("uuid/v4");
    super(props);
    this.state = {
      info: null,
      mySub: "",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      tumblr: "https://tumblr.com/",
      facebook: "https://facebook.com/",
      redirect: false
    };
  }

  async componentDidMount() {
    await Auth.currentAuthenticatedUser().then(user => {
      this.setState({ mySub: user.attributes.sub });
    });
    try {
      await Axios.get(
        "https://65aztpj6k6.execute-api.us-east-1.amazonaws.com/prod/?role=artist&key=" +
          this.state.mySub
      )
        .then(result => this.setState({ info: result.data.Items }))
        .catch(err => console.log(err));
      this.setState({ instagram: this.state.info[0].instagram });
      this.setState({ twitter: this.state.info[0].twitter });
      this.setState({ tumblr: this.state.info[0].tumblr });
      this.setState({ facebook: this.state.info[0].facebook });
    } catch (e) {
      alert(e);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.instagram === "") {
      alert("Instagram field cannot be left blank.");
    } else if (this.state.twitter === "") {
      alert("Twitter field cannot be left blank.");
    } else if (this.state.tumblr === "") {
      alert("Tumblr field cannot be left blank.");
    } else if (this.state.facebook === "") {
      alert("Facebook field cannot be left blank.");
    } else {
      const uploadFile = {
        role: "artist",
        userID: this.state.mySub,
        instagram: this.state.instagram,
        twitter: this.state.twitter,
        tumblr: this.state.tumblr,
        facebook: this.state.facebook
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

      this.setState({ redirect: true });
    }
  };

  //Handles redirect when page is submitted
  Redirectrender = () => {
    if (this.state.redirect) {
      return <Redirect to="/Dashboard" />;
    }
  };
  //Function for handling change within render function, by setting states in constructor
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  /*
  //Render displays all info for the update information page
  //The first if() prevents accessing the info[] if it is null
  //This way it will display artist info from the database only when we've 
  //sucessfully pulled it.
  */
  render() {
    {
      if (this.state.info == null) {
        return (
          <div>
            <h1>loading</h1>
          </div>
        );
      } else {
        return (
          <div className="ArtInfo">
            {this.Redirectrender()}
            <h1>Update Artist Profile Information:</h1>
            <form onSubmit={this.handleSubmit}>
              <h2>Contact Handles: </h2>
              <TextField
                required
                id="standard-required"
                label="Instagram Handle"
                fullWidth
                className="instagram"
                onChange={this.handleChange("instagram")}
                value={this.state.instagram}
              />
              <TextField
                required
                id="standard-required"
                label="Twitter Handle"
                fullWidth
                className="twitter"
                onChange={this.handleChange("twitter")}
                value={this.state.twitter}
              />
              <TextField
                required
                id="standard-required"
                label="Tumblr"
                fullWidth
                className="tumblr"
                onChange={this.handleChange("tumblr")}
                value={this.state.tumblr}
              />
              <TextField
                required
                id="standard-required"
                label="FaceBook"
                fullWidth
                className="facebook"
                onChange={this.handleChange("facebook")}
                value={this.state.facebook}
              />
              <LinkContainer to="/Dashboard">
                <Button>Cancel</Button>
              </LinkContainer>
              <Button type="submit">Update Profile Information</Button>
            </form>
          </div>
        );
      }
    }
  }
}
const mapStateToProps = state => ({
  image: state.imageReducer.image
});

const mapDispatchToProps = {
  addArt: addArtAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArtistProfile);

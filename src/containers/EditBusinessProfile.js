import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { Auth, Storage } from "aws-amplify";
import { addArtAction } from "../actions/addArtAction";
import { Redirect } from "react-router";
import Axios from "axios";
import BusinessCardMedia from "./BusinessCardMedia";
import TextField from "@material-ui/core/TextField";

/*
//Class is the page where a business user can edit profile information
//Class gets information from database to fill user entry fields
*/
class EditBusinessProfile extends Component {
  constructor(props) {
    const uuidv4 = require("uuid/v4");
    super(props);

    this.state = {
      image: "",
      businessName: "",
      creationDate: "",
      avatar: "",
      info: null,
      mySub: "",
      about: "n/a",
      worthKnowing: "n/a",
      addNotes: "n/a",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      tumblr: "https://tumblr.com/",
      facebook: "https://facebook.com/",
      redirect: false,
      fileNotSelected: true,
      imageKey: uuidv4() + "-avatar"
    };
  }

  /*
  //Function collects user Sub and puts it into state using Auth.curr....
  //Axios gets individual business information by appending key from user Sub to URL
  //Function sets states of class to information from database
  //this way the user can see previously entered information when they try and update profile
  */
  async componentDidMount() {
    await Auth.currentAuthenticatedUser().then(user => {
      this.setState({ mySub: user.attributes.sub });
    });
    try {
      await Axios.get(
        "https://65aztpj6k6.execute-api.us-east-1.amazonaws.com/prod/?role=business&key=" +
          this.state.mySub
      )
        .then(result => this.setState({ info: result.data.Items }))
        .catch(err => console.log(err));
      this.setState({ about: this.state.info[0].about });
      this.setState({ worthKnowing: this.state.info[0].worthKnowing });
      this.setState({ addNotes: this.state.info[0].additionalNotes });
      this.setState({ instagram: this.state.info[0].instagram });
      this.setState({ twitter: this.state.info[0].twitter });
      this.setState({ tumblr: this.state.info[0].tumblr });
      this.setState({ facebook: this.state.info[0].facebook });
      this.setState({ businessName: this.state.info[0].businessName });
      this.setState({ creationDate: this.state.info[0].creationDate });
      this.setState({ avatar: this.state.info[0].avatar });
      if (this.state.info[0].avatar !== "") {
        this.setState({ fileNotSelected: false });
      }
    } catch (e) {
      alert(e);
    }
  }

  /*
  //Function handles when user submits form from the render method
  //Checks that fields cannot be left blank if user tries to submit info
  //Function POSTs to database
  */
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.fileNotSelected) {
      alert("File Not Chosen");
    } else if (this.state.about === "") {
      alert("About field cannot be left blank.");
    } else if (this.state.worthKnowing === "") {
      alert("Worth Knowing field cannot be left blank.");
    } else if (this.state.addNotes === "") {
      alert("Additional Notes field cannot be left blank.");
    } else if (this.state.instagram === "") {
      alert("Instagram field cannot be left blank.");
    } else if (this.state.twitter === "") {
      alert("Twitter field cannot be left blank.");
    } else if (this.state.tumblr === "") {
      alert("Tumblr field cannot be left blank.");
    } else if (this.state.facebook === "") {
      alert("Facebook field cannot be left blank.");
    } else {
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
        url:
          "https://s3.amazonaws.com/myapp-20181030214040-deployment/public/" +
          this.state.imageKey
      };

      if (this.state.image === "") {
        uploadFile.url = this.state.avatar;
      } else {
        await Storage.put(this.state.imageKey, this.state.image, {
          contentType: "image",
          bucket: "myapp-20181030214040-deployment"
        })
          .then(result => console.log(result))
          .catch(err => console.log(err));
      }

      await fetch(
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

      
      this.setState({ redirect: true });
    }
  };

  //Handles redirect when page is submitted
  Redirectrender = () => {
    if (this.state.redirect) {
      return <Redirect to="/BusinessSubmissions" />;
    }
  };

  //Function for handling change within render function, by setting states in constructor
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  //Function for handling changes when a user selects an image
  handleChangeImg = event => {
    if (event.target.files[0]) {
      this.setState({fileNotSelected: false});
    }
    this.setState({image: event.target.files[0]});
  };

  /*
  //Render displays all info for the update information page
  //Render also displays a business card, which is found in BusinessCardMedia.js
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
          <div align = "center" className = "ArtInfo">
            {this.Redirectrender()}
            <BusinessCardMedia
              title = {this.state.businessName}                   //Account name
              img = {this.state.avatar}                           //Avatar image
              subheader = {"Joined: " + this.state.creationDate}  //Join date field
              about = {this.state.about}                          //About section
              worthKnowing = {this.state.worthKnowing}            //Worth Knowing Section
              addNotes = {this.state.addNotes}                    //Additional Notes section
              id = {this.state.mySub}
              disabled = {true}                                   //Disabled so + button dissapears (So user cant route to a page they shouldnt go to)
            />
            <form onSubmit = {this.handleSubmit}>
              <h3>
                Please upload an <strong>Avatar</strong>.
              </h3>
              <Button variant = "contained" color = "secondary">
                <input
                  type = "file"
                  onChange = {this.handleChangeImg}
                  accept = "image/*"
                />
                Upload an Avatar
              </Button>
              <h3>
                The <strong>About</strong> section is a summary of what your
                page is, and what makes you a unique content creator.
              </h3>
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "About"
                fullWidth
                multiline
                rowsMax = {10}
                className = "about"
                onChange = {this.handleChange("about")}
                value = {this.state.about}
              />
              <h3>
                The <strong>Worth Knowing</strong> section is everything that
                makes you great. What can you offer these artists?
              </h3>
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "Worth Knowing"
                fullWidth
                multiline
                rowsMax = {10}
                className = "worthKnowing"
                onChange = {this.handleChange("worthKnowing")}
                value = {this.state.worthKnowing}
              />
              <h3>
                The <strong>Additional Notes</strong> section is optional, but
                feel free to include anything you want the artists to know that
                you didn't already include.
              </h3>
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "Additional Notes"
                fullWidth
                multiline
                rowsMax = {10}
                className = "addNotes"
                onChange = {this.handleChange("addNotes")}
                value = {this.state.addNotes}
              />
              <h2>Contact Handles: </h2>
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "Instagram Handle"
                fullWidth
                className = "instagram"
                onChange = {this.handleChange("instagram")}
                value = {this.state.instagram}
              />
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "Twitter Handle"
                fullWidth
                className = "twitter"
                onChange = {this.handleChange("twitter")}
                value = {this.state.twitter}
              />
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "Tumblr"
                fullWidth
                className = "tumblr"
                onChange = {this.handleChange("tumblr")}
                value = {this.state.tumblr}
              />
              <TextField
                InputLabelProps = {{shrink: true}}
                required
                id = "standard-required"
                label = "FaceBook"
                fullWidth
                className = "facebook"
                onChange = {this.handleChange("facebook")}
                value = {this.state.facebook}
              />
              <LinkContainer to = "/BusinessSubmissions">
                <Button>Cancel</Button>
              </LinkContainer>
              <Button type = "submit">Update Profile Information</Button>
            </form>
          </div>
        );
      }
    }
  }
}

//Redux mapping for image
const mapStateToProps = state => ({
  image: state.imageReducer.image
});

//Redux function
const mapDispatchToProps = {
  addArt: addArtAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBusinessProfile);

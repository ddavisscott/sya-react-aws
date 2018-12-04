import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import BusinessCardMedia from "./BusinessCardMedia";
import { Redirect } from "react-router";
import Axios from "axios";

/*
//Class is the page where an artist confirms that they are sending art to a specific business
//Business Card displays business info
//Business is displayed on Business Card from BusinessCardMedia.js
//Business info is pulled from database
*/
class ConfirmReviewRequest extends Component {
  constructor(props) {
    const uuidv4 = require("uuid/v4");
    super(props);

    this.state = {
      reviewID: uuidv4(),
      redirect: false,
      artistCredit: 0
    };

    Axios.get(
      "https://65aztpj6k6.execute-api.us-east-1.amazonaws.com/prod/?role=artist&key=" +
        this.props.artistID   //Gets Artist ID (userSub)
    )
      .then(user => {
        this.setState({
          artistCredit:
            user.data.Items[0].credits + user.data.Items[0].freeCredits
        });
      })
      .catch(e => {
        console.log(e.message);
      });
  }

  /*
  //Function handles when user submits to send art to business
  //POST info to Database
  */
  handleSubmit = async event => {
    event.preventDefault();
    if (this.props.url == null) {
      alert("File Not Chosen"); //If the page was reloaded and there is nothing to submit AKA file not displayed
    } else if (this.state.artistCredit <= 0) {
      alert(
        "You currently have (" +
          this.state.artistCredit +
          ") credits. You do not have enough credits to submit your art. Please purchase more credits."
      );
    } else {
      const uploadFile = {
        artTitle: this.props.artTitle,
        artistID: this.props.artistID,
        artistName: this.props.artistName,
        artistEmail: this.props.artistEmail,
        reviewID: this.state.reviewID,
        artDescription: this.props.artDescription,
        uploadDate: this.props.uploadDate,
        url: this.props.url,
        businessName: this.props.businessName,
        businessEmail: this.props.businessEmail,
        businessID: this.props.businessID,
        submittedWithFreeCredit: true,
        artistCredit: this.state.artistCredit
      };

      fetch(
        "https://u0j29s9dlb.execute-api.us-east-1.amazonaws.com/prod/submit-review-requests-v2",
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

      alert("Art submitted!");
      this.setState({ redirect: true });
    }
  };

  //Handles redirect of page by changing the (redirect: false) in the state being changed in handleSubmit
  Redirectrender = () => {
    if (this.state.redirect) {
      return <Redirect to="/Dashboard" />;
    }
  };

  /*
  //Render displays page to user
  //Business card is displayed here
  */
  render() {
    return (
      <div>
        {this.Redirectrender()}
        <h1>Ready to submit?</h1>
        <h2>
          Submitting to: <strong>{this.props.businessName}</strong>
        </h2>
        <BusinessCardMedia
          title = {this.props.businessName}                           //Account name
          img = {this.props.businessAvatar}                           //Avatar image
          subheader = {"Joined: " + this.props.businessCreationDate}  //Join date field
          about = {this.props.businessAbout}                          //About section
          worthKnowing = {this.props.businessWorthKnowing}            //Worth Knowing Section
          addNotes = {this.props.businessAdditionalNotes}             //Additional Notes section
          date = {this.props.date}
          sourceKey = {this.props.sourceKey}
          artistName = {this.props.artistName}
          artTitle = {this.props.artTitle}
          url = {this.props.url}
          descript = {this.props.descript}
          userSub = {this.props.userSub}
          disabled = {true}                                           //Disabled so + button dissapears
        />
        <h2>
          <strong>Title: </strong>
          {this.props.artTitle} | <strong>Description: </strong>
          {this.props.artDescription}
        </h2>
        <LinkContainer color = "secondary" to = "/BusinessChoice">
          <Button variant = "outlined" size = "large">
            Back
          </Button>
        </LinkContainer>
        <form onSubmit = {this.handleSubmit}>
          <Button color = "primary" type = "submit" variant = "outlined" size = "large">
            SUBMIT
          </Button>
        </form>
        <br />

        <img
          src = {this.props.url}
          alt = {this.props.artTitle}
          height = {"100%"}
          width = {"100%"}
        />
      </div>
    );
  }
}

//Redux fields
const mapStateToProps = state => ({
  //artist info:
  artistName: state.requestReviewReducer.artistName,
  artTitle: state.requestReviewReducer.artTitle,
  url: state.requestReviewReducer.url,
  artistID: state.requestReviewReducer.userSub,
  artistEmail: state.requestReviewReducer.artistEmail,
  artDescription: state.requestReviewReducer.descript,
  uploadDate: state.requestReviewReducer.date,
  //business info:
  businessName: state.requestReviewReducer.businessName,
  businessEmail: state.requestReviewReducer.businessEmail,
  businessID: state.requestReviewReducer.businessID,
  businessAbout: state.requestReviewReducer.businessEmail,
  businessWorthKnowing: state.requestReviewReducer.businessTheGood,
  businessAdditionalNotes: state.requestReviewReducer.businessAddNotes,
  businessCreationDate: state.requestReviewReducer.businessSubheader,
  businessAvatar: state.requestReviewReducer.businessIMG
});

export default connect(mapStateToProps)(ConfirmReviewRequest);

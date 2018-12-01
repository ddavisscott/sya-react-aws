import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import BusinessCardMedia from './BusinessCardMedia';
import { Redirect } from 'react-router';

class ConfirmReviewRequest extends Component {
    constructor(props) {
        const uuidv4 = require("uuid/v4");
        super(props);

        this.state = {
            reviewID: uuidv4(),
            redirect: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.props.url == null) { //If the page was reloaded and there is nothing to submit AKA file not displayed
          alert("File Not Chosen");
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
            submittedWithFreeCredit: true
          };
          
          fetch(
            "https://88eja4paq2.execute-api.us-east-1.amazonaws.com/prod/submit-request",
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

      Redirectrender = () => {
        if (this.state.redirect) {
          return <Redirect to ="/Dashboard" />
        }
      }

    render() {
        return (
            <div>
                {this.Redirectrender()}
                <h1>Ready to submit?</h1>
                <h2>Submitting to: <strong>{this.props.businessName}</strong></h2>
                <BusinessCardMedia
                        title={this.props.businessName}                           //Account name
                        img = {this.props.img}                                    //Avatar image
                        subheader = {"Joined: " + this.props.creationDate}        //Join date field
                        about = {this.props.businessEmail}                        //About section
                        theGood = {this.props.theGood}                            //The Good Section
                        addNotes = {this.props.addNotes}                          //Additional Notes section
                        date = {this.props.date}
                        sourceKey = {this.props.sourceKey}
                        artistName = {this.props.artistName}
                        artTitle = {this.props.artTitle}
                        url = {this.props.url}
                        descript = {this.props.descript}
                        userSub = {this.props.userSub}
                        disabled = {true}                                         //Disabled so + button dissapears
                      />
                <h2><strong>Title: </strong>{this.props.artTitle} | <strong>Description: </strong>{this.props.artDescription}</h2>
                <LinkContainer color = "secondary" to="/BusinessChoice">
                    <Button variant = "outlined" size = "large">Back</Button>
                </LinkContainer>
                <form onSubmit={this.handleSubmit}>
                    <Button color = "primary" type="submit" variant = "outlined" size = "large" >SUBMIT</Button>
                </form>
                <br></br>

                <img src={this.props.url} alt={this.props.artTitle}/>
                
            </div>
        );
    }
}
//Redux fields
const mapStateToProps = state => ({
    //artist info:
    artistName:     state.requestReviewReducer.artistName,
    artTitle:       state.requestReviewReducer.artTitle,
    url:            state.requestReviewReducer.url,
    artistID:       state.requestReviewReducer.userSub,
    artistEmail:    state.requestReviewReducer.artistEmail,
    artDescription: state.requestReviewReducer.descript,
    uploadDate:     state.requestReviewReducer.date,
    //business info:
    businessName:   state.requestReviewReducer.businessName,
    businessEmail:  state.requestReviewReducer.businessEmail,
    businessID:     state.requestReviewReducer.businessID,
})

export default connect(mapStateToProps)(ConfirmReviewRequest);
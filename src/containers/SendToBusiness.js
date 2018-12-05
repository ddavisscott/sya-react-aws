import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import BusinessCardMedia from "./BusinessCardMedia";
import { connect } from "react-redux";
import Axios from "axios";

/*
//Class is the page where an artist can choose business to send art to
//Business's are displayed on Business Cards from BusinessCardMedia.js
//Business info is pulled from database
*/
class SendToBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      info: []
    };
  }

  //Function gets business info and puts it into info[]
  //Objects are placed into info[] within class state
  async componentDidMount() {
    try {
      await Axios.get(
        "https://pr4ezxqjkh.execute-api.us-east-1.amazonaws.com/prod/"
      )
        .then(result => this.setState({ info: result.data.Items }))
        .catch(err => console.log(err));
    } catch (e) {
      alert(e);
    }
  }

  /*
  //Render displays all the business cards and data is mapped into card from info[]
  //Button in card routes to ConfirmReviewRequest.js
  //Pertinent business information is stored in redux methods at bottom of class
  */
  render() {
    return (
      <div>
        <div>
          <h1>Share Yourself Business's</h1>
          <h2>Choose a business to send your art to!</h2>
        </div>
        <div>
          <Grid
            container
            cellHeight = {160}
            justify = "space-evenly"
            spacing = {16}
            cols = {1}
          >
            {this.state.info.map(tileData => (
              <BusinessCardMedia
                title = {tileData.businessName}                   //Account name
                img = {tileData.avatar}                           //Avatar image
                subheader = {"Joined: " + tileData.creationDate}  //Join date field
                about = {tileData.about}                          //About section
                worthKnowing = {tileData.worthKnowing}            //Worth Knowing Section
                addNotes = {tileData.additionalNotes}             //Additional Notes section
                id = {tileData.userID}
                facebook = {tileData.facebook}
                tumblr = {tileData.tumblr}
                twitter = {tileData.twitter}
                instagram = {tileData.instagram}
                /*  REDUX MAPPING INFO                     
                    date = {this.props.date}
                    sourceKey = {this.props.sourceKey}
                    artistName = {this.props.artistName}
                    artTitle = {this.props.artTitle}
                    url = {this.props.url}
                    descript = {this.props.descript}
                    userSub = {this.props.userSub}
                */
              />
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

//Redux parameters
const mapStateToProps = state => ({
  date: state.requestReviewReducer.date,
  sourceKey: state.requestReviewReducer.sourceKey,
  artistName: state.requestReviewReducer.artistName,
  artTitle: state.requestReviewReducer.artTitle,
  url: state.requestReviewReducer.url,
  descript: state.requestReviewReducer.descript,
  userSub: state.requestReviewReducer.userSub
});

export default connect(mapStateToProps)(SendToBusiness);

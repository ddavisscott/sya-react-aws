import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import BusinessCardMedia from './BusinessCardMedia';
import { connect } from "react-redux";
import Axios from "axios";


class SendToBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      info: []
    };
  }

  //Function gets business info and puts it into info[]
  async componentDidMount() {
    try {
        await Axios.get(
            "https://pr4ezxqjkh.execute-api.us-east-1.amazonaws.com/prod/"
        )
            .then(result => this.setState({info: result.data.Items}))
            .catch(err => console.log(err));
    } catch (e) {
        alert(e);
    }
}

  render() {
    return (
        <div>
            <div>
                <h1>Share Yourself Business's</h1>
                <h2>Choose a business to send your art to!</h2>
            </div>
            <div>
                <Grid container cellHeight={160} justify="space-evenly" spacing={16} cols={1}>
                    {this.state.info.map(tileData => (
                        <BusinessCardMedia
                        title={tileData.businessName}                               //Account name
                        img = {tileData.avatar}                                     //Avatar image
                        subheader = {"Joined: " + tileData.creationDate}            //Join date field
                        about = {tileData.about}                                    //About section
                        worthKnowing = {tileData.worthKnowing}                      //Worth Knowing Section
                        addNotes = {tileData.additionalNotes}                       //Additional Notes section
                        id = {tileData.userID}
                        /*                       
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
const mapStateToProps = state => ({
    date:state.requestReviewReducer.date,
    sourceKey:state.requestReviewReducer.sourceKey,
    artistName:state.requestReviewReducer.artistName,
    artTitle:state.requestReviewReducer.artTitle,
    url:state.requestReviewReducer.url,
    descript:state.requestReviewReducer.descript,
    userSub:state.requestReviewReducer.userSub
})

export default connect(mapStateToProps)(SendToBusiness);
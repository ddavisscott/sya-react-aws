import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';
import BusinessCardMedia from './BusinessCardMedia';
import { withStyles } from '@material-ui/core/styles';

class ConfirmReviewRequest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <h1>Ready to submit?</h1>
                <h2>Submitting to: {this.props.businessName}</h2>
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
                <h2>Title: {this.props.artTitle} | Description: {this.props.descript}</h2>
                <h2></h2>
                <img 
                src={this.props.url} 
                alt={this.props.artTitle}
                
                />
                <LinkContainer color = "secondary" to="/BusinessChoice">
                    <Button variant = "outlined" size = "large">Back</Button>
                </LinkContainer>
                <LinkContainer color = "primary" to="/Dashboard">
                    <Button variant = "outlined" size = "large" >SUBMIT</Button>
                </LinkContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artistName: state.viewArtReducer.artistName,
    artTitle:   state.viewArtReducer.artTitle,
    url:        state.viewArtReducer.url,
    descript:   state.viewArtReducer.descript,
})

export default connect(mapStateToProps)(ConfirmReviewRequest);
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "./CardMedia";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";

import { connect } from 'react-redux';
import { dashBoardImages } from '../actions/dashBoardImageAction';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: [],
            mySub: ""
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                this.setState({ mySub: user.attributes.sub });
            });

            Axios.get(
                "https://70tcdlzobd.execute-api.us-east-1.amazonaws.com/prod/user-images?key=" +
                    this.state.mySub
            )
                .then(result => this.setState({ images: result.data.Items }))
                .catch(err => console.log(err));
            this.props.dashBoardImages(this.state.images);
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <div>
                <Grid container justify="space-evenly" spacing={16}>
                    { this.state.images.length !== 0?  
                        this.state.images.map(imageInfo => (
                        <Grid key={imageInfo.key} item>
                            <CardMedia
                                title={imageInfo.artTitle}
                                src={imageInfo.url}
                                descript={imageInfo.description}
                            />
                        </Grid>
                    )) : 
                        <div>
                            <h1>No images yet.</h1>
                            <h1>If you want to add an image press the button below!</h1>
                            <LinkContainer to="/UploadPage">
                                <Button>Upload Image</Button>
                            </LinkContainer>
                        </div>
                    } 
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    //images: state.dashBoardImages.images
})

export default connect(mapStateToProps, {dashBoardImages}) (Dashboard);

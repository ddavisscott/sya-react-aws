import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { selectImage } from "../actions/imageActions";

const styles = {
    card: {
        maxWidth: 500
    },
    media: {
        height: 300,
        width: 300
    }
};

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            imageArray: [],
            mySub: "",
            imageClicked: null,
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                this.setState({ mySub: user.attributes.sub });
            });

            await Axios.get(
                "https://70tcdlzobd.execute-api.us-east-1.amazonaws.com/prod/user-images?key=" +
                    this.state.mySub
            )
                .then(result =>
                    this.setState({ imageArray: result.data.Items })
                )
                .catch(err => console.log(err));
        } catch (e) {
            alert(e);
        }
    }

    handleViewClick = event => {
      this.props.selectImage(event.target.id);
    }
    

    render() {
        return (
            <div>
                <Grid container justify="space-evenly" spacing={16}>
                    {this.state.imageArray.length !== 0 ? (
                        this.state.imageArray.map(imageInfo => (
                            <Grid key={imageInfo.sourceKey} item>
                                <Card className="Cards">
                                    <CardActionArea>
                                        <CardMedia
                                            image={imageInfo.url}
                                            style={styles.media}
                                        />
                                        <CardContent>
                                            {imageInfo.artTitle}
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions align="center">
                                        <LinkContainer to="/ViewArt">
                                            <Button
                                                size="small"
                                                color="primary"
                                                id={JSON.stringify(imageInfo)}
                                                onClick={this.handleViewClick}
                                            >
                                                VIEW
                                            </Button>
                                        </LinkContainer>
                                        <LinkContainer to="/SubmitArt">
                                            <Button
                                                size="small"
                                                color="primary"
                                            >
                                                SUBMIT THIS PIECE
                                            </Button>
                                        </LinkContainer>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <div>
                            <h1>No images yet.</h1>
                            <h1>
                                If you want to add an image press the button
                                below!
                            </h1>
                            <LinkContainer to="/UploadPage">
                                <Button>Upload Image</Button>
                            </LinkContainer>
                        </div>
                    )}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  image: state.imageReducer.image
});

export default connect(mapStateToProps, {selectImage} )(Dashboard);

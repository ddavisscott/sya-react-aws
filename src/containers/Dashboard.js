import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "./CardMedia";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { connect } from 'react-redux';
import { getArtAction } from "../actions/getArtAction";
class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
                .then(result => this.props.getArt (result.data.Items ))
                .catch(err => console.log(err));
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            console.log(this.props.images[1]),
            <div>
                <Grid container justify="space-evenly" spacing={16}>
                    {this.props.images.map(imageInfo => (

                        <Grid key={imageInfo.key} item>
                            <CardMedia
                                date={imageInfo.date}
                                sourceKey={imageInfo.sourceKey}
                                artistName={imageInfo.artistName}
                                artTitle={imageInfo.artTitle}
                                url={imageInfo.url}
                                descript={imageInfo.description}
                                userSub={imageInfo.userSub}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    images: state.dashBoardReducer.images
})

const mapDispatchToProps = {
    getArt: getArtAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

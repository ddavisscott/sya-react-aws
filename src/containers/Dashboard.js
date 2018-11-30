import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "./CardMedia";
import { Auth } from "aws-amplify";
import Axios from "axios";


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
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <div>
                <Grid container justify="space-evenly" spacing={16}>
                    {this.state.images.map(imageInfo => (
                        <Grid key={imageInfo.key} item>
                            <CardMedia
                                title={imageInfo.artTitle}
                                src={imageInfo.url}
                                descript={imageInfo.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default Dashboard;

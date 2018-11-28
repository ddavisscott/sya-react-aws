import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "./CardMedia";
import { Storage } from "aws-amplify";

import { Auth } from "aws-amplify";
import Axios from "axios";
class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            keys: [],
            mySub: ""
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                this.setState({ mySub: user.attributes.sub }
                );
            });
            
            Axios.get( "https://70tcdlzobd.execute-api.us-east-1.amazonaws.com/prod/user-images?key=" + this.state.mySub) 
            .then(result => this.setState({ keys: result.data.Items }))
            .catch(err => console.log(err));

        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="flex-start" spacing={Number(16)}>
                        {this.state.keys.map(value => (
                            <Grid key={value.key} item>
                                <CardMedia 
                                    title={value.artTitle}
                                    src={value.url}
                                 />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Dashboard;

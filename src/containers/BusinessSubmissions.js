import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardMedia from "./CardMedia";
import { Auth } from "aws-amplify";
import Axios from "axios";


class BusinessSubmissions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submissionArray: [
                {name: "chris", replied: true, },
                {name: "brandon", replied: false, },
                {name: "gavin", replied: true, },
                {name: "gevin", replied: false, },

            ],
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser();

//            Axios.get(
 //               "https://70tcdlzobd.execute-api.us-east-1.amazonaws.com/prod/user-images?key=" +
  //                  this.state.mySub
   //         )
    //        .then(result => this.setState({ images: result.data.Items }))
      //      .catch(err => console.log(err));
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <div>
                
                <div>
                    <h1> Submissions</h1>
                    <Button id="all">All Submissions</Button>
                    <Button id="unreplied">Unreplied Submissions</Button>
                    <Button id="replied">Replied Submissions</Button>
                    </div>
                <hr/>
                <Grid container justify="space-evenly" spacing={16}>
                    { this.state.submissionArray.map(subs => (
                        <div>
                        <li>{subs.name}</li>
                        </div>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default BusinessSubmissions;
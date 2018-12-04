import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BusinessSubmissionCards from "./BusinessSubmissionCards";
import { Auth } from "aws-amplify";
import Axios from "axios";

class BusinessSubmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submissionArray: [],
            choice: "all"
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                this.setState({ mySub: user.attributes.sub });
            });

            await Axios.get(
                "https://kdmro1ide5.execute-api.us-east-1.amazonaws.com/prod/?key=" +
                    this.state.mySub
            )
                .then(result =>
                    this.setState({ submissionArray: result.data.Items })
                )
                .catch(err => console.log(err));
        } catch (e) {
            alert(e);
        }
    }

    handleAll = event => {
        if (this.state.choice !== "all") {
            this.setState({ choice: "all" });
        }
    };

    handleUnreplied = event => {
        if (this.state.choice !== "unreplied") {
            this.setState({ choice: "unreplied" });
        }
    };

    handleReplied = event => {
        if (this.state.choice !== "replied") {
            this.setState({ choice: "replied" });
        }
    };

    render() {
        return (
            <div>
                <div>
                    <h1> Submissions</h1>
                    <Button id="all" onClick={this.handleAll}>
                        All
                    </Button>
                    <Button id="unreplied" onClick={this.handleUnreplied}>
                        Unreplied Submissions
                    </Button>
                    <Button id="replied" onClick={this.handleReplied}>
                        Replied Submissions
                    </Button>
                </div>
                <hr />
                <Grid container justify="space-evenly" spacing={16}>
                    {this.state.submissionArray.map(subs => {
                        if (this.state.choice === "replied" && subs.replied) {
                            return (
                                <BusinessSubmissionCards
                                    date={subs.artwork.uploadDate}
                                    artistName={subs.artwork.artistName}
                                    artTitle={subs.artwork.artTitle}
                                    artistID={subs.artwork.artistID}
                                    url={subs.artwork.url}
                                    descript={subs.artwork.description}
                                    reply={subs.reply}
                                    businessID={subs.businessID}
                                    reviewID={subs.reviewID}
                                    replied={subs.replied}
                                />
                            );
                        } else if (
                            this.state.choice === "unreplied" &&
                            !subs.replied
                        ) {
                            return (
                                <BusinessSubmissionCards
                                    date={subs.artwork.uploadDate}
                                    artistName={subs.artwork.artistName}
                                    artTitle={subs.artwork.artTitle}
                                    artistID={subs.artwork.artistID}
                                    url={subs.artwork.url}
                                    descript={subs.artwork.description}
                                    reply={subs.reply}
                                    businessID={subs.businessID}
                                    reviewID={subs.reviewID}
                                    replied={subs.replied}
                                />
                            );
                        } else if (this.state.choice === "all") {
                            return (
                                <BusinessSubmissionCards
                                    date={subs.artwork.uploadDate}
                                    artistName={subs.artwork.artistName}
                                    artTitle={subs.artwork.artTitle}
                                    artistID={subs.artwork.artistID}
                                    url={subs.artwork.url}
                                    descript={subs.artwork.description}
                                    reply={subs.reply}
                                    businessID={subs.businessID}
                                    reviewID={subs.reviewID}
                                    replied={subs.replied}
                                />
                            );
                        }
                    })}
                </Grid>
            </div>
        );
    }
}

export default BusinessSubmissions;

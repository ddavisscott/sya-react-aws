import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArtistReviewCards from "./ArtistReviewCards";
import { Auth } from "aws-amplify";
import Axios from "axios";


class ArtistReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reviewsArray: [],
            choice: "all",
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                this.setState({ mySub: user.attributes.sub });
            });

            await Axios.get(
                "https://yivymvre9b.execute-api.us-east-1.amazonaws.com/prod/?key="+ this.state.mySub
            )
            .then(result => this.setState({reviewsArray: result.data.Items}))
            .catch(err => console.log(err));

        } catch (e) {
            alert(e);
        }
    }
    
    handleAll = event => {
        if (this.state.choice !== "all") {
            this.setState({choice: "all"})
        }
    };

    handleUnreplied = event => {
        if (this.state.choice !== "unreplied") {
            this.setState({choice: "unreplied"})
        }
    };

    handleReplied = event => {
        if (this.state.choice !== "replied") {
            this.setState({choice: "replied"})
        }
    };



    render() {
        return (
            <div>
                <div>
                    <h1>Art Reviews</h1>
                    <Button id="all" onClick={this.handleAll}>All Reviews</Button>
                    <Button id="unreplied" onClick={this.handleUnreplied}>Unreplied Art</Button>
                    <Button id="replied" onClick={this.handleReplied}>Reviewed Art</Button>
                    </div>
                <hr/>
                <Grid container justify="space-evenly" spacing={16}>
                    { this.state.reviewsArray.map(subs => {
                        if (this.state.choice === "replied" && subs.replied) {
                            return ( <ArtistReviewCards
                                date={subs.artwork.uploadDate}
                                artistName={subs.artwork.artistName}
                                artTitle={subs.artwork.artTitle}
                                url={subs.artwork.url}
                                descript={subs.artwork.description}
                                reply={subs.reply}
                                businessID={subs.businessID}
                                reviewID={subs.reviewID}
                                replied={subs.replied}
                            />) 
                        }                         
                        else if (this.state.choice === "unreplied" && !subs.replied) {
                            return ( <ArtistReviewCards
                                date={subs.artwork.uploadDate}
                                artistName={subs.artwork.artistName}
                                artTitle={subs.artwork.artTitle}
                                url={subs.artwork.url}
                                descript={subs.artwork.description}
                                reply={subs.reply}
                                businessID={subs.businessID}
                                reviewID={subs.reviewID}
                                replied={subs.replied}
                            />) 
                        } 
                        else if (this.state.choice === "all") {
                            return ( <ArtistReviewCards
                                date={subs.artwork.uploadDate}
                                artistName={subs.artwork.artistName}
                                artTitle={subs.artwork.artTitle}
                                url={subs.artwork.url}
                                descript={subs.artwork.description}
                                reply={subs.reply}
                                businessID={subs.businessID}
                                reviewID={subs.reviewID}
                                replied={subs.replied}
                            />) 
                        }
                    })}
                </Grid>
            </div>
        );
    }
}

export default ArtistReviews;

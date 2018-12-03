import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

class ReplySubmission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reply: "",
            willSubmit: true
        };
    }

    validateString = () => {
        return this.state.reply.length >= 50;
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleWillSubmit = () => {
        this.setState({
            willSubmit: this.state.willSubmit ? false : true
        });
    };

    handleSubmit = () => {
        if (this.validateString()) {

            const review = {
                businessID: this.props.businessID,
                reviewID:   this.props.reviewID,
                reply:      this.state.reply,
                radios:     this.state.willSubmit ? "accepted" : "declined",
                repliedDate:new Date(),
                replied:    this.state.willSubmit ? "true" : "false",
            };

            fetch(
                "https://j739rb6mb6.execute-api.us-east-1.amazonaws.com/prod/submit-review-response",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    mode: "no-cors",
                    body: JSON.stringify(review)
                }
            )
            .then(result => console.log(result))
            .catch(err => console.log(err));

            alert("Review Sent!");
        } else {
        }
    };

    render() {
        return (
            <div className="Home">
                <h1>Submit your reponse</h1>
                <img style={{ maxWidth: '700', margin: '0 auto', resize: 'both' }} fullWidth src={this.props.url} alt={this.props.artTitle} maxWidth={500} maxHeight={500}/>
                <div align="left">
                    <h2>Art title: {this.props.artTitle}</h2>
                    <h2>Artist name: {this.props.artistName}</h2>
                    <h2>Submitted on: {this.props.date}</h2>
                    <h2>Description: {this.props.descript}</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        id="standard-required"
                        label="Your Reponse"
                        multiline={true}
                        fullWidth
                        className={"reply"}
                        margin="normal"
                        rows={2}
                        rowsMax={4}
                        value={this.state.reply}
                        onChange={this.handleChange("reply")}
                    />
                    <text>Minimum 50 Characters.</text>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="radio"
                                    name="willSubmit"
                                    value={this.state.willSubmit}
                                    checked={this.state.willSubmit}
                                    onChange={this.handleWillSubmit}
                                />
                                Will submit art piece
                            </td>
                            <text>    </text>
                            <br />
                            <td>
                                <input
                                    type="radio"
                                    name="willNotSumbit"
                                    value={!this.state.willSubmit}
                                    checked={!this.state.willSubmit}
                                    onChange={this.handleWillSubmit}
                                />
                                Will not submit art piece
                            </td>
                        </tr>
                    </tbody>
                </form>
                <LinkContainer to="/BusinessSubmissions">
                    <Button>Back</Button>
                </LinkContainer>
                <LinkContainer to="/Home">
                    <Button
                        disabled={!this.validateString()}
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </LinkContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artistName: state.replySubmissionReducer.artistName,
    artTitle: state.replySubmissionReducer.artTitle,
    url: state.replySubmissionReducer.url,
    descript: state.replySubmissionReducer.descript,
    date: state.replySubmissionReducer.date,
    businessID: state.replySubmissionReducer.businessID,
    reviewID: state.replySubmissionReducer.reviewID,
    reply:    state.replySubmissionReducer.reply,
    reviewd: state.replySubmissionReducer.reviwed,
});

export default connect(mapStateToProps)(ReplySubmission);

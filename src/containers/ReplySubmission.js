import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

/*
//Displays page for business to accept or reject art and reply to artist
*/
class ReplySubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reply: "",
      willSubmit: true
    };
  }

  //Checks for string being correct length
  validateString = () => {
    return this.state.reply.length >= 50;
  };

  //Sets states on button press
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  //Handles submission
  handleWillSubmit = () => {
    this.setState({
      willSubmit: this.state.willSubmit ? false : true
    });
  };

  //Handles form submissions
  //Posts to database
  handleSubmit = () => {
    if (this.validateString()) {
      const review = {
        businessID: this.props.businessID,
        reviewID: this.props.reviewID,
        reply: this.state.reply,
        radios: this.state.willSubmit ? "accepted" : "declined",
        repliedDate: new Date(),
        replied: this.state.willSubmit ? "true" : "false"
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

  //Renders page information and displays images
  render() {
    return (
      <div className="Home">
        <h1>Submit your reponse</h1>
        <img
          fullWidth
          src={this.props.url}
          alt={this.props.artTitle}
          width={"100%"}
          height={"100%"}
        />
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
          <body>Minimum 50 Characters.</body>
          <div>
            <input
              type="radio"
              name="willSubmit"
              value={this.state.willSubmit}
              checked={this.state.willSubmit}
              onChange={this.handleWillSubmit}
            />
            Will submit art piece
          </div>
          <div>
            <input
              type="radio"
              name="willNotSumbit"
              value={!this.state.willSubmit}
              checked={!this.state.willSubmit}
              onChange={this.handleWillSubmit}
            />
            Will not submit art piece
          </div>
        </form>
        <LinkContainer to="/BusinessSubmissions">
          <Button>Back</Button>
        </LinkContainer>
        <LinkContainer to="/Home">
          <Button disabled={!this.validateString()} onClick={this.handleSubmit}>
            Submit
          </Button>
        </LinkContainer>
      </div>
    );
  }
}

//Redux function
const mapStateToProps = state => ({
  artistName: state.replySubmissionReducer.artistName,
  artTitle: state.replySubmissionReducer.artTitle,
  url: state.replySubmissionReducer.url,
  descript: state.replySubmissionReducer.descript,
  date: state.replySubmissionReducer.date,
  businessID: state.replySubmissionReducer.businessID,
  reviewID: state.replySubmissionReducer.reviewID,
  reply: state.replySubmissionReducer.reply,
  reviewd: state.replySubmissionReducer.reviwed
});

export default connect(mapStateToProps)(ReplySubmission);

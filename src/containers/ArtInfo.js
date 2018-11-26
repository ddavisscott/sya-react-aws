import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";

export default class ArtInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist_name: "",
      art_title: "",
      descript: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      artist_name: "",
      art_title: "",
      descript: ""
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="ArtInfo">
        <title>Art Info</title>
        <form onSubmit={this.handleSubmit}>
          <FormGroup bsSize="large">
            <ControlLabel>Artist Name*</ControlLabel>
            <FormControl
              autofocus
              type="text"
              value={this.state.artist_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <InputLabel>Art Title*</InputLabel>
            <FormControl
              autofocus
              type="text"
              value={this.state.art_title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <InputLabel>Description*</InputLabel>
            <FormControl
              autofocus
              type="text"
              value={this.state.descript}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LinkContainer to="/UploadPage">
            <Button>Back</Button>
          </LinkContainer>
          <Button type="submit">Upload</Button>
        </form>
      </div>
    );
  }
}

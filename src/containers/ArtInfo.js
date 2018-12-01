import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { Auth, Storage } from "aws-amplify";
import { Redirect } from 'react-router-dom';
import { addArtAction } from "../actions/addArtAction"

class ArtInfo extends Component {
  constructor(props) {
    const uuidv4 = require("uuid/v4");
    super(props);
    this.state = {
      artist_name: "",
      art_title: "",
      descript: "",
      image_key: uuidv4(),
      user_name: "",
      sub: "", 
      token: "",
      redirect: false
    };

    Auth.currentAuthenticatedUser().then(user => {
      this.setState({ user_name: user.username });
      this.setState({ sub: user.attributes.sub });
      this.setState({ token: user.signInUserSession.idToken.jwtToken });
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.props.image == null) {
      alert("File Not Chosen");
    } else {
      const uploadFile = {
        art_title: this.state.art_title,
        sub: this.state.sub,
        artist_name: this.state.user_name,
        descript: this.state.descript,
        upload_date: new Date(),
        image_key: this.state.image_key
      };

      fetch(
        "https://ckz78jlmb1.execute-api.us-east-1.amazonaws.com/prod/upload-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          mode: "no-cors",
          body: JSON.stringify(uploadFile)
        }
      )
      .then(result => console.log(result))
      .catch(err => console.log(err));

      Storage.put(this.state.image_key, this.props.image, {
          contentType: 'image',
          bucket:'myapp-20181030214040-deployment'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
      this.setState({redirect: true});
      const image = {
        artTitle: this.state.art_title,
        userSub: this.state.sub,
        artistName: this.state.user_name,
        descript: this.state.descript,
        date: uploadFile.upload_date,
        url: this.state.image_key
      };
      this.props.addArt(image);
    }    
  };

  Redirectrender = () => {
    if (this.state.redirect) {
      return <Redirect to ="/Dashboard" />
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (     
      <div className="ArtInfo">
        {this.Redirectrender()}
        <title>Art Info</title>
        <form onSubmit={this.handleSubmit}>
          <FormGroup bsSize="large">
            <ControlLabel>Artist Name*</ControlLabel>
            <FormControl
              autofocus
              type="text"
              name="artist_name"
              value={this.state.artist_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <InputLabel>Art Title*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="art_title"
              value={this.state.art_title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <InputLabel>Description*</InputLabel>
            <FormControl
              autofocus
              type="text"
              name="descript"
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
const mapStateToProps = state => ({
  image:state.imageReducer.image
})

const mapDispatchToProps =  {
  addArt: addArtAction
}

export default connect (mapStateToProps, mapDispatchToProps)(ArtInfo);

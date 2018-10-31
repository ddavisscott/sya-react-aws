import React, { Component } from 'react';
import './App.css';
import Title from './title'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Analytics } from 'aws-amplify'
Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err));


class App extends Component {
  //Auth.currentAuthenticatedUser()
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      inputValue:'this is input value'
    };
  }
signOut = () => {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
recordEvent = () => {
  console.log('recording...')
  Analytics.record({
    name: 'Test event 1',
    attributes: {
      username: 'dabit3'
    }
  })
}
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    let typedValue = this.state.value
    return (  
      <div className="App">
      <Title greeting={typedValue} />
      <form>
      <FormGroup
        controlId="formBasicText"
        validationState={this.getValidationState()}
      >
        <ControlLabel>Working example with validation</ControlLabel>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Enter text"
          onChange={this.handleChange}
        />
        <button onClick = {this.signOut}>Sign Out</button>
        <FormControl.Feedback />
        <HelpBlock>Validation is based on string length.</HelpBlock>
      </FormGroup>
    </form>
    
    </div>
    );
  }
}

export default withAuthenticator(App);

import React, { Component } from 'react';
import './App.css';

class Title extends Component {
  constructor(props){
    super(props)
    this.state= {
        test:"this form form"
    }

  }
  render() {
    return (
      <div className="App">
        {this.props.greeting}
      </div>
    );
  }
}

export default Title;

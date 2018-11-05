import React, { Component } from 'react';
import './App.css';
import Title from './title'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Analytics } from 'aws-amplify'
import { Storage } from 'aws-amplify';

Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err));

class App extends Component {
    constructor(props){
        super(props);

    }

      signOut = () => {
        Auth.signOut()
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
      onChange(e) {
          const file = e.target.files[0];
          Storage.put('example2.png', file, {
              contentType: 'image/png',  //,
              bucket: 'myapp-20181030214040-deployment'
          })
          .then (result => console.log(result))
          .catch(err => console.log(err));

          Storage.get('example2.png', {
            bucket: 'myapp-20181030214040-deployment'
          })
          .then(result => console.log(result))
          .catch(err => console.log(err));
          
          
      }
    
      render() {
          let me = Auth.currentAuthenticatedUser()
          .then(user => console.log(user));

          console.log(me);

          return (
            <div>
              <input
                  type="file" accept='image/*'
                  onChange={(e) => this.onChange(e)}
              />
              <button onClick = {this.signOut}>Sign Out</button>
            </div>
          )
      }
    }
    




export default withAuthenticator(App);

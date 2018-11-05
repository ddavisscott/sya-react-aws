import React, { Component } from 'react';
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Storage } from 'aws-amplify';


class UploadImage extends Component {
    
    constructor() {
        super();
        this.state = {
            file:null,
            name: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeDes= this.handleChangeDes.bind(this)
    }

    handleChange = (event) => {
        if ( event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this.setState({file: event.target.files[0]})
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value});
    }

    handleChangeDes = (event) => {
        this.setState({description: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.file == null) {
            alert("File Not Chosen")
        }
        else {     
        const file = this.state.file;
        Storage.put(this.state.name, file, {
            contentType: 'image',
            bucket:'myapp-20181030214040-deployment'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));
        }
    }

    render() {
        Auth.currentAuthenticatedUser()
            .then(user => console.log(user))
        return(
            <div>
            <form onSubmit = {this.handleSubmit}>
                Name:
                <p><input type = "text" value={this.state.name}
                onChange = {this.handleChangeName}/></p>
                Description:
                <p><input type = "text" value={this.state.description}
                onChange = {this.handleChangeDes}/></p>
                <input label = 'upload image' 
                type = 'file' onChange = {this.handleChange} 
                accept = "image/*"/>
                <img src ={this.state.image} alt ="No Art Selected" height = "200" />
                <p><button type = 'submit' >
                    Upload
                </button></p>
            </form>
            
            </div>
        )
    }

}
export default withAuthenticator(UploadImage);
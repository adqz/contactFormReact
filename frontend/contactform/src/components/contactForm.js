import React, { Component } from 'react';
import axios from 'axios';
import MyTextField from './myTextField';
import MyButton from './myButton';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactInformation: {
                name: '',
                email: '',
                message: '',
            },
        };
        // Binding event handlers
        this.updateContactInformation=this.updateContactInformation.bind(this);
        this.onButtonPress=this.onButtonPress.bind(this);
        
        this.urlByPassCors = "https://cors-anywhere.herokuapp.com/";
    }

    updateContactInformation = (updatedContactInformation) => {
        this.setState({ contactInformation: updatedContactInformation});
    }
    
    onButtonPress(event) {
        event.preventDefault()
        console.log(JSON.stringify(this.state.contactInformation))
        axios({
            url: this.urlByPassCors + 'https://nwszrqrum8.execute-api.us-west-2.amazonaws.com/test2_cors/email',
            host: 'https://nwszrqrum8.execute-api.us-west-2.amazonaws.com/',
            method: 'POST',
            path: '/test2_cors/email',
            data: JSON.stringify(this.state.contactInformation),
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <MyTextField
                        id='name'
                        label='Name'
                        contactInformation={this.state.contactInformation}
                        updateContactInformation={this.updateContactInformation}
                    />
                </div>
                <div>
                    <MyTextField
                        id='email'
                        label='Email'
                        contactInformation={this.state.contactInformation}
                        updateContactInformation={this.updateContactInformation}
                    />
                </div>
                <div>
                    <MyTextField
                        id='message'
                        label='Message'
                        contactInformation={this.state.contactInformation}
                        updateContactInformation={this.updateContactInformation}
                    />
                </div>
                <div>
                    <MyButton
                    id='submit'
                    label='Submit'
                    onButtonPress={this.onButtonPress}
                    />
                </div>
            </div>
        );
    }
}

export default ContactForm

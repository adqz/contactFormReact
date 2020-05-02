import React, { Component } from 'react';
import axios from 'axios';
import MyTextField from './myTextField';
import MyButton from './myButton';
import Google from './google';
// import MyAlert from './myAlert';
// import { Alert, AlertTitle } from '@material-ui/lab';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactInformation: {
                name: '',
                email: '',
                message: '',
            },
            apiResponse: {
                staus: null,
                data: null,
            },
        };
        // Binding event handlers
        this.updateContactInformation=this.updateContactInformation.bind(this);
        this.onButtonPress=this.onButtonPress.bind(this);
        // RegEx patterns to validate fields
        this.regExPatterns = {
            name: /^[a-zA-Z ]{2,30}$/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "",
        };
        // URL to prepend to POST request. This will temporarily bypass CORS issue.
        this.urlByPassCors = "https://cors-anywhere.herokuapp.com/";
    }

    updateContactInformation = (updatedContactInformation) => {
        this.setState({ contactInformation: updatedContactInformation});
    }

    updateApiResponse = (response) => {
        this.setState({ apiResponse: response })
    }
    
    onButtonPress(event) {
        event.preventDefault()
        axios({
            url: this.urlByPassCors + 'https://nwszrqrum8.execute-api.us-west-2.amazonaws.com/test2_cors/email',
            host: 'https://nwszrqrum8.execute-api.us-west-2.amazonaws.com/',
            method: 'POST',
            path: '/test2_cors/email',
            data: JSON.stringify(this.state.contactInformation),
        })
        .then(response => {
            this.updateApiResponse(response)
            console.log(this.state.apiResponse)
        })
        .catch(error => {
            this.updateApiResponse(error)
            console.log(error)
        })

    }

    renderAlert = () => {
        if (this.state.apiResponse.status === 200) {
            return (
                <div>
                    {alert(this.state.apiResponse.data)}
                </div>
            )
        } else if (this.state.apiResponse.status === 502) {
            return (
                <div>
                    {alert('All sucks')}
                </div>
            )
        } else {
            return
        }
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
                        pattern={this.regExPatterns.name}
                    />
                </div>
                <div>
                    <MyTextField
                        id='email'
                        label='Email'
                        contactInformation={this.state.contactInformation}
                        updateContactInformation={this.updateContactInformation}
                        pattern={this.regExPatterns.email}
                    />
                </div>
                <div>
                    <MyTextField
                        id='message'
                        label='Message'
                        contactInformation={this.state.contactInformation}
                        updateContactInformation={this.updateContactInformation}
                        pattern={this.regExPatterns.message}
                    />
                </div>
                <div>
                    <MyButton
                    id='submit'
                    label='Submit'
                    onButtonPress={this.onButtonPress}
                    />
                </div>
                
                <div>
                    <Google 
                    contactInformation={this.state.contactInformation}
                    updateContactInformation={this.updateContactInformation}
                    />
                </div>

                {/* {this.renderAlert()} */}

            </div>
        );
    }
}

export default ContactForm

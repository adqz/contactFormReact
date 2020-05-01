import React, { Component } from 'react';
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
    }

    updateContactInformation = (updatedContactInformation) => {
        this.setState({ contactInformation: updatedContactInformation});
    }
    
    onButtonPress(event) {
        event.preventDefault()
        console.log(JSON.stringify(this.state.contactInformation))
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

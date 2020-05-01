import React from 'react';
import TextField from '@material-ui/core/TextField';

class MyTextField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
        this.updateField = this.updateField.bind(this);
    }

    updateField = (id, val) => {
        let localContactInformation = this.props.contactInformation;
        localContactInformation[id] = val;
        this.setState({ value: val});
        this.props.updateContactInformation(localContactInformation)
    };

    render () {  
        return (
            <TextField
            id={this.props.id}
            label={this.props.label}
            value={this.state.value}
            onChange={(event) => 
                this.updateField(this.props.id, event.target.value)
            }
            />
        );
    }

}
export default MyTextField;

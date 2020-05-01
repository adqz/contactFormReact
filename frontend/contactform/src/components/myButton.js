import React from 'react';
import { Button } from '@material-ui/core';

class MyButton extends React.Component{
    constructor(props) {
        super(props);
    }
    myButtonPress = (event) => {
        this.props.onButtonPress(event)
    }
    render () {  
        return (
            <Button
            id={this.props.id}
            onClick={(event) => this.myButtonPress(event)}
            >
            {this.props.label}
            </Button>
        );
    }

}
export default MyButton;

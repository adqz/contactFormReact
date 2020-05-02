import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

class MyAlert extends React.Component{
    constructor(props) {
        super(props);
        this.severity = {
            200: 'success',
            500: 'error',
            501: 'error',
        }
    }
    // this.severity[this.props.statusCode]
    render () {  
        return (
            <Alert onClose={() => {}} severity={'error'}>
                <AlertTitle>{'error'}</AlertTitle>
                Wassup
            </Alert>
        );
    }

}
export default MyAlert;

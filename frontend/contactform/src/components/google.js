import React from 'react';
import { GoogleLogin } from 'react-google-login';

class Google extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render () {  
        return (
            <GoogleLogin
                clientId="1075754686112-a6rmjdih1a1skhi2342sd2veh6i3r3o9.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(event) => this.props.onGoogleLogin(event, "success")}
                onFailure={(event) => this.props.onGoogleLogin(event, "failure")}
                cookiePolicy={'single_host_origin'}
            />
        );
    }

}
export default Google;
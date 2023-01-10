import React from 'react'
import GoogleLogin from "react-google-login";
function Login() {
    const responseGooglesuccess = (response) => {
        console.log(response);
    };
    const responseGooglefailure = (response) => {
        console.log(response);
    };
    return (
        <div>
            <GoogleLogin
                clientId="648361007549-ja10sqjvtk5uc6ike2cb9j4bdp3kf31d.apps.googleusercontent.com"
                buttonText="Signup With Google"
                onSuccess={responseGooglesuccess}
                onFailure={responseGooglefailure}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    )
}

export default Login
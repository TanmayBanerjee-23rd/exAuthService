import GoogleAuthenticator from "./GoogleAuthenticator";
import FacebookAuthenticator from "./FacebookAuthenticator";
import OTPAuthenticator from "./OTPAuthenticator";
import UsernamePasswordAuthenticator from "./UsernamePasswordAuthenticator";
import tokenService from "./JWTAuth";

class AuthenticationFactory {

    private getAuthenticator( authenticationType: string ) {

        switch( authenticationType ) {
            case "google":
                return GoogleAuthenticator;
            case "facebook":
                return FacebookAuthenticator;
            case "otp":
                return OTPAuthenticator;
            default:
                return UsernamePasswordAuthenticator;
        };
    };

    async allocateJWToken( identifier: string, secret: string, authenticationType: string ) {

        const authenticator = this.getAuthenticator( authenticationType );

        if ( await authenticator.authenticate( identifier, secret ) ) {
            return tokenService.sign( {
                userName: `${ authenticator.userData.firstName } ${ authenticator.userData.lastName }`,
                email: authenticator.userData.email
            } );
        }
    };

    sendOTP( phoneNumber: string ) {

        return OTPAuthenticator.sendOTP( phoneNumber );
    }
};

export default ( new AuthenticationFactory() );   

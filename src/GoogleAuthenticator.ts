import { iAuthenticator } from "./interfaces";
const { OAuth2Client } = require('google-auth-library');
import config from "./config";
import UserRepo from "./database/repositories/UserRepo";

const client = new OAuth2Client( "CLIENT_ID" );

class GoogleAuthenticator implements iAuthenticator {

    userData: any;

    async authenticate( userEmail: string, token: string ): Promise<Boolean> {
        
        this.userData = UserRepo.getUserByEmail( userEmail );

        const ticket = await client.verifyIdToken({

            idToken: token,
            audience: config.Google_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            
        });

        const payload = ticket.getPayload();
        const gUniqueId = payload[ 'sub' ];

        return Promise.resolve( this.userData && ( userEmail === this.userData.userEmail ) && ( gUniqueId === this.userData.gUniqueId ) );
    }
    
};

export default ( new GoogleAuthenticator() );
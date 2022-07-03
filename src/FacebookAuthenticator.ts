import axios from 'axios';
import { iAuthenticator } from './interfaces';

class FacebookAuthenticator implements iAuthenticator {

    userData: any;

    async authenticate( identifier: string, code: string ): Promise<Boolean> {
        const access_token = await this.getAccessTokenFromCode( code );

        this.userData = await this.getFacebookUserData( access_token );

        return ( this.userData.email === identifier );
    };

    async getAccessTokenFromCode( code ) {
        const { data } = await axios({
          url: 'https://graph.facebook.com/v4.0/oauth/access_token',
          method: 'get',
          params: {
            client_id: process.env.APP_ID_GOES_HERE,
            client_secret: process.env.APP_SECRET_GOES_HERE,
            redirect_uri: 'https://www.example.com/authenticate/facebook/',
            code,
          },
        });

        console.log( data ); // { access_token, token_type, expires_in }

        return data.access_token;
      };

    async getFacebookUserData( access_token ) {
        const { data } = await axios({
          url: 'https://graph.facebook.com/me',
          method: 'get',
          params: {
            fields: [ 'id', 'email', 'first_name', 'last_name' ].join( ',' ),
            access_token: access_token,
          },
        });

        console.log( data ); // { id, email, first_name, last_name }
        return data;
    };
}

export default ( new FacebookAuthenticator() );
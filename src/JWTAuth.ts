const jwt = require( "jsonwebtoken" );
import config from "./config";


class JWTAuth {
    
    sign( payloadObj ) {

        try {
            const token = jwt.sign( payloadObj, config.jwtSecret, { expiresIn: config.jwtExpiry } );

            return {
                success: true,
                token
            };

        } catch( err ) {
            return {
                success: false,
                message: err.message
            }
        }
    };
}

export default ( new JWTAuth() );
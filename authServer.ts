import express from "express";

import authFactory from "./src/AuthenticationFactory";

const app = express( );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );


app.get( "/authorize", ( req, res) => {

    const { identifier, secret, authenticationType } = req.query;
    const jwtToken = authFactory.allocateJWToken( identifier as string, secret as string, authenticationType as string );

    if ( jwtToken ) res.status( 200 ).json( { authenticated: true, authorized: jwtToken } );
    else res.status( 500 ).json( { authenticated: false, authorized: null } );
    
});

app.post( "/send_otp", async ( req, res ) => {

    const result = await authFactory.sendOTP( req.body.phoneNumber );

    if ( !result.success ) {
        res.status( 500 );
    }

    res.status( 200 );
    res.json( result );
});

const server = app.listen( 8000 );

export default server;
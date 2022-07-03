import { iAuthenticator } from "./interfaces";
const UserRepo =  require( "./database/repositories/UserRepo" );

class UsernamePasswordAuthenticator implements iAuthenticator {

    userData: any;

    async authenticate( identifier: string, secret: string ): Promise<Boolean> {
        
        this.userData = await UserRepo.getUserByEmail( identifier );

        return Promise.resolve( this.userData && ( identifier === this.userData.userName ) && ( secret === this.userData.password ) );
    };
};

export default ( new UsernamePasswordAuthenticator() );
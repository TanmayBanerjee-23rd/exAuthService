import { iAuthenticator } from "./interfaces";
import UserRepo from "./database/repositories/UserRepo";

class UsernamePasswordAuthenticator implements iAuthenticator {

    userData: any;

    async authenticate( identifier: string, secret: string ): Promise<Boolean> {
        
        this.userData = await UserRepo.getUserByEmail( identifier );
        
        return Promise.resolve( this.userData && ( identifier === this.userData.email ) && ( secret === this.userData.password ) );
    };
};

export default ( new UsernamePasswordAuthenticator() );
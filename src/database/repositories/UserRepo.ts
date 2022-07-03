import { Model } from 'mongoose';

import PaginateRepo from './paginateRepo';
import userModel from "../models/userModel";
import { iUserEntity } from "../entities/userEntity";


class UserRepo extends PaginateRepo<iUserEntity> {

    protected getModel(): Model<iUserEntity> {
        return userModel as Model<iUserEntity>;
    };

    async createUser( userObj: iUserEntity ) {
        return ( await this.create( userObj ) );
    };

    async getAllUsers() {
        return ( await this.findAll( {} ) );
    };

    async getUserById( userId: string ) {
        return ( await this.findOne({ _id: userId }) );
    };

    async getUserByEmail( userEmail: string ) {
        return ( await this.findOne({ email: userEmail }) );
    };

    async getUserByPhoneNumber( phoneNumber: string ) {
        return ( await this.findOne({ phoneNumber: phoneNumber }) );
    };
};

export default ( new UserRepo() );

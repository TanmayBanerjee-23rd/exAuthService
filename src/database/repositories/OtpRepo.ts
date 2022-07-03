import { Model } from 'mongoose';

import PaginateRepo from './paginateRepo';
import otpModel from "../models/otpModel";
import { iOtpEntity } from "../entities/otpEntity";

class OtpRepo extends PaginateRepo<iOtpEntity> {
    
    protected getModel(): Model<iOtpEntity> {
        return otpModel as Model<iOtpEntity>;
    };

    async createOTPrecord( otpObj: iOtpEntity ) {
        return ( await this.create( otpObj ) );
    };

    async findById( otpId: string ) {
        return ( await this.findOne({ _id: otpId }) );
    };

    async findByPhoneNumber( phoneNumber: string ) {
        return ( await this.findOne({ phoneNumber: phoneNumber }) );
    };
};

export default ( new OtpRepo() );
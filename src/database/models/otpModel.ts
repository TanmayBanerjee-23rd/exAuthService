import _MongoDb from "../dbConnection";
import { Schema, Model } from 'mongoose';
import { iOtpEntity } from "../entities/otpEntity";

const dbInstance = _MongoDb.getDbInstance();

const otpSchema: Schema = dbInstance.Schema({
    otp: String,
    createdTimeStamp: String,
    expiryTimeStamp: String,
    verificationStatus: String
});

const otpModel: Model<iOtpEntity> = dbInstance.model( "Otp", otpSchema );

export default otpModel;


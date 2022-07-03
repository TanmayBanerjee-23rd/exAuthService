import _MongoDb from "../dbConnection";
import { Schema, Model } from 'mongoose';
import { iUserEntity } from "../entities/userEntity";

const dbInstance = _MongoDb.getDbInstance();

const userSchema: Schema = dbInstance.Schema({
    firstName: { type: String, index: true, required: true },
    middleName: { type: String, index: true },
    lastName: { type: String, index: true },
    email: { type: String, index: true, required: true },
    password: { type: String, index: true, required: true },
    phoneNumber: { type: String, index: true, required: true },
    userType: { type: String, index: true, required: true }
});

const userModel: Model<iUserEntity> = dbInstance.model( "Users", userSchema );

export default userModel;


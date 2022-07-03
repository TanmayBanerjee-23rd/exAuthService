import axios from "axios";
import { iAuthenticator } from "./interfaces";
import OtpRepo from "./database/repositories/OtpRepo";
import UserRepo from "./database/repositories/UserRepo";

const encryptor = require( "crypto-js" );
const salt = "usbcak762@^&$#@893";
const otpGenerator = require( "otp-generator" );
const moment = require( "moment" );

class OTPAuthenticator implements iAuthenticator {

    userData: any;

    async authenticate( otp: string, verificationKey: string ): Promise<Boolean> {

        const decodedVerificationKeyObj = JSON.parse( ( encryptor.AES.decrypt( verificationKey, 'secret key 123') ).toString( encryptor.enc.Utf8 ) );

        const otpRecordObj = await OtpRepo.findById( decodedVerificationKeyObj.otpId );

        return Promise.resolve( ( moment( otpRecordObj.expiryTimeStamp ).diff( moment( otpRecordObj.createdTimeStamp, "minutes") ) < 15 ) && otpRecordObj.otp === otp );
    };

    async sendOTP( phoneNumber: string ) {

        this.userData = await UserRepo.getUserByPhoneNumber( phoneNumber );

        // console.log( "sendOTP :: userData :: ", this.userData , phoneNumber);

        if ( !this.userData ) {
            return {
                success: false,
                message: "Invalid phone number!"
            }
        }

        const otp = otpGenerator.generate( 6, { alphabets: false, upperCase: false, specialChars: false });
        const currentTimeStamp = moment();
        const expiryTimeStamp = moment( currentTimeStamp ).add( 15, "minutes" );

        const otpRecordInsertionResult = await OtpRepo.createOTPrecord( {
            otp,
            createdTimeStamp: currentTimeStamp,
            expiryTimeStamp,
            verificationStatus: false // should add phoneNumber.
        });

        const verificationKey = encryptor.AES.encrypt( JSON.stringify( {
            createdTimeStamp: currentTimeStamp,
            expiryTimeStamp,
            otpId: otpRecordInsertionResult._id
        }), salt ).toString();

        const otpSentRes = await axios.post( "https://stage.api.mcityapp.com/mv/api/sms/send", {
            phoneNumber,
            otp
        });

        if ( otpSentRes ) {
            return { 
                success: true,
                verificationKey
            };
        } else return { 
            success: false,
            message: "Sending otp failed. Please try again later!"
        };
    };
}

export default ( new OTPAuthenticator() );
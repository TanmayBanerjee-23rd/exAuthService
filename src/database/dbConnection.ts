const MongoClient = require( "mongoose" );
import config from "../config";

class MongoDb {

    dbInstance : ( typeof MongoClient | undefined ) = undefined;

    private createConnection() {

        // will make connection to database server
        MongoClient.connect( config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
        console.log( "Database connection was successful." );

        this.dbInstance = MongoClient;

    }

    getDbInstance() {

        if ( !this.dbInstance ) {
            this.createConnection();
        }

        return this.dbInstance;
    }
};

export default ( new MongoDb() );

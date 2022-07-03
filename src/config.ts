const config = {
    dev: {
        Google_CLIENT_ID: "SHajbaU37abj*(&#",
        DB_URI: "mongodb://localhost:27017/auth",
        jwtSecret: "asnbiub234&*#$Y*",
        jwtExpiry: "1D"
    }
};

export default config[ process.env.ENV || "dev" ];
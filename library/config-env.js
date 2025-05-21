require("dotenv").config();

//port_number
global.PORT = process.env.PORT || 3000;
global.ALLOW_ORIGNS = (process.env.ALLOW_ORIGNS || '').split(',').filter(Boolean);
global.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt";

//Database_connection_info
global.MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || "";
global.MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || "";
global.MONGO_DB_HOST = process.env.MONGO_DB_HOST || "";
global.MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";

//otp
global.OAUTH2_CLIENT_ID = process.env.OAUTH2_CLIENT_ID || "";
global.OAUTH2_CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET || "";
global.OAUTH2_REDIRECT_URI = process.env.OAUTH2_REDIRECT_URI || "";
global.OAUTH2_REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN || "";
global.OAUTH2_SENDER_EMAIL = process.env.OAUTH2_SENDER_EMAIL || "";
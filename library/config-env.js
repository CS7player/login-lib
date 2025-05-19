require("dotenv").config();

//port_number
global.PORT = process.env.PORT || 3000;
global.ALLOW_ORIGNS = process.ALLOW_ORIGNS.split(',') || [];
global.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt";

//Database_connection_info
global.MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || "";
global.MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || "";
global.MONGO_DB_HOST = process.env.MONGO_DB_HOST || "";
global.MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";
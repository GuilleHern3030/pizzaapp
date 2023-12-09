require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "lodepica";
const DB_NAME = process.env.DB_NAME || "test";
const DB_PORT = process.env.DB_PORT || 3000;
const DB_PARAMS = process.env.DB_PARAMS || undefined;

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_PORT,
    DB_PARAMS
}
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
const DB_NAME = process.env.DB_NAME || "dogs";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_HOST = process.env.DB_HOST || "localhost";


module.exports = {
    PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_HOST
};
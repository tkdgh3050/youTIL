import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const env = process.env.NODE_ENV;
export let dbConfig: mysql.PoolOptions = {};
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env;
if (env === "production") {
  dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT ? parseInt(DB_PORT) : 3306,
    database: DB_DATABASE,
    connectionLimit: 10,
    dateStrings: ["DATE"],
  };
} else {
  dbConfig = {
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    port: 3306,
    database: DB_DATABASE,
    connectionLimit: 10,
    dateStrings: ["DATE"],
  };
}

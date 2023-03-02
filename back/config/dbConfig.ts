import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env;
export const dbConfig: mysql.PoolOptions = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT ? parseInt(DB_PORT) : 3306,
  database: DB_DATABASE,
  connectionLimit: 10,
};

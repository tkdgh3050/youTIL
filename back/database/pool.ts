import mysql, { PoolConnection } from "mysql2/promise";
import { dbConfig } from "../config/dbConfig";

const pool = mysql.createPool(dbConfig);

pool.on("acquire", (conn: PoolConnection) => {
  console.log(`Conn acquire ${conn.threadId}`);
});

pool.on("enqueue", () => {
  console.log("waiting for connection slot");
});

pool.on("release", (conn: PoolConnection) => {
  console.log(`Conn release ${conn.threadId}`);
});

// const pool = dbPool.promise();

export default pool;

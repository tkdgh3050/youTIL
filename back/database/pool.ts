import mysql, { PoolConnection } from "mysql2/promise";
import { dbConfig } from "../config/dbConfig";

// db 풀 생성
const pool = mysql.createPool(dbConfig);

// 연결 시 로깅
pool.on("acquire", (conn: PoolConnection) => {
  console.log(`Conn acquire ${conn.threadId}`);
});

// 연결 대기 시 로깅
pool.on("enqueue", () => {
  console.log("waiting for connection slot");
});

// 연결 해제 시 로깅
pool.on("release", (conn: PoolConnection) => {
  console.log(`Conn release ${conn.threadId}`);
});

// const pool = dbPool.promise();

export default pool;

import express from "express";
import bcrypt from "bcrypt";
import pool from "../database/pool";

const router = express.Router();

const query = "SELECT * FROM USER";
pool.query(query, (err, rows, fields) => {
  console.log(rows);
});

//뒤에 숫자는 10~13 사이로 쓰는데 높을수록 암호화 기능이 높음. 1초정도 걸리는 숫자로 세팅하면 좋음
// const hashedPassword = await bcrypt.hash(req.body.password, 12);

export default router;

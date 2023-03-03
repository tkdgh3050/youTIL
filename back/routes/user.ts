import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../database/pool";
import { insertUser, selectUserOne } from "../database/UserQuery";
import { user } from "../database/rowTypes";

const router = express.Router();

// 회원가입
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  //POST user/
  console.log("POST user");
  console.log(req.body);

  try {
    pool.query(selectUserOne, [req.body.email], async (err, rows: user[], fields) => {
      if (rows.length !== 0) {
        return res.status(403).send("이미 사용중인 이메일입니다.");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      pool.query(insertUser, [req.body.email, hashedPassword], (err, rows, fields) => {
        return res.status(201).send("회원가입 성공입니다.");
      });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//뒤에 숫자는 10~13 사이로 쓰는데 높을수록 암호화 기능이 높음. 1초정도 걸리는 숫자로 세팅하면 좋음
// const hashedPassword = await bcrypt.hash(req.body.password, 12);

export default router;

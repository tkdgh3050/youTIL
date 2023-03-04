import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import passport, { AuthenticateCallback } from "passport";

import pool from "../database/pool";
import { insertUser, selectUserOne } from "../database/UserQuery";
import { user } from "../database/rowTypes";
import { isLoggedInCheck, isNotLoggedInCheck } from "./middlewares";

const router = express.Router();

// 회원가입
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  //POST user/
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

// 로그인
router.post("/login", isNotLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  //POST user/login
  try {
    passport.authenticate("local", (err: any, user: Express.User, info: { message: any }) => {
      if (err) {
        //server err
        console.error(err);
        next(err);
      }
      if (info) {
        //client err
        if (info.message === "email") {
          return res.status(401).send({ type: info.message, message: "존재하지 않는 이메일입니다." });
        } else if (info.message === "password") {
          return res.status(401).send({ type: info.message, message: "비밀번호가 일치하지 않습니다." });
        } else {
          return res.status(401).send({ type: info.message, message: "관리자에게 문의하세요." });
        }
      }
      return req.login(user, async loginErr => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        const resData = {
          email: user.email,
          isAdmin: user.isAdmin,
        };
        return res.status(200).json(resData);
      });
    })(req, res, next);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
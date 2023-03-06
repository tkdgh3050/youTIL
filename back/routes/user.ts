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
    const [rows] = await pool.query<user[]>(selectUserOne, [req.body.email]);
    if (rows.length !== 0) {
      return res.status(403).send("이미 사용중인 이메일입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await pool.query(insertUser, [req.body.email, hashedPassword]).then(() => {
      return res.status(201).send("회원가입 성공입니다.");
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
          return res.status(400).send({ type: info.message, message: "존재하지 않는 이메일입니다." });
        } else if (info.message === "password") {
          return res.status(400).send({ type: info.message, message: "비밀번호가 일치하지 않습니다." });
        } else {
          return res.status(400).send({ type: info.message, message: "관리자에게 문의하세요." });
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

router.post("/logout", isLoggedInCheck, (req: Request, res: Response, next: NextFunction) => {
  req.logout(err => {
    //request 내부의 passport login정보 삭제
    if (err) {
      console.error(err);
      return next(err);
    }
  });
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return next(err);
    }
  });
  res.status(200).send({ message: "로그아웃을 완료 했습니다." });
});

export default router;

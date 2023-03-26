import { Request, Response, NextFunction } from "express";

export const isLoggedInCheck = (req: Request, res: Response, next: NextFunction) => {
  // 로그인 한 사용자만 접근할 수 있게 확인하는 미들웨어
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인한 사용자만 접근 가능합니다.");
  }
};

export const isNotLoggedInCheck = (req: Request, res: Response, next: NextFunction) => {
  // 로그인 안 한 사용자면 접근할 수 있게 확인하는 미들웨어
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};

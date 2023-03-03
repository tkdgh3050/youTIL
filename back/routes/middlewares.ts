import { Request, Response, NextFunction } from "express";

export const isLoggedInCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인한 사용자만 접근 가능합니다.");
  }
};

export const isNotLoggedInCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};

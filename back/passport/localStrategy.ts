import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import pool from "../database/pool";

import { selectUserOne } from "../database/UserQuery";
import { user } from "../database/rowTypes";

export default () => {
  passport.use(
    "local",
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          pool.query(selectUserOne, [email], async (err, rows: user[], fields) => {
            if (rows.length === 0) {
              return done(null, false, { message: "존재하지 않는 사용자입니다." });
            }
            const result = await bcrypt.compare(password, rows[0].password);
            if (result) {
              return done(null, rows[0]);
            }
            return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

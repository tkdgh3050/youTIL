import passport from "passport";
import pool from "../database/pool";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { user } from "../database/rowTypes";
import { selectUserOne, selectUserOneById } from "../database/UserQuery";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    try {
      const [user] = await pool.query<user[]>(selectUserOneById, [id]);
      done(null, user[0]);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  passport.use(
    new LocalStrategy( //로컬 전략 사용
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
        session: true,
      },
      async (email, password, done) => {
        try {
          const [user] = await pool.query<user[]>(selectUserOne, [email]);
          if (user.length === 0) {
            return done(null, false, { message: "email" });
          }
          const result = await bcrypt.compare(password, user[0].password);
          if (result) {
            return done(null, user[0]);
          } else {
            return done(null, false, { message: "password" });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

import passport from "passport";
import pool from "../database/pool";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { user } from "../database/rowTypes";
import { selectUserOne } from "../database/UserQuery";

// declare global {
//   namespace Express {
//     interface User extends user {}
//   }
// }

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      pool.query(selectUserOne, [id], (err, rows: user[], fields) => {
        done(null, rows[0]);
      });
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
        session: true,
      },
      async (email, password, done) => {
        try {
          pool.query(selectUserOne, [email], async (err, rows: user[], fields) => {
            if (rows.length === 0) {
              return done(null, false, { message: "email" });
            }
            const result = await bcrypt.compare(password, rows[0].password);
            if (result) {
              return done(null, rows[0]);
            }
            return done(null, false, { message: "password" });
          });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

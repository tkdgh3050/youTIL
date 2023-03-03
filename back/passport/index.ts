import passport from "passport";
import local from "./localStrategy";
import pool from "../database/pool";
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

  passport.deserializeUser<number>(async (id, done) => {
    try {
      pool.query(selectUserOne, [id], (err, rows: user[], fields) => {
        done(null, rows[0]);
      });
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};

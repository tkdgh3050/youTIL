import { user } from "../database/rowTypes";

declare global {
  namespace Express {
    export interface User extends user {}
  }
}

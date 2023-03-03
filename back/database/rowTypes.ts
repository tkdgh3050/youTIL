import { RowDataPacket } from "mysql2";

export interface user extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  isAdmin: 0 | 1;
  created_at: object;
}

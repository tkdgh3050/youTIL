import { RowDataPacket } from "mysql2";

export interface user extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  isAdmin: 0 | 1;
  created_at: object;
}

export interface playList extends RowDataPacket {
  id: number;
  playlistName: string;
  userID: number;
}

export interface video extends RowDataPacket {
  id: number;
  videoName: string;
  videoURL: string;
  textNote: string;
  lastViewTime: number;
  playListID: number;
  userID: number;
  isPinned: number;
  created_at: object;
  modified_lastViewTime_at: object;
  modified_isPinned_at: object;
}

export interface bookmark extends RowDataPacket {
  id: number;
  time: number;
  playListId: number;
  videoId: number;
}

import express, { Request, Response, NextFunction } from "express";
import {
  deleteBookmark,
  deletePlayList,
  deleteVideo,
  insertBookmark,
  insertPlayList,
  insertVideo,
  selectBookmarkAll,
  selectPlayListAll,
  selectVideoAllByPlayListId,
  selectVideoInfo,
  updateIsPinned,
  updateVideoInfoTextNoteLastViewTime,
} from "../database/NoteQuery";
import { ResultSetHeader } from "mysql2";

import pool from "../database/pool";
import { Bookmark, PlayList, PlayListInVideo, Video } from "../database/reduxTypes";
import { bookmark, playList, video } from "../database/rowTypes";
import { isLoggedInCheck, isNotLoggedInCheck } from "./middlewares";

const router = express.Router();

router.get("/", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: PlayList[] = [];
    const [playListRows] = await pool.query<playList[]>(selectPlayListAll, [req.user?.id]);
    if (playListRows.length > 0) {
      for (let playListRow of playListRows) {
        const [videoRows] = await pool.query<video[]>(selectVideoAllByPlayListId, [playListRow.id]);
        if (videoRows.length > 0) {
          //video가 존재하는 경우
          data.push({
            id: playListRow.id,
            playListName: playListRow.playlistName,
            videoList: videoRows,
          });
        } else {
          //video가 존재하지 않는 경우
          data.push({
            id: playListRow.id,
            playListName: playListRow.playlistName,
          });
        }
      }
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/playList", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(insertPlayList, [req.body.playListName, req.user?.id]);
    const data: PlayList = {
      id: result.insertId,
      playListName: req.body.playListName,
    };
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/playList/:playListId", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(deletePlayList, [req.params.playListId, req.user?.id]);
    return res.status(201).send(req.params.playListId);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/videoList", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(insertVideo, [
      req.body.videoName,
      req.body.videoURL,
      req.body.lastViewTime,
      req.body.playListId,
      req.user?.id,
    ]);
    const data: Video = {
      id: result.insertId,
      videoName: req.body.videoName,
      videoURL: req.body.videoURL,
      lastViewTime: req.body.lastViewTime,
      playListId: req.body.playListId,
    };
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/videoList/:playListId/:videoId", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(deleteVideo, [req.params.playListId, req.params.videoId]);
    const data: PlayListInVideo = {
      playListId: parseInt(req.params.playListId),
      videoId: parseInt(req.params.videoId),
    };
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/videoInfo/:playListId/:videoId", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookmarks: Bookmark[] = [];
    const [videoRow] = await pool.query<video[]>(selectVideoInfo, [req.params.playListId, req.params.videoId]);
    const [bookmarkRows] = await pool.query<bookmark[]>(selectBookmarkAll, [req.params.playListId, req.params.videoId]);
    const data: Video = {
      id: videoRow[0].id,
      videoName: videoRow[0].videoName,
      videoURL: videoRow[0].videoURL,
      lastViewTime: videoRow[0].lastViewTime,
      bookmarkList: bookmarkRows,
      textNote: videoRow[0].textNote,
      isPinned: videoRow[0].isPinned,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/bookmark", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(insertBookmark, [
      req.body.time,
      req.body.playListInVideo.playListId,
      req.body.playListInVideo.videoId,
    ]);
    const data: Bookmark = {
      id: result.insertId,
      time: req.body.time,
      playListId: req.body.playListInVideo.playListId,
      videoId: req.body.playListInVideo.videoId,
    };
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/bookmark/:bookmarkId", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(deleteBookmark, [req.params.bookmarkId]);
    return res.status(201).send(req.params.bookmarkId);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/videoInfo/textNoteLastViewTime", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(updateVideoInfoTextNoteLastViewTime, [
      req.body.textNote,
      req.body.lastViewTime,
      req.body.playListInVideo.videoId,
    ]);
    return res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/videoInfo/isPinned", isLoggedInCheck, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(updateIsPinned, [req.body.isPinned, req.body.playListInVideo.videoId]);
    return res.status(201).json(req.body.isPinned);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;

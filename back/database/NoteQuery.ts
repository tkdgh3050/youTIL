// 노트부분 퀴리 모음
export const selectPlayListAll = `SELECT id, playlistName FROM PLAYLIST WHERE userID=? ORDER BY id DESC;`;
export const selectVideoAllByPlayListId = `SELECT id, videoName, videoURL, lastViewTime FROM VIDEO WHERE playlistID=? ORDER BY id desc;`;
export const insertPlayList = `INSERT INTO PLAYLIST(playlistName, userID) VALUES(?,?);`;
export const deletePlayList = `DELETE FROM PLAYLIST WHERE id=? AND userID=?;`;
export const insertVideo = `INSERT INTO VIDEO(videoName, videoURL, lastViewTime, playlistID, userID) VALUES(?,?,?,?,?);`;
export const deleteVideo = `DELETE FROM VIDEO WHERE id=? AND playlistID=?;`;
export const selectVideoInfo = `SELECT id, videoName, videoURL, textNote, lastViewTime, isPinned FROM VIDEO WHERE playlistID=? AND id=?;`;
export const selectBookmarkAll = `SELECT id, time, playlistID as playListId, videoID as videoId FROM BOOKMARK WHERE playlistID=? AND videoID=? ORDER BY time;`;
export const insertBookmark = `INSERT INTO BOOKMARK(time, playlistID, videoID) VALUES(?,?,?);`;
export const deleteBookmark = `DELETE FROM BOOKMARK WHERE id=?;`;
export const updateVideoInfoTextNoteLastViewTime = `UPDATE VIDEO SET textNote=?, lastViewTime=?, modified_lastViewTime_at=now() WHERE id=?;`;
export const updateIsPinned = `UPDATE VIDEO SET isPinned=?, modified_isPinned_at=now() WHERE id=?;`;
export const selectLastViewVideo = `SELECT id, videoName, videoURL, lastViewTime, playlistID as playListID FROM VIDEO WHERE userID=? AND lastViewTime > 0 ORDER BY modified_lastViewTime_at desc limit 5;`;
export const selectRecentAddVideo = `SELECT id, videoName, videoURL, lastViewTime, created_at, playlistID as playListID FROM VIDEO WHERE userID=? ORDER BY created_at desc limit 5;`;
export const selectPinnedVideo = `SELECT id, videoName, videoURL, lastViewTime, modified_isPinned_at, playlistID as playListID FROM VIDEO WHERE userID=? AND isPinned=1 ORDER BY modified_isPinned_at desc limit 5;`;

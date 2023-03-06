export const selectPlayListAll = `SELECT id, playlistName FROM PLAYLIST WHERE userID=? ORDER BY id DESC;`;
export const selectVideoAllByPlayListId = `SELECT id, videoName, videoURL, lastViewTime FROM VIDEO WHERE playlistID=?;`;
export const insertPlayList = `INSERT INTO PLAYLIST(playlistName, userID) VALUES(?,?);`;
export const deletePlayList = `DELETE FROM PLAYLIST WHERE id=? AND userID=?;`;
export const insertVideo = `INSERT INTO VIDEO(videoName, videoURL, lastViewTime, playlistID) VALUES(?,?,?,?);`;
export const deleteVideo = `DELETE FROM VIDEO WHERE id=? AND playlistID=?;`;
export const selectVideoInfo = `SELECT id, videoName, videoURL, textNote, lastViewTime FROM VIDEO WHERE playlistID=? AND id=?;`;
export const selectBookmarkAll = `SELECT id, time, playlistID as playListId, videoID as videoId FROM BOOKMARK WHERE playlistID=? AND videoID=?;`;

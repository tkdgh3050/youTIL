// 유저부분 쿼리 모음
export const selectUserOne = "SELECT * FROM USER WHERE email=?";
export const selectUserOneById = "SELECT * FROM USER WHERE id=?";
export const insertUser = "INSERT INTO USER(email, password) VALUES(?,?)";

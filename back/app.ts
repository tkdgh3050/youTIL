import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import helmet from "helmet";

import userRouter from "./routes/user";
import noteRouter from "./routes/note";
import passportConfig from "./passport";

dotenv.config();
const app = express();
const port = 80;

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
  app.use(
    cors({
      origin: ["http://youtil.store", "http://www.youtil.store"],
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev")); //front server에서 요청했을 시 로그 남겨줌
  app.use(
    cors({
      origin: true, //들어올 수 있는 요청의 url 설정. true면 *과 비슷함
      credentials: true, //실제 배포할 때는 true 로 변경해야함
    })
  );
}

// 아래 두개는 front 에서 보낸 request를 request.body에 넣어주는 역할을 함
// 그래서 다른 라우터들 보다는 위에 있어야 함
app.use(express.json()); //json으로 넘어온 데이터를 body에 넣어줌
app.use(express.urlencoded({ extended: true })); //form 이 submit 되면 urlencoded 방식으로 넘어오는데 이걸 body에 넣어줌
app.use(cookieParser(process.env.SECRET_COOKIE_KEY));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET_COOKIE_KEY!,
    name: process.env.SESSION_NAME,
    cookie: {
      httpOnly: true,
      secure: false, // https 적용하게 되면 true로
      domain: process.env.NODE_ENV === "production" ? ".youtil.store" : "",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.get("/", (req, res) => {
  res.send("YouTIL back server");
});
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.listen(port, () => {
  console.log(`listen ...`);
});

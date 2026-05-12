import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes";

const app = express();

// 미들웨어 등록
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TSOA 자동 생성 라우트 연결
const router = express.Router();
RegisterRoutes(router);

app.use("/api", router);

app.listen(3000, () => {
  console.log("hello world");
});
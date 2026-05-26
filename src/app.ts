import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import { RegisterRoutes } from "./routes/routes";

import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// 미들웨어 등록
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터 등록
RegisterRoutes(app);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

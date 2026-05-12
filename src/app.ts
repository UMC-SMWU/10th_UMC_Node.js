import express from 'express';
import reviewRouter from './routes/review.route';
import storeRouter from './routes/store.route';
import missionRouter from './routes/mission.route';
import userMissionRouter from './routes/userMission.route';

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
app.use('/api', reviewRouter);
app.use('/api', storeRouter);
app.use('/api', missionRouter);
app.use('/api', userMissionRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


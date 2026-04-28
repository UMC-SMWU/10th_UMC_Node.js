import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("hello world");
});

import storeRouter from './routes/store.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';

app.use(storeRouter);
app.use(reviewRouter);
app.use(missionRouter);
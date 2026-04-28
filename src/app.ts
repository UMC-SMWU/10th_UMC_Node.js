import express from 'express';

import storeRouter from './routes/store.route';
import reviewRouter from './routes/review.route';
import missionRouter from './routes/mission.route';

const app = express();

app.use(express.json());

app.use(storeRouter);
app.use(reviewRouter);
app.use(missionRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
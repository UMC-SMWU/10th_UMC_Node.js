import express from 'express';
import reviewRouter from './routes/review.route';
import storeRouter from './routes/store.route';
import missionRouter from './routes/mission.route';
import userMissionRouter from './routes/userMission.route';

const app = express();

app.use(express.json());

app.use('/api', reviewRouter);
app.use('/api', storeRouter);
app.use('/api', missionRouter);
app.use('/api', userMissionRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
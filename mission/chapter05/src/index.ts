import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleAddStore } from "./modules/stores/controllers/store.controller.js";
import { handleAddReview } from "./modules/reviews/controllers/review.controller.js";
import { handleAddMission, handleChallengeMission } from "./modules/missions/controllers/mission.controller.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/api/v1/auth/signup", handleUserSignUp);
app.post("/api/v1/stores", handleAddStore);
app.post("/api/v1/stores/:storeId/reviews", handleAddReview);
app.post("/api/v1/stores/:storeId/missions", handleAddMission);
app.post("/api/v1/missions/:missionId/challenge", handleChallengeMission);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
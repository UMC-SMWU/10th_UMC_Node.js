import express from "express";
import {
  handleListStoreReviews,
  handleListMyReviews,
  handleListStoreMissions,
  handleListMyMissions,
  handleCompleteMission,
} from "./modules/stores/controllers/store.controller.js";

const app = express();
app.use(express.json());

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/users/:userId/reviews", handleListMyReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/missions", handleListMyMissions);
app.patch("/api/v1/user-missions/:userMissionId/complete", handleCompleteMission);

app.listen(3000, () => {
  console.log("🔥 서버 실행됨: http://localhost:3000");
});
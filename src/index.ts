import express from "express";
import { handleListStoreReviews } from "./modules/stores/controllers/store.controller.js";

const app = express();
app.use(express.json());

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.listen(3000, () => {
  console.log("🔥 서버 실행됨: http://localhost:3000");
});
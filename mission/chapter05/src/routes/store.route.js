const express = require("express");
const router = express.Router();

const storeController = require("../controllers/store.controller");

// 1-1. 특정 지역에 가게 추가
router.post("/regions/:regionId/stores", storeController.createStore);

// 1-2. 가게에 리뷰 추가
router.post("/stores/:storeId/reviews", storeController.createReview);

// 1-3. 가게에 미션 추가
router.post("/stores/:storeId/missions", storeController.createMission);

// 1-4. 가게의 미션을 도전 중인 미션에 추가
router.post("/missions/:missionId/challenge", storeController.challengeMission);

module.exports = router;

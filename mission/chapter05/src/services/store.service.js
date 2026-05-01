const storeRepository = require("../repositories/store.repository");

// 1-1
exports.createStore = async (regionId, body) => {
  const { name, address, score } = body;

  if (!name || !address) {
    throw new Error("가게 이름과 주소는 필수입니다.");
  }

  return await storeRepository.createStore({
    regionId,
    name,
    address,
    score: score ?? 0,
  });
};

// 1-2
exports.createReview = async (memberId, storeId, body) => {
  const { body: reviewBody, score } = body;

  const store = await storeRepository.findStoreById(storeId);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  if (!reviewBody || score === undefined) {
    throw new Error("리뷰 내용과 점수는 필수입니다.");
  }

  return await storeRepository.createReview({
    memberId,
    storeId,
    body: reviewBody,
    score,
  });
};

// 1-3
exports.createMission = async (storeId, body) => {
  const { reward, deadline, missionSpec } = body;

  const store = await storeRepository.findStoreById(storeId);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  if (!reward || !missionSpec) {
    throw new Error("보상과 미션 내용은 필수입니다.");
  }

  return await storeRepository.createMission({
    storeId,
    reward,
    deadline,
    missionSpec,
  });
};

// 1-4
exports.challengeMission = async (memberId, missionId) => {
  const mission = await storeRepository.findMissionById(missionId);

  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const alreadyChallenged = await storeRepository.findMemberMission(
    memberId,
    missionId
  );

  if (alreadyChallenged) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  return await storeRepository.createMemberMission({
    memberId,
    missionId,
    storeId: mission.store_id,
    status: "진행중",
  });
};

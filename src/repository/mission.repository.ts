const missions = [
  {
    id: 1,
    storeId: 1,
    title: '리뷰 작성하기',
    reward: 500,
  },
];

export const findMissionById = async (missionId: number) => {
  return missions.find((mission) => mission.id === missionId) || null;
};
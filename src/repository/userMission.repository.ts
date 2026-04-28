const userMissions: any[] = [];

export const findChallengingMission = async (
  userId: number,
  missionId: number
) => {
  return (
    userMissions.find(
      (userMission) =>
        userMission.userId === userId &&
        userMission.missionId === missionId &&
        userMission.status === 'IN_PROGRESS'
    ) || null
  );
};

export const createUserMission = async (
  userId: number,
  missionId: number
) => {
  const newUserMission = {
    id: userMissions.length + 1,
    userId,
    missionId,
    status: 'IN_PROGRESS',
  };

  userMissions.push(newUserMission);

  return newUserMission;
};
import {
  UserSignUpRequest,
  UserSignUpResponse,
  responseFromReviews,
  responseFromUserMissions,
} from "../dtos/user.dto.js";

import {
  addUser,
  findUserByEmail,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getMyReviews,
  getMyProgressMissions,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError, UserNotFoundError } from "../../../common/errors/customError.js";

export const userSignUp = async (
  data: UserSignUpRequest
): Promise<UserSignUpResponse> => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new DuplicateUserEmailError();
  }

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress || null,
    phoneNumber: data.phoneNumber,
  });

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);

  if (!user) {
    throw new UserNotFoundError();
  }

  const preferences = (await getUserPreferencesByUserId(joinUserId)).map(
    (obj) => obj.foodCategory.name
  );

  return {
    userId: user.id,
    preferences,
  };
};

export const listMyReviews = async (
  userId: number,
  cursor: number | null
) => {
  const user = await getUser(userId);

  if (!user) {
    throw new UserNotFoundError();
  }

  const reviews = await getMyReviews(userId, cursor);
  return responseFromReviews(reviews);
};

export const listMyProgressMissions = async (
  userId: number,
  cursor: number | null
) => {
  const user = await getUser(userId);

  if (!user) {
    throw new UserNotFoundError();
  }

  const missions = await getMyProgressMissions(userId, cursor);
  return responseFromUserMissions(missions);
};

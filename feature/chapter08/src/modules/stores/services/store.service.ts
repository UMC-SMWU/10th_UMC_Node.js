import {
  responseFromReviews,
  responseFromMissions,
} from "../dtos/store.dto.js";

import {
  getAllStoreReviews,
  getStoreById,
  getStoreMissions,
} from "../repositories/store.repository.js";
import { StoreNotFoundError } from "../../../common/errors/customError.js";

const validateStoreExists = async (storeId: number) => {
  const store = await getStoreById(storeId);

  if (!store) {
    throw new StoreNotFoundError();
  }

  return store;
};

export const listStoreReviews = async (
  storeId: number,
  cursor: number | null
) => {
  await validateStoreExists(storeId);

  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (
  storeId: number,
  cursor: number | null
) => {
  await validateStoreExists(storeId);

  const missions = await getStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};

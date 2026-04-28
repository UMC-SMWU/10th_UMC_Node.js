import { AddStoreRequest } from "../dtos/store.dto.js";
import { addStore, getStore } from "../repositories/store.repository.js";

export const storeAdd = async (data: AddStoreRequest) => {
  const storeId = await addStore(data);
  const store = await getStore(storeId);
  return store;
};
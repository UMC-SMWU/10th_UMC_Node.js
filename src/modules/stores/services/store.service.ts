import { AppError } from "../../../common/errors/app.error";
import { prisma } from "../../../db.config";
import { CreateStoreRequest, StoreResponse } from "../dtos/store.dto";

export const createStore = async (
  data: CreateStoreRequest,
): Promise<StoreResponse> => {
  if (!data.name) {
    throw new AppError({
      errorCode: "S001",
      statusCode: 400,
      message: "가게 이름은 필수입니다.",
    });
  }

  const store = await prisma.store.create({
    data: {
      name: data.name,
    },
  });

  return {
    id: store.id,
    name: store.name,
  };
};

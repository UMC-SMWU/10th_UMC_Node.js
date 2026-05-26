import { UpdateMyInfoDto } from "../dto/user.dto";
import { CustomError } from "../errors/customError";
import { findUserById, updateUser } from "../repository/user.repository";

export const updateMyInfo = async (
  userId: number,
  data: UpdateMyInfoDto,
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new CustomError(
      404,
      "USER_NOT_FOUND",
      "존재하지 않는 사용자입니다.",
    );
  }

  return await updateUser(userId, data);
};

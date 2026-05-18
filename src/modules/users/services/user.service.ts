import { DuplicateUserEmailError } from "../../../common/errors/error";
import { prisma } from "../../../db.config";
import {
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto";

export const userSignUp = async (
  data: UserSignUpRequest,
): Promise<UserSignUpResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", {
      email: data.email,
    });
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender ?? "",
      birth: data.birth ? new Date(data.birth) : new Date(),
      address: data.address ?? "",
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber ?? "",
    },
  });

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    preferences: (data.preferences ?? []).map(String),
  };
};

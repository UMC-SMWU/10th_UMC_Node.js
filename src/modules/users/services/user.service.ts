import { DuplicateUserEmailError } from "../../../common/errors/error";
import { prisma } from "../../../db.config";
import {
  UserSignUpRequest,
  UserSignUpResponse,
  UserMeResponse,
  UserUpdateMeRequest,
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

export const updateMyProfile = async (
  userId: number,
  data: UserUpdateMeRequest,
): Promise<UserMeResponse> => {
  const updateData: {
    name?: string;
    nickname?: string | null;
    gender?: string;
    birth?: Date;
    address?: string;
    detailAddress?: string | null;
    phoneNumber?: string;
  } = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.nickname !== undefined) updateData.nickname = data.nickname;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.birth !== undefined) updateData.birth = new Date(data.birth);
  if (data.address !== undefined) updateData.address = data.address;
  if (data.detailAddress !== undefined) {
    updateData.detailAddress = data.detailAddress;
  }
  if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber;

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detailAddress,
    phoneNumber: user.phoneNumber,
  };
};

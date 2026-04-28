import bcrypt from "bcrypt";
import { UserSignUpRequest } from "../dtos/user.dto.js";
import { addUser, getUser, getCategoryIdByName, setPreference } from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userId = await addUser({
    email:    data.email,
    password: hashedPassword,
    nickname: data.nickname,
    phone:    data.phone,
    gender:   data.gender,
    birth:    new Date(data.birth),
  });

  if (userId === null) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }

  for (const categoryName of data.preferredCategories) {
    const categoryId = await getCategoryIdByName(categoryName);
    if (categoryId !== null) {
      await setPreference(userId, categoryId);
    }
  }

  const user = await getUser(userId);
  return user;
};
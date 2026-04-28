export interface UserSignUpRequest {
  email:    string;
  password: string;
  nickname: string;
  phone:    string;
  gender:   string;
  birth:    string;
  preferredCategories: string[];
}

export const bodyToUser = (body: UserSignUpRequest) => {
  return {
    email:    body.email,
    password: body.password,
    nickname: body.nickname,
    phone:    body.phone,
    gender:   body.gender,
    birth:    new Date(body.birth),
    preferredCategories: body.preferredCategories,
  };
};

export const responseFromUser = (user: any) => ({
  userId:    user.id,
  nickname:  user.nickname,
  email:     user.email,
  createdAt: user.created_at,
});
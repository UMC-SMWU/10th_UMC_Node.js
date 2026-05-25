import passport from "passport";

export const isLogin = passport.authenticate("jwt", { session: false });

export function authorizeUser() {
  return isLogin;
}

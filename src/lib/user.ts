import { SessionUser } from "next-auth";

export const checkShouldFillProfile = (user: SessionUser) => {
  return !user.name || (!user.isStudent && !user.isPersonal);
}
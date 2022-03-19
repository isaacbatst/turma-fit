import { SessionUser } from "next-auth";

export const shouldFillProfile = (user: SessionUser) => {
  return !user.name || (!user.isStudent && !user.isPersonal);
}
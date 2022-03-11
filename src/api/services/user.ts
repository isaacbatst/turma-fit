import * as UserModel from "../models/user";

type PatchUserUpdatedDataDTO = {
  name: string,
}

export const patchUser = async (email: string, updatedData: PatchUserUpdatedDataDTO) => {
  const user = await UserModel.getByEmail(email);

  if (!user) {
    return {
      error: 'USER_NOT_FOUND'
    }
  }

  const updated = await UserModel.update({
    ...updatedData,
    email
  });

  return {
    data: updated
  };
}
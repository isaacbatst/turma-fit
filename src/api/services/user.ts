import * as UserRepository from "../repositories/user";

type PatchUserUpdatedDataDTO = {
  name: string,
}

export const patchUser = async (email: string, updatedData: PatchUserUpdatedDataDTO) => {
  const user = await UserRepository.getByEmail(email);

  if (!user) {
    return {
      error: 'USER_NOT_FOUND'
    }
  }

  const updated = await UserRepository.update({
    ...updatedData,
    email
  });

  return {
    data: updated
  };
}
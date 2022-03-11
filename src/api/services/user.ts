import { getByEmail, update } from "../models/user";

type PatchUserUpdatedDataDTO = {
  name: string
}

export const patchUser = async (email: string, updatedData: PatchUserUpdatedDataDTO) => {
  const user = await getByEmail(email);

  if (!user) {
    return {
      error: 'USER_NOT_FOUND'
    }
  }

  const updated = await update(updatedData);

  return {
    data: updated
  };
}
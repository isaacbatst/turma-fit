import { getByEmail, update } from "../models/user";

type PatchUserUpdatedDataDTO = {
  name: string
}

export const patchUser = async (email: string, updatedData: PatchUserUpdatedDataDTO) => {
  const user = await getByEmail(email);

  if (!user) {
    return {
      error: {
        message: 'user not found',
        status: 404,
      }
    }
  }

  const updated = await update(updatedData);

  return {
    data: updated
  };
}
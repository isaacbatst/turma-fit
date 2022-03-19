import * as UserRepository from "../repositories/user";

type PatchUserUpdatedDataDTO = {
  name: string,
  role: string
}

export const patchUser = async (email: string, updatedData: PatchUserUpdatedDataDTO) => {
  const user = await UserRepository.getByEmail(email);

  if (!user) {
    return {
      error: 'USER_NOT_FOUND'
    }
  }

  if(updatedData.name.length < 2) {
    return {
      error: 'INVALID_NAME'
    }
  }

  if(updatedData.role !== 'student' && updatedData.role !== 'personal'){
    return {
      error: 'UNKNOWN_ROLE'
    }
  }

  // TODO
  //update only name
  //check if there's student/personal to toggle
  const updated = await UserRepository.update({
    ...updatedData,
    email
  });


  return {
    data: updated
  };
}
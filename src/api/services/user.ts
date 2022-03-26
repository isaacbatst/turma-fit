import { User } from "@prisma/client";
import { PatchUserError, patchUserErrors } from "../errors/user";
import { createServiceError } from "../errors/utils";
import * as PersonalRepository from "../repositories/personal";
import { createStudentConnectedByEmail, getStudentByEmail } from "../repositories/student";
import * as UserRepository from "../repositories/user";
import { patchUserSchema } from "../schemas/user";

type PatchUserUpdatedDataDTO = {
  name: string,
  role: string
}

export const patchUser = async (email: string, updatedData: PatchUserUpdatedDataDTO): 
  Promise<{
    error?: PatchUserError,
    data?: User
  }> => {
  const validation = patchUserSchema.validate(updatedData);

  if(validation.error){
    if(validation.error.details.length) {
      const [ firstError ] = validation.error.details;

      return createServiceError(firstError.message);
    }

    return createServiceError(patchUserErrors.UNKNOWN_ERROR);
  }
  
  const user = await UserRepository.getByEmail(email);

  if (!user) {
    return createServiceError(patchUserErrors.USER_NOT_FOUND);
  }

  await createRole(email, updatedData.role);

  const updated = await UserRepository.update({
    name: updatedData.name,
    email
  });


  return {
    data: updated
  };
}

async function createRole(email: string, role: string){
  if(role === 'student'){
    const student = await getStudentByEmail(email);

    if(!student){
      await createStudentConnectedByEmail(email);
    }
  }

  if(role === "personal"){
    const personal = await PersonalRepository.getByEmail(email);

    if(!personal){
      await PersonalRepository.create(email);
    }
  }
}
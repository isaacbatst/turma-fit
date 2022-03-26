import { PatchUserError, patchUserErrors } from "./user";

export function createServiceError(message: string) {
  if(!(message in patchUserErrors)){
    console.log('UNKNOWN_ERROR: ', message);
    message = patchUserErrors.UNKNOWN_ERROR;
  }

  return {
    error: message as PatchUserError
  }
}
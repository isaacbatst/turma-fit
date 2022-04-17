import { CreateUserService } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { CreateUserBodyValidator } from "../controllers/CreateUserController/CreateUserBodyValidator";
import { CreateUserController } from "../controllers/CreateUserController/CreateUserController";

function makeCreateUserController() {
  const createUserService = new CreateUserService();
  const createUserBodyValidator = new CreateUserBodyValidator();

  const createUserController = new CreateUserController(
    createUserBodyValidator,
    createUserService
  )

  return createUserController;
}

export default makeCreateUserController;
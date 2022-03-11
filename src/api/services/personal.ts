import * as PersonalRepository from '../repositories/personal';

export const createPersonal = async (email: string) => {
  const created = PersonalRepository.create(email)

  return created;
}
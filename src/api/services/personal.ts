import * as PersonalRepository from '../repositories/personal';
import * as AdviceRepository from '../repositories/advice';

export const createPersonal = async (email: string) => {
  const created = PersonalRepository.create(email)

  return created;
}

export const getPersonalAdvices = async (email: string) => {
  const advices = AdviceRepository.getAdvicesByPersonalUserEmail(email);

  return advices;
}
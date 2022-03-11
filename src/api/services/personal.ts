import * as PersonalModel from '../models/personal';

export const createPersonal = async (email: string) => {
  const created = PersonalModel.create(email)

  return created;
}
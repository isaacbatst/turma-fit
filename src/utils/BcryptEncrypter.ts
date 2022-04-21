import { Encrypter } from "@domain/common/Encrypter";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; 
export class BcryptEncrypter implements Encrypter {
  compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue)
  }

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, SALT_ROUNDS);
  }
}
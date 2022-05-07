import { Encrypter } from "@domain/common/Encrypter";
import { TokenGenerator } from "@domain/common/TokenGenerator";
import { UuidGenerator } from "@domain/common/UuidGenerator";

export class EncrypterMock implements Encrypter {
  static readonly HASHED_VALUE = 'hashed_value';
  public compareReturn = true;

  compare: (value: string, hashedValue: string) => Promise<boolean> = 
    jest.fn(async (value, hashedValue) => {
      return this.compareReturn;
    })

  hash: (value: string) => Promise<string> = 
    async () => EncrypterMock.HASHED_VALUE;
}

export class TokenGeneratorMock implements TokenGenerator {
  static readonly GENERATED_TOKEN = 'any_token'
  generate: () => string = jest.fn(() => TokenGeneratorMock.GENERATED_TOKEN);
}

export class UuidGeneratorMock implements UuidGenerator {
  generate: () => string = () => 'any_uuid';
}
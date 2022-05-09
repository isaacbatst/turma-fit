import { UuidGenerator } from "@domain/common/UuidGenerator";
import { v4 } from "uuid";

export class Uuidv4UuidGeneratorAdapter implements UuidGenerator {
  generate(): string {
    return v4();
  }
}
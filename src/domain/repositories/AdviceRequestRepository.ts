import { AdviceRequest } from "@domain/entities/AdviceRequest/AdviceRequest";
import { Profile } from "@domain/entities/User/Profile";

export interface AdviceRequestRepository {
  create: (adviceRequest: AdviceRequest, fromProfile: Profile, toProfile: Profile) => Promise<AdviceRequest>
}
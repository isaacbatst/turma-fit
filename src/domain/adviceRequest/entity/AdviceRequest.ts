import { v4 } from "uuid"

export enum AdviceRequestStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export enum AdviceRequestOrigin {
  STUDENT = "STUDENT",
  PERSONAL = "PERSONAL",
}

type AdviceRequestOriginType = keyof typeof AdviceRequestOrigin
type AdviceRequestStatusType = keyof typeof AdviceRequestStatus

export interface CreateAdviceRequestEntityParams {
  id?: string,
  createdAt?: Date,
  status?: AdviceRequestStatusType,
  origin: AdviceRequestOriginType,
  fromUserId: string,
  toUserId: string,
}

export class AdviceRequest {
  private id: string
  private createdAt: Date
  private origin: AdviceRequestOriginType
  private status: AdviceRequestStatusType
  private fromUserId: string
  private toUserId: string

  constructor(params: CreateAdviceRequestEntityParams) {
    this.id = params.id || v4();
    this.createdAt = params.createdAt || new Date();
    this.status = params.status || AdviceRequestStatus.PENDING;

    this.origin = params.origin;
    this.fromUserId = params.fromUserId;
    this.toUserId = params.toUserId;
  }

  getId() {
    return this.id
  }
  getCreatedAt() {
    return this.createdAt
  }
  getOrigin() {
    return this.origin
  }
  getStatus() {
    return this.status
  }
  getFromUserId() {
    return this.fromUserId
  }
  getToUserId() {
    return this.toUserId
  }
}
import { v4 } from "uuid"

export enum AdviceRequestStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export enum ADVICE_REQUEST_ORIGIN {
  STUDENT = "STUDENT",
  PERSONAL = "PERSONAL",
}

export type AdviceRequestOriginType = keyof typeof ADVICE_REQUEST_ORIGIN
export type AdviceRequestStatusType = keyof typeof AdviceRequestStatus

export interface CreateAdviceRequestEntityParams {
  id?: string,
  createdAt?: Date,
  status?: AdviceRequestStatusType,
}

export class AdviceRequest {
  private id: string
  private createdAt: Date
  private status: AdviceRequestStatusType

  constructor(params?: CreateAdviceRequestEntityParams) {
    this.id = params?.id || v4();
    this.createdAt = params?.createdAt || new Date();
    this.status = params?.status || AdviceRequestStatus.PENDING;
  }

  getId() {
    return this.id
  }
  getCreatedAt() {
    return this.createdAt
  }
  getStatus() {
    return this.status
  }
}
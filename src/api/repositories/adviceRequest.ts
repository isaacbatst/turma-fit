import { AdviceRequest, AdviceRequestOrigin } from "@prisma/client"
import { prisma } from "../../lib/prisma"

export interface CreateAdviceParams {
  origin: AdviceRequestOrigin,
  fromId: number
  toId: number,
}

export const createAdviceRequest:
  (params: CreateAdviceParams) => Promise<AdviceRequest> = async ({
    origin,
    fromId,
    toId
  }) => {
    const request = await prisma.adviceRequest.create({
      data: {
        origin,
        status: "PENDING",
        from: {
          connect: {
            id: fromId
          }
        },
        to: {
          connect: {
            id: toId
          }
        },
      }
    })

    return request;
  }
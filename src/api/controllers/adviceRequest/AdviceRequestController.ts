import { CreateAdviceRequestDTO, CreateAdviceRequestUseCase } from "@api/services/adviceRequest/CreateAdviceRequestService";
import { AdviceRequestOrigin, AdviceRequestOriginType, AdviceRequestStatusType } from "@domain/adviceRequest/entity/AdviceRequest";

interface ApiResponse<TResponseBody> {
  code: number,
  body: TResponseBody
}

interface ErrorResponse {
  message: string
}

interface ApiCreateAdviceRequestBody {
  fromUserId: string,
  toUserId: string,
  origin: AdviceRequestOrigin
}

interface CreateAdviceRequestViewModel {
  id: string
  createdAt: string
  status: AdviceRequestStatusType
  origin: AdviceRequestOriginType
  fromUserId: string
  toUserId: string
}

const SERVICE_ERROR_TO_API_RESPONSE: Record<string, ApiResponse<ErrorResponse>> = {
  INVALID_FIELD: {
    code: 400,
    body: {
      message: 'Invalid field'
    }
  }
}

export class CreateAdviceRequestViewModelMapper {
  public static toViewModel(dto: CreateAdviceRequestDTO): CreateAdviceRequestViewModel {
    return {
      ...dto,
      createdAt: dto.createdAt.toISOString()
    }
  }

  public static toViewModelCollection(dtoCollection: CreateAdviceRequestDTO[]): CreateAdviceRequestViewModel[] {
    return dtoCollection
      .map(dto => CreateAdviceRequestViewModelMapper.toViewModel(dto))
  }
}

export class CreateAdviceRequestController {
  constructor(
    private createAdviceRequestUseCase: CreateAdviceRequestUseCase
  ) {}

  async handle(body: ApiCreateAdviceRequestBody): 
    Promise<ApiResponse<CreateAdviceRequestViewModel | ErrorResponse>> {
    try {
      const created = await this.createAdviceRequestUseCase.execute({
        fromId: body.fromUserId,
        origin: body.origin,
        toId: body.toUserId
      });
  
      const viewModel = CreateAdviceRequestViewModelMapper.toViewModel(created);
  
      return {
        body: viewModel,
        code: 201
      }
    } catch(error) {
      const unknownError = {
        body: { message: 'Unknown error' },
        code: 500
      }

      if(error instanceof Error){
        return SERVICE_ERROR_TO_API_RESPONSE[error.message] || unknownError
      }

      return unknownError
    }
  }
}
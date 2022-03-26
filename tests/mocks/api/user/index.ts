import { ResponseResolver, RestContext, RestRequest } from "msw";
import { patchUserSchema } from "../../../../src/api/schemas/user";

export const patchUserResolver: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  const validation = patchUserSchema.validate(req.body);

  if(validation.error){
    return res(ctx.status(400))
  }

  return res(ctx.json({ ok: true }))
}
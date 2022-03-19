import Joi from "joi";
import { ResponseResolver, RestContext, RestRequest } from "msw";

export const patchUserResolver: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    role: Joi.string().valid('student', 'personal').required()
  })

  const validation = schema.validate(req.body);

  if(validation.error){
    return res(ctx.status(400))
  }

  return res(ctx.json({ ok: true }))
}
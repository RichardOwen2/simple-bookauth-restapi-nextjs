import Joi from "joi";
import InvariantError from "@/errors/InvariantError";

export const validatePostBookPayload = (payload: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePutBookPayload = (payload: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}
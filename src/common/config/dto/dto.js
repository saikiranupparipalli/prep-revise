import Joi from "joi";

class globalDto {
  static schema = Joi.object({});

  static validate(data) {
    const { error, data } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((e) => e.details);
      return { errors, data: null };
    }
    return { error: null, data };
  }
}
export {globalDto}  
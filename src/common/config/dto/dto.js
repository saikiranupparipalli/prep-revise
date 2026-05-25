import Joi from "joi";

class globalDto {
  static schema = Joi.object({});

  static validate(data) {
    const { error, value } = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((e) => e.details);
      return { errors, value: null };
    }
    return { error: null, value };
  }
}
export default globalDto
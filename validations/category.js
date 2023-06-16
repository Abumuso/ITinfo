const Joi = require("joi");

exports.categoryValidations = (data) => {
  const schema = Joi.object({
    category_name: Joi.string()
      .min(2)
      .message("Kategoriya nomi 2ta harfdan kam bo'lmasligi kerak!")
      .max(255)
      .message("Kategoriya nomi 255ta harfdan ko'p bo'lmasligi kerak!")
      .required(),
    parent_category_id: Joi.string().alphanum(),
  });
  return schema.validate(data);
};

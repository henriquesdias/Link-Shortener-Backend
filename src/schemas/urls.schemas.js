import joi from "joi";

const newUrl = joi.object({
  url: joi
    .string()
    .required()
    .trim()
    .pattern(/^https?:\/\/(www\.)?/),
});

const urlsSchema = {
  newUrl,
};

export default urlsSchema;

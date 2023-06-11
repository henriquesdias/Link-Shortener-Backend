import joi from "joi";

const newUrl = joi.object({
  url: joi.string().required().trim(),
});

const urlsSchema = {
  newUrl,
};

export default urlsSchema;

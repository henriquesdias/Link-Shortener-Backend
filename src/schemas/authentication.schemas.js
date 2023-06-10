import joi from "joi";

const signUp = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});

const authenticationSchemas = {
  signUp,
};

export default authenticationSchemas;

const Joi = require("joi");

class userValidation {
  userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),

    lastName: Joi.string().alphanum().min(3).max(10).required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),

    password: Joi.string().min(8).required(),

    repeatPassword: Joi.ref("password"),

    phoneNo: Joi.string().required(),
  });

  loginSchema = Joi.object().keys({

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),

    password: Joi.string().required(),

  });
}

module.exports = new userValidation();

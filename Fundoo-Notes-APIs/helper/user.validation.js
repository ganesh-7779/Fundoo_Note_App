/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
const Joi = require("joi");
class Validation {
  validateSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required()
      .pattern(
        new RegExp(
          "^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)"
        )
      ),

    lastName: Joi.string().min(2).required(),

    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._+!%-]{1,64}|)|\"[a-zA-Z0-9.+! -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$"
        )
      ),

    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required()
  });

  loginSchema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._+!%-]{1,64}|)|\"[a-zA-Z0-9.+! -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$"
        )
      ),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required()
  });

  forgetSchema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._+!%-]{1,64}|)|\"[a-zA-Z0-9.+! -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$"
        )
      )
  });

  resetSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required()
  });

   labelValidation = Joi.object({
     labelName: Joi.string().min(2)
       .required()
   });

   noteValidation = Joi.object({
     title: Joi.string().min(2)
       .required(),
     description: Joi.string().min(2)
       .required()

   });

   getlabelValidation =Joi.object({
     userId: Joi.string().min(24)
       .required(),
     labelID: Joi.string().min(24)
       .required()
   });

   getNoteValidation =Joi.object({
     userId: Joi.string().min(24)
       .required(),
     noteID: Joi.string().min(24)
       .required()
   });

   shareNote =Joi.object({
     collabUI: Joi.string().min(20)
       .required()
   });

   deleteLabelValidation =Joi.object({
     labelId: Joi.string().min(24)
       .required(),
     noteID: Joi.string().min(20)
       .required()
   });
}

module.exports = new Validation();

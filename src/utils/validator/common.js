const joi = require("joi");
const { JoiPasswordComplexity } = require("joi-password");

// Password
const { enterpriseAuthentication } = require("../../../config/index");
const { minUpperCase, minLowerCase, minSpecialCharacters, minNumeric, minCharacters, maxCharacters } = enterpriseAuthentication;

module.exports = {
    id: joi.string().required(),
    password: JoiPasswordComplexity.string().min(minCharacters).max(maxCharacters).minOfUppercase(minUpperCase).minOfLowercase(minLowerCase).minOfSpecialCharacters(minSpecialCharacters).minOfNumeric(minNumeric).required(),
}
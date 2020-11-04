import { secondHelpers } from "./second-helpers.js";

const { luhnAlgorithm } = secondHelpers();

const regex = {
  alpha: /[a-z]+/i,

  numeric: /\d+/,

  alphanumeric: /[a-z0-9]+/i,

  phone: /\+7\d{10}/,

  date: /\d{2}.\d{2}.\d{4}/,

  time: /\d{2}:\d{2}-\d{2}:\d{2}/,

  // min 8 chars, one letter, one number
  pwd1: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

  // min 8 chars, one letter, one number, one special char
  pwd2: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}/,

  // 8-12 chars, one upper letter, one lower letter, one number, one special char
  pwd3: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&-_]{8,12}/,

  email1: /\S+@\S+\.\S+/,

  email2: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

  // without protocol
  url1: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,

  // with protocol
  url2: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
};

export const validator = (value, errors = []) => {
  const notEmpty = () => {
    !value.trim() && errors.push("Field can't be empty.");

    return validator(value, errors);
  };

  const isAlpha = () => {
    !regex.alpha.test(value) &&
      errors.push("Field must contain only letters.");

    return validator(value, errors);
  };

  const isNumeric = () => {
    !regex.numeric.test(value) &&
      errors.push("Field must contain only digits.");

    return validator(value, errors);
  };

  const isEqual = (len) => {
    !(String(value).length === len) &&
      errors.push(`Field value length must be equal to ${len}.`);

    return validator(value, errors);
  };

  const inRange = (min, max) => {
    (value < min || value > max) &&
      errors.push(
        `Field value must be in range from ${min} to ${max}.`
      );

    return validator(value, errors);
  };

  const isPhone = () => {
    !regex.phone.test(value) &&
      errors.push("Wrong phone number.");

    return validator(value, errors);
  };

  const isPassword = (pattern) => {
    !regex[pattern].test(value) &&
      errors.push("Wrong password.");

    return validator(value, errors);
  };

  const isEmail = (pattern) => {
    !regex[pattern].test(value) &&
      errors.push("Wrong email.");

    return validator(value, errors);
  };

  const isUrl = (pattern) => {
    !regex[pattern].test(value) &&
      errors.push("Wrong URL.");

    return validator(value, errors);
  };

  const isCard = () => {
    !luhnAlgorithm(value) &&
      errors.push("Wrong credit card number.");

    return validator(value, errors);
  };

  return {
    notEmpty,
    isAlpha,
    isNumeric,
    isEqual,
    inRange,
    isPhone,
    isPassword,
    isEmail,
    isUrl,
    isCard,
    errors,
  };
};

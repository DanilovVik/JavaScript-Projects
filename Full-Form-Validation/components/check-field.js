import { validator } from "./validator.js";
import { secondHelpers } from "./second-helpers.js";

const { showErrors, formatDate, formatTime } = secondHelpers();

export const checkField = () => {
  // name
  const checkName = (value) => {
    const { errors } = validator(value).notEmpty().isAlpha();

    errors.length
      ? showErrors(errors)
      : (userData.name = `${value[0].toUpperCase()}${value
          .slice(1)
          .toLowerCase()}`);
  };

  // age
  const checkAge = (value) => {
    const { errors } = validator(value).notEmpty().isNumeric().inRange(18, 100);

    errors.length ? showErrors(errors) : (userData.age = String(value));
  };

  // phone
  const checkPhone = (value) => {
    const { errors } = validator(value).notEmpty().isEqual(12).isPhone();

    errors.length ? showErrors(errors) : (userData.phone = value);
  };

  // password
  const checkPassword = (value) => {
    const { errors } = validator(value).notEmpty().isPassword("pwd3");

    errors.length ? showErrors(errors) : (userData.password = value);
  };

  // email
  const checkEmail = (value) => {
    const { errors } = validator(value).notEmpty().isEmail("email2");

    errors.length ? showErrors(errors) : (userData.email = value);
  };

  // url
  const checkUrl = (value) => {
    const { errors } = validator(value).notEmpty().isUrl("url2");

    errors.length ? showErrors(errors) : (userData.url = value);
  };

  // card
  const checkCard = (value) => {
    const { errors } = validator(value).notEmpty().isEqual(16).isCard();

    errors.length ? showErrors(errors) : (userData.card = value);
  };

  // date
  const checkDate = (value) => (userData.date = formatDate(value, "ru"));

  // time
  const checkTime = (value) => (userData.time = `${formatTime(value)}-${formatTime(Number(value) + 2)}`);

  return {
    checkName,
    checkAge,
    checkPhone,
    checkPassword,
    checkEmail,
    checkUrl,
    checkCard,
    checkDate,
    checkTime,
  };
};

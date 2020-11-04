import { mainHelpers } from "../components/main-helpers.js";
import { checkField } from "../components/check-field.js";
import { filterField } from "../components/filter-field.js";

window.form = document.querySelector("form");
window.userData = {};

const {
  setMinAndMaxDates,
  changeTimeTooltip,
  checkUserData,
  sendUserData,
  setDummyData,
} = mainHelpers();

const {
  checkName,
  checkAge,
  checkPhone,
  checkPassword,
  checkEmail,
  checkUrl,
  checkCard,
  checkDate,
  checkTime,
} = checkField();

const {
  filterName,
  filterAge,
  filterPhone,
  filterCard
} = filterField();

const mainSetup = () => {
  form.addEventListener("keypress", (e) => {
    if (e.target.tagName !== "INPUT") return;

    const type = e.target.id;

    switch (type) {
      case "name":
        filterName(e);
        break;
      case "age":
        filterAge(e);
        break;
      case "phone":
        filterPhone(e);
        break;
      case "card":
        filterCard(e);
        break;
    }
  })

  form.addEventListener("change", (e) => {
    if (e.target.tagName !== "INPUT") return;

    const type = e.target.id;
    const value = e.target.value.trim().replace(/\s+/g, "");

    switch (type) {
      case "name":
        checkName(value);
        break;
      case "age":
        checkAge(value);
        break;
      case "phone":
        checkPhone(value);
        break;
      case "password":
        checkPassword(value);
        break;
      case "email":
        checkEmail(value);
        break;
      case "url":
        checkUrl(value);
        break;
      case "card":
        checkCard(value);
        break;
      case "date":
        checkDate(value);
        break;
      case "time":
        checkTime(value);
        break;
    }

    console.log(userData);
    checkUserData(userData);
  })

  form.addEventListener("submit", (e) => e.preventDefault())
  send.addEventListener("click", () => sendUserData(userData))

  secondSetup()
}

const secondSetup = () => {
  time.addEventListener("input", (e) => changeTimeTooltip(e.target.value))

  set.addEventListener("click", setDummyData)

  setMinAndMaxDates()
}

mainSetup()
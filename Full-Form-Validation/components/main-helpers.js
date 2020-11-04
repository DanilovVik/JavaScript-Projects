import { secondHelpers } from "./second-helpers.js";

const { showErrors, showSuccess, formatDate, formatTime } = secondHelpers();

export const mainHelpers = () => {
  // setup dates
  const setMinAndMaxDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const afterWeek = new Date();
    afterWeek.setDate(afterWeek.getDate() + 8);

    date.setAttribute("min", formatDate(tomorrow, "en"));
    date.setAttribute("max", formatDate(afterWeek, "en"));
  };

  // change time tooltip
  const changeTimeTooltip = (value) => {
    const firstValue = value;
    const secondValue = Number(firstValue) + 2;

    const timeValue = `${formatTime(firstValue)}-${formatTime(secondValue)}`;

    tooltip.textContent = timeValue;
  };

  // check user data
  const checkUserData = (data) => {
    if (
      Object.keys(data).length === 9 &&
      Object.values(data).every((item) => !!item.trim() === true)
    ) {
      send.disabled = false;
    }
  };

  // send user data
  const sendUserData = async (data) => {
    send.disabled = true;

    const response = await fetch(
      "https://form-validation-server.herokuapp.com/server",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (typeof result === "string") {
      showSuccess(result);

      send.disabled = false;
    } else {
      showErrors(result);
    }
  };

  // set dummy data
  const setDummyData = () => {
    const inputs = form.querySelectorAll("input");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const values = [
      "Igor",
      "30",
      "+79876543210",
      "p@s$W0r6",
      "email@example.com",
      "https://whatever.org",
      "2222111111111111",
      formatDate(tomorrow, "en"),
      "10",
    ];

    inputs.forEach((input, index) => (input.value = values[index]));

    userData = {
      name: "Igor",
      age: "30",
      phone: "+79876543210",
      password: "p@s$W0r6",
      email: "email@example.com",
      url: "https://whatever.org",
      card: "2222111111111111",
      date: formatDate(tomorrow, "ru"),
      time: "10:00-12:00",
    };

    console.log(userData);
    checkUserData(userData);
  };

  return {
    setMinAndMaxDates,
    changeTimeTooltip,
    checkUserData,
    sendUserData,
    setDummyData,
  };
};

export const secondHelpers = () => {
  // show errors
  const showErrors = (errors) => {
    const template = `
		<div class="alert alert-danger">
			${errors.reduce((html, error) => (html += `<span>${error}</span><br>`), "")}
		</div>
		`;

    form.insertAdjacentHTML("beforeend", template);

    const timer = setTimeout(() => {
      form.querySelector(".alert").remove();
      clearTimeout(timer);
    }, 3000);
  };

  // show success
  const showSuccess = (value) => {
    const template = `
		<div class="alert alert-success">
			<span>${value}</span>
		</div>
		`;

    form.insertAdjacentHTML("beforeend", template);

    const timer = setTimeout(() => {
      form.querySelector(".alert").remove();
      clearTimeout(timer);
    }, 3000);
  };

  // check card
  const luhnAlgorithm = (value) => {
    let len = value.length;
    let sum = 0;

    for (let num of value) {
      num = +num;

      if (len % 2 === 0) {
        num *= 2;

        if (num > 9) {
          num -= 9;
        }
      }

      sum += +num;
      len--;
    }

    return sum % 10 === 0;
  };

  // format date
  const formatDate = (date, lang) => {
    if (lang === "en") {
      const regex = /(?<day>[0-9]{2}).(?<month>[0-9]{2}).(?<year>[0-9]{4})/;
      date = date
        .toLocaleDateString()
        .replace(regex, "$<year>-$<month>-$<day>");
    } else {
      const regex = /(?<year>[0-9]{4})-(?<month>[0-9]{2}).(?<day>[0-9]{2})/;
      date = date
        .toLocaleDateString()
        .replace(regex, "$<day>.$<month>.$<year>");
    }

    return date;
  };

  // format time
  const formatTime = (value) => {
    value = Number(value).toFixed(2).replace(/\./, ":").replace(/50/, "30");

    return value;
  };

  return {
    showErrors,
    showSuccess,
    luhnAlgorithm,
    formatDate,
    formatTime,
  };
};

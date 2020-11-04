export const filterField = () => {
  // name
  const filterName = (e) => {
    const regex = /[a-z]/i;
    if (!regex.test(e.key) || e.target.value.length > 9) {
      e.preventDefault();
    }
  };

  // age
  const filterAge = (e) => {
    const regex = /\d/;
    if (!regex.test(e.key) || e.target.value.length > 2) {
      e.preventDefault();
    }
  };

  // phone
  const filterPhone = (e) => {
    const regex = /[+\d]/;
    if (!regex.test(e.key) || e.target.value.length > 11) {
      e.preventDefault();
    }
  };

  // card
  const filterCard = (e) => {
    const regex = /\d/;
    if (!regex.test(e.key) || e.target.value.length > 15) {
      e.preventDefault();
    }
  };

  return {
    filterName,
    filterAge,
    filterPhone,
    filterCard,
  };
};

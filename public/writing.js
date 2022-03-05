const writingFrom = document.querySelector("#writing_form");
const textInput = document.querySelector("#writing_text");
const dateInput = document.querySelector("#writing_date");

const getToday = () => {
  // 오늘 날짜
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();
  let hours = today.getHours();

  if (hours < 3) {
    date = date - 1;
  }

  return `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;
};

const submitHappiness = (e) => {
  e.preventDefault();
  console.log("submit");
  const text = textInput.value;
  const date = dateInput.value;
};
writingFrom.addEventListener("submit", (e) => submitHappiness(e));

const init = () => {
  // 날짜 설정
  const today = getToday();
  dateInput.value = today;
  dateInput.max = today;
};
init();

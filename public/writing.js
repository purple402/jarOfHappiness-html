import { createHappiness, checkCurrentUser } from "./firebase.js";

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

const submitHappiness = async (e) => {
  e.preventDefault();
  let text = textInput.value;
  text = text.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  const date = dateInput.value;
  await createHappiness({ text, date });
  window.location.href = "./index.html";
};
writingFrom.addEventListener("submit", (e) => submitHappiness(e));

const init = () => {
  // 날짜 설정
  const today = getToday();
  dateInput.value = today;
  dateInput.max = today;
  dateInput.min = `${today.substring(0, 4)}-01-01`;
};
init();

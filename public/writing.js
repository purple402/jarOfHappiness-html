const dateInput = document.querySelector("#writing_date");
const init = () => {
  // 날짜 설정
  const today = getToday();
  dateInput.value = today;
  dateInput.max = today;
};
init();

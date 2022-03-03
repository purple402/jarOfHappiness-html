import {
  signIn,
  signUp,
  checkCurrentUser,
  signOutAccount,
} from "./firebase.js";

const body = document.querySelector("body");
const message = document.querySelector("#message");
const loginDiv = document.querySelector("#login_div");
const loginForm = document.querySelector("#login_form");
const joinForm = document.querySelector("#join_form");
const modal = document.querySelector(".modal");
const btnOpenPopup = document.querySelector(".btn-open-popup");

// log-in
const logIn = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const user = await signIn(userId, userPassword);
  console.log("index logIn", user);
  checkUserState();
};
loginForm.addEventListener("submit", (e) => logIn(e));

// sign-up
const createAccount = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const userName = e.target[2].value;
  console.log(userId, userPassword, userName);
  const user = await signUp(userId, userPassword, userName);
  console.log("index signUp", user);
  checkUserState();
};
joinForm.addEventListener("submit", (e) => createAccount(e));

// sign-up modal
btnOpenPopup.addEventListener("click", (e) => {
  modal.classList.toggle("show");
  if (modal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.toggle("show");
  }
  if (!modal.classList.contains("show")) {
    body.style.overflow = "auto";
  }
});

const logOut = async () => {
  signOutAccount();
  loginDiv.style.display = "block";
  loginDiv.querySelectorAll("input").forEach((input) => (input.value = ""));
};

const checkUserState = async () => {
  const user = await checkCurrentUser();
  const userName = user?.displayName;
  if (user) {
    loginDiv.style.display = "none";
    const greeting = document.createElement("p");
    greeting.innerHTML = `안녕하세요, ${userName}님! 오늘의 행복을 기록해 봐요!`;
    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "LOG-OUT";
    logoutBtn.addEventListener("click", (e) => {
      logOut();
      message.removeChild(greeting);
      message.removeChild(logoutBtn);
    });
    message.appendChild(greeting);
    message.appendChild(logoutBtn);
  }
};

const init = () => {
  checkUserState();
};
init();

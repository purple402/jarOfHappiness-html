import {
  signIn,
  signUp,
} from "./firebase.js";

const body = document.querySelector("body");
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


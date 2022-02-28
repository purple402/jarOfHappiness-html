const title = document.querySelector("h1");

title.style.color = "crimson";

import { signIn } from "./firebase.js";

const loginForm = document.querySelector("form");

const submit = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  signIn(userId, userPassword).then((user) => {
    console.log("index", user)
  });
  
};
loginForm.addEventListener("submit", (e) => submit(e));

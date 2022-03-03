import {
  signIn,
} from "./firebase.js";

const loginDiv = document.querySelector("#login_div");

// log-in
const logIn = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const user = await signIn(userId, userPassword);
  console.log("index logIn", user);
};
loginForm.addEventListener("submit", (e) => logIn(e));

  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
};

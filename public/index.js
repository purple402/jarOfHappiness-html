import {
  signIn,
  signUp,
  checkCurrentUser,
  LogOut,
  createUserDoc,
  initFirebase
} from "./firebase.js";
import { displayBottle, hideBottle } from "./data.js";

const body = document.querySelector("body");
const message = document.querySelector("#message");
const btnDiv = document.querySelector("#select_btn");
const loginForm = document.querySelector("#login_form");
const joinForm = document.querySelector("#join_form");
const modal = document.querySelectorAll(".modal");
const loginModal = document.querySelector("#login_div");
const signupModal = document.querySelector("#signup_div");
const loginOpenBtn = document.querySelector("#btn_open_login_popup");
const signupOpenBtn = document.querySelector("#btn_open_signup_popup");
const userInfo = document.querySelector("#userInfo");

loginForm.addEventListener("submit", (e) => logInAccount(e));
joinForm.addEventListener("submit", (e) => createAccount(e));

// modal
loginOpenBtn.addEventListener("click", (e) => {
  loginModal.classList.toggle("show");
  if (loginModal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
});
signupOpenBtn.addEventListener("click", (e) => {
  signupModal.classList.toggle("show");
  if (signupModal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
});
modal.forEach((modal) =>
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.toggle("show");
    }
    if (!modal.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  })
);
// 로그인
const logInAccount = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const user = await signIn(userId, userPassword);
  loginModal.classList.remove("show");
  checkUserState(user);
};

// 회원가입
const createAccount = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const userName = e.target[2].value;
  console.log(userId, userPassword, userName);
  const user = await signUp(userId, userPassword, userName);
  checkUserState(user);
  await createUserDoc(user);
  signupModal.classList.remove("show");
};

// 로그아웃
const logOutAccount = async () => {
  LogOut();
  console.log("logOutAccount");
  btnDiv.style.display = "block";
  loginForm.querySelectorAll("input").forEach((input) => (input.value = ""));
  checkUserState(null);
  hideBottle();
};

// 로그인 되어있는 계정 확인
const checkUserState = (user) => {
  const userName = user?.displayName;
  if (user) {
    btnDiv.style.display = "none";
    const greeting = document.createElement("p");
    greeting.innerHTML = `안녕하세요, ${userName}님! 오늘의 행복을 기록해 봐요!`;

    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "로그아웃";
    logoutBtn.addEventListener("click", (e) => {
      logOutAccount();
      userInfo.removeChild(greeting);
      userInfo.removeChild(logoutBtn);
      userInfo.removeChild(writingBtn);
    });

    const writingBtn = document.createElement("button");
    writingBtn.innerHTML = "작성";
    writingBtn.addEventListener("click", (e) => {
      window.location.href = "./writing.html";
      console.log("WritingBtn");
    });
    userInfo.appendChild(greeting);
    userInfo.appendChild(writingBtn);
    userInfo.appendChild(logoutBtn);
    // user 있으면 저장된 것들 불러오기
    displayBottle();
  } else {
    console.log("로그인된 계정 없음");
  }
};

const init = async () => {
  // const user = checkCurrentUser();
  initFirebase();
};
init();

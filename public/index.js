import {
  signIn,
  signUp,
  checkCurrentUser,
  LogOut,
  createUserDoc,
  initFirebase,
} from "./firebase.js";

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
};

// 로그인 되어있는 계정 확인
const checkUserState = (user) => {
  const userName = user?.displayName;
  if (user) {
    btnDiv.style.display = "none";
    const greeting = document.createElement("p");
    greeting.innerHTML = `안녕하세요, ${userName}님! 오늘의 행복을 기록해 봐요!`;

    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "LOG-OUT";
    logoutBtn.addEventListener("click", (e) => {
      logOutAccount();
      message.removeChild(greeting);
      message.removeChild(logoutBtn);
      message.removeChild(writingBtn);
    });

    const writingBtn = document.createElement("button");
    writingBtn.innerHTML = "WRITING";
    writingBtn.addEventListener("click", (e) => {
      window.location.href = "./writing.html";
      console.log("WritingBtn");
    });
    message.appendChild(greeting);
    message.appendChild(logoutBtn);
    message.appendChild(writingBtn);
    // user 있으면 저장된 것들 불러오기
  } else {
    console.log("logout");
  }
};

const init = async () => {
  // 로그인한 아이디가 안불러와짐
  const user = checkCurrentUser();
  checkUserState(user);
};
init();

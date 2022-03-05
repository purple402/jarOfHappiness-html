import {
  signIn,
  signUp,
  checkCurrentUser,
  LogOut,
  createUserDoc,
} from "./firebase.js";

const body = document.querySelector("body");
const message = document.querySelector("#message");
const loginDiv = document.querySelector("#login_div");
const loginForm = document.querySelector("#login_form");
const joinForm = document.querySelector("#join_form");
const modal = document.querySelector(".modal");
const btnOpenPopup = document.querySelector(".btn-open-popup");

// 로그인
const logInAccount = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const user = await signIn(userId, userPassword);
  checkUserState();
};
loginForm.addEventListener("submit", (e) => logInAccount(e));

// 회원가입
const createAccount = async (e) => {
  e.preventDefault();
  const userId = e.target[0].value;
  const userPassword = e.target[1].value;
  const userName = e.target[2].value;
  console.log(userId, userPassword, userName);
  const user = await signUp(userId, userPassword, userName);
  checkUserState();
  await createUserDoc(user);
};
joinForm.addEventListener("submit", (e) => createAccount(e));

// 회원가입 modal
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

// 로그아웃
const logOutAccount = async () => {
  LogOut();
  loginDiv.style.display = "block";
  loginDiv.querySelectorAll("input").forEach((input) => (input.value = ""));
};

// 로그인 되어있는 계정 확인
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
      logOutAccount();
      message.removeChild(greeting);
      message.removeChild(logoutBtn);
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
  }
};

const init = () => {
  checkUserState();
};
init();

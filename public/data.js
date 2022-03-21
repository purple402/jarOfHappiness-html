const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.strokeRect(0, 0, 300, 350);

canvas.addEventListener("click", (e) => console.log(e.offsetX, e.offsetY));

ctx.beginPath();
ctx.moveTo(100, 35);
ctx.lineTo(200, 35);
ctx.lineTo(200, 50); //185
ctx.lineTo(195, 50); //180
ctx.lineTo(195, 60); //180
ctx.quadraticCurveTo(250, 60, 250, 105);
ctx.lineTo(250, 310);
ctx.quadraticCurveTo(250, 325, 180, 325);
ctx.lineTo(120, 325);
ctx.quadraticCurveTo(50, 325, 50, 305);
ctx.lineTo(50, 105);
ctx.quadraticCurveTo(50, 60, 105, 60);
ctx.lineTo(105, 50);

ctx.lineTo(100, 50);
ctx.closePath();
ctx.stroke();
ctx.clip();

// 캔버스에 그림그리기
canvas.addEventListener("mousemove", function (e) {
  mouseMove(e);
});
canvas.addEventListener("mousedown", function (e) {
  mouseDown(e);
});
canvas.addEventListener("mouseup", function (e) {
  mouseUp(e);
});
canvas.addEventListener("mouseout", function (e) {
  mouseOut(e);
});

let startX = 0;
let startY = 0;
let drawing = false;
ctx.lineWidth = 4;
ctx.strokeStyle = "blue";
function draw(curX, curY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(curX, curY);
  ctx.stroke();
}
function mouseDown(e) {
  startX = e.offsetX;
  startY = e.offsetY;
  drawing = true;
}

function mouseMove(e) {
  if (!drawing) return;
  let curX = e.offsetX;
  let curY = e.offsetY;
  draw(curX, curY);
  startX = curX;
  startY = curY;
}
function mouseUp(e) {
  drawing = false;
}

function mouseOut(e) {
  drawing = false;
}

// 공 만들기
const createBall = (n) => {
  for (let i = 0; i < n; i++) {
    const coordX = Math.random() * (240 - 60) + 60;
    const coordY = Math.random() * (300 - 65) + 65;
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    ctx.beginPath();
    ctx.arc(coordX, coordY, 20, 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
};
createBall(3);

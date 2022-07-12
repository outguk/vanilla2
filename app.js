const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const jscolor = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const jsDelete = document.getElementById("jsDelete");
const eraser = document.getElementById("jsEraser");
// canvas는 HTML 요소로 그 안의 픽셀들을 다룰 수 있다.

const BASIC_COLOR = "black";
const CANVAS_SIZE = "500";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// css 상 사이즈가 아닌 픽셀사이즈를 JS에서 줘야 stroke가 적용

ctx.strokeStyle = BASIC_COLOR;
ctx.lineWidth = 2;
// stroke 는 라인을 위한 것

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// 저장시 배경이 투명으로 되는 것을 방지하기 위해 미리 설정
ctx.fillStyle = BASIC_COLOR;

let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
// event 에서 offsetx,y 가 지정한 범위안에서의 좌표 (필요한 정보)
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function canvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleMenu(event) {
  event.preventDefault();
  // 우클릭 방지
}

function handleSave() {
  const img = canvas.toDataURL();
  // 이미지 저장 canvas HTML API 참고
  const link = document.createElement("a");
  // link = a 태그
  link.href = img; // href는 URL
  link.download = "PaintJS"; // download는 이름
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", handleMenu);
}
// mousemove 는 커서를 올려 놓았을 때
// mousedown 은 클릭 했을 때
// mouseup 은 클릭을 땠을 때

function changeColor(event) {
  const bcolor = event.target.style.backgroundColor;
  ctx.strokeStyle = bcolor;
  ctx.fillStyle = bcolor;
}

function rangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function modeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleDelete(event) {
  alert("Really Reset?");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleEraser() {
  ctx.strokeStyle = "white";
}

Array.from(jscolor).forEach((trans) =>
  trans.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", rangeChange);
}
// range 이벤트는 input에 반응?(이해)

if (mode) {
  mode.addEventListener("click", modeChange);
}

if (save) {
  save.addEventListener("click", handleSave);
}

if (jsDelete) {
  jsDelete.addEventListener("click", handleDelete);
}

if (eraser) {
  eraser.addEventListener("mousemove", onMouseMove);
  eraser.addEventListener("mousedown", startPainting);
  eraser.addEventListener("mouseup", stopPainting);
  eraser.addEventListener("mouseleave", stopPainting);
  eraser.addEventListener("click", handleEraser);
  range.addEventListener("input", rangeChange);
}

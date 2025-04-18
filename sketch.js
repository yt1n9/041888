let input;
let slider;
let button;
let dropdown;
let iframe;
let bouncing = false;

function setup() {//這是一個設定函數，只會執行一次
  //產生一個畫布，充滿整個瀏覽器視窗，背景顏色為ffc8dd
  createCanvas(windowWidth, windowHeight);
  background("#ffc8dd");
  //createCanvas(400, 400);
  input = createInput();
  input.position(10, 10);
  input.size(300, 80);

  slider = createSlider(12, 30, 12);
  slider.position(320, 10);
  slider.size(100);

  button = createButton('跳動');
  button.position(430, 10);
  button.mousePressed(toggleBounce);

  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(openLink);

  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 120);
}

function draw() {//這是一個繪圖函數，會一直執行
  background("#ffc8dd");
  let textContent = input.value();
  let textSizeValue = slider.value();
  let textWidthValue = textWidth(textContent + " ");
  let x = 0;
  let y = 100;

  textSize(textSizeValue);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textFont("Georgia");

  while (y < height) {
    x = 0;
    let bounceOffset = bouncing ? sin(frameCount * 0.1 + y) * 5 : 0;
    while (x < width) {
      text(textContent, x, y + bounceOffset);
      x += textWidthValue;
    }
    y += textAscent() + textDescent();
  }
}

function toggleBounce() {
  bouncing = !bouncing;
}

function openLink() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 120);
}

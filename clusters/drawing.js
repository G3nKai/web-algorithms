var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const color = 'red';

var pointSize = 5;//размер точки

function drawPoint(x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, pointSize, pointSize);
    points.push([x, y]);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);   
    points = [];
}

canvas.addEventListener('click', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    drawPoint(x, y, color, pointSize);
});

var kk = document.getElementById("k");//кластеры
var selectedValue = document.getElementById("selectedValue");

var k = kk.value;
selectedValue.textContent = k;

kk.addEventListener("input", function() {
    // Обновление значения переменной и его отображение на странице
    k = this.value;
    selectedValue.textContent = k;
});
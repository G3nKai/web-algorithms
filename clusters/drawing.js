var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const color = 'red';

var pointSize = 5;//размер точки


var points = [];//координаты ОТМЕЧЕННЫХ точек
const colours = ['#FFC0CB', 'blue', 'brown', '#FFD700',
'green', 'black', '#FF69B4', 'gray',
'purple', '#FFA07A', 'yellow', 'orange', 
'#C71585', '#BDB76B', '#6A5ACD', '#808000'];

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



const selector = document.getElementById('start');
const kmeansDiv = document.getElementById('jerachAndkmeans');
const jerarchDiv = document.getElementById('jerachAndkmeans');
const dbscanDiv = document.getElementById('dbscam');

selector.addEventListener('change', function() {
    const selectedOption = selector.value;
    
    // Скрыть все div строки
    kmeansDiv.style.display = 'none';
    jerarchDiv.style.display = 'none';
    dbscanDiv.style.display = 'none';

    // Показать только выбранный div строку
    switch (selectedOption) {
        case 'kmeans':
            kmeansDiv.style.display = 'block';
            break;
        case 'jerarch':
            jerarchDiv.style.display = 'block';
            break;
        case 'DBSCANs':
            dbscanDiv.style.display = 'block';
            break;
        default:
            kmeansDiv.style.display = 'block';
            break;
    }
});

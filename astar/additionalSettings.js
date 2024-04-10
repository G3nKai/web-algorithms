let size = document.getElementById("gridSizeText").textContent;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomNumber(from, to)
{
    return from + Math.floor(Math.random() * (to - from));
}

document.querySelector('#getInfoColors').onclick = function() {
    alert("Информация о цветах:\n" +
        "Зеленый - стартовая позиция.\n" +
        "Красный - конечная позиция.\n" +
        "Оранжевый - найденный путь.\n" + 
        "Чёрный - стена.\n" + 
        "Белый - пустая клетка.\n" +
        "Синий - проверенный путь.\n" +
        "Желтый - точка рассматривается, но ещё не проверена." );
}

document.querySelector('#getInfoAlgo').onclick = function() {
    alert("A* — это модификация алгоритма Дейкстры, оптимизированная для единственной конечной точки. Алгоритм Дейкстры может находить пути ко всем точкам, A* находит путь к одной точке. Он отдаёт приоритет путям, которые ведут ближе к цели.");
}

function changeCellType() {
    if (this.className === "startPoint" || this.className === "endPoint") {
        alert("Выберете другую точку!");
        return;
    }
    else if (document.getElementById("selectorCellType").style.pointerEvents === "none") {
        return;
    }

    var selectedElement = document.getElementById("selectorCellType").value;
    if (selectedElement !== "wall") {
        document.getElementsByClassName(selectedElement).item(0).className = "blankCell";
        this.className = selectedElement;
    }
    else if (selectedElement === "wall" && this.className ==="wall") {
        this.className = "blankCell";
    }
    else {
        this.className = "wall";
    }
}
  
function changeAccesebility(action, amount) {
    if (action === "enable") {
        document.getElementById("findPathButton").hidden = "";
        document.getElementById("generateLabirynth").hidden = "";
        document.getElementById("selectorCellType").style.pointerEvents = "all";
        if (amount === "all") {
            document.getElementById("gridSizeSlider").style.pointerEvents = "all";
        }
    }
    else if (action === "disable") {
        document.getElementById("findPathButton").hidden = "hidden";
        document.getElementById("generateLabirynth").hidden = "hidden";
        document.getElementById("selectorCellType").style.pointerEvents = "none";
        if (amount === "all") {
            document.getElementById("gridSizeSlider").style.pointerEvents = "none";
        }
    }
}
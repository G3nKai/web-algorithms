function clearLabirynth() {
    let line = document.getElementsByClassName("lineOfTable");
    for (let i = 0; i < line.length; ) {
        line.item(i).remove();
    }
}

function createLabyrinth() {
    clearLabirynth();
    let beginningLabyrinth = document.getElementById("toolbar").getBoundingClientRect().right;

    size = document.getElementById("gridSizeText").textContent;

    for (let i = 0; i < size; ++i) {
        let line = document.createElement('div');
        line.className = "lineOfTable";

        for (let j = 0; j < size; ++j) {
            let cage = document.createElement('span');
            cage.id = "cell." + i + "." + j;

            cage.style.top = 200 + 25 * (i + 1) + 'px';
            cage.style.left = beginningLabyrinth + 25 * (j + 1) + 'px';

            cage.className = "blankCell";
            cage.setAttribute("square", i * size + j); // позиция ячейки в одномерном представлении
            line.appendChild(cage);
            cage.onclick = changeCellType;
        }
        document.body.append(line);
    }

    document.getElementById("cell." + (size - 1) + "." + (size - 1)).className = "endPoint";
    document.getElementById("cell.0.0").className = "startPoint";

    changeAccesebility("enable");
}

document.querySelector("#gridSizeSlider").addEventListener("input", (event) => {
    document.querySelector("#gridSizeText").textContent = event.target.value;
    createLabyrinth();
});

createLabyrinth();

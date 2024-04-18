function createMatrix () {
    let matrix = new Array(size);
    for (let i = 0; i < size; i++){
        matrix[i] = new Array(size);

        for (let j = 0; j < size; j++){
            matrix[i][j] = {f: Infinity, g: Infinity, parent: null}; //f - суммарная оценка стоимости прохождения через клетку
        }                                                            //g - расстояние от начальной ячейки до этой ячейки по самому дешевому пути
    }                                                                //ссылка на родительскую ячейку
    return matrix;
}

function searchOptimalPoint(matrix, queue){ //выбор точки с наименьшим значением f
    let mostOptimalPoint = queue[0];
    let mostOptimalPointIndex = 0;
    for (let i = 0; i < queue.length; i++){
        if (matrix[parseInt(queue[i]/size)][queue[i]%size].f < matrix[parseInt(mostOptimalPoint/size)][mostOptimalPoint%size].f){
            mostOptimalPoint = queue[i];
            mostOptimalPointIndex = i;
        }
    }
    let result = {index: mostOptimalPoint, queuePosition:mostOptimalPointIndex};
    return result;
}

function elementInQueue(queue, value) { //проверка содержится ли элемент в очереди
    let result = false;
    for (let i = 0; i < queue.length; i++){
        if (value === queue[i]){
            result = true;
            break;
        }
    }
    return result;
}

//используем манхэттенское расстояние, потому что можем двигаться в четырёх направлениях
function manhattanDistance (start, finish){ //сумма модулей разностей координат
    let s1 = Math.abs(parseInt(finish.getAttribute("square")/size) - parseInt(start.getAttribute("square")/size));
    let s2 = Math.abs((finish.getAttribute("square")%size) - (start.getAttribute("square")%size));
    let sum = s1 + s2;
    return sum;
}

function findNeighboursOfPoint(point){ //находит соседей точки
    let index = point.getAttribute("square");
    let x = index%size;
    let y = parseInt(index/size);
    let result = [];
    let directions = [x-1, x+1, y-1, y+1];
    let directionsPoints = ["cell." + y + "." + (x-1), "cell." + y + "." + (x+1), "cell." + (y-1) + "." + x, "cell." + (y+1) + "." + x];
    for (let i = 0; i < directions.length; i++){
        if (directions[i] >= 0 && directions[i] < size && document.getElementById(directionsPoints[i]).className !== "wall"){
            result.push(document.getElementById(directionsPoints[i]));
        }
    }
    return result; 
}

document.querySelector("#findPathButton").onclick = async function(){
    changeAccesebility("disable");

    let startPoint = document.getElementsByClassName("startPoint").item(0);
    let finishPoint = document.getElementsByClassName("endPoint").item(0);

    let matrix = createMatrix();
    let startingPosition = startPoint.getAttribute("square");
    
    matrix[parseInt(startingPosition/size)][startingPosition%size].f = manhattanDistance(startPoint, finishPoint);
    matrix[parseInt(startingPosition/size)][startingPosition%size].g = 0; //т.к.это начальная точка

    let queue = [];
    queue.push(startingPosition);
    while (queue.length > 0){
        bestPoint = searchOptimalPoint(matrix, queue);
        let bestIndex = bestPoint.index;
        let positionInQueue = bestPoint.queuePosition;

        let currMatrixPoint = document.getElementById("cell." + parseInt(bestIndex/size) + "." + (bestIndex%size));
        if (currMatrixPoint === finishPoint){
            changeAccesebility("enable");

            let matrixPoint = matrix[parseInt(bestIndex/size)][bestIndex%size].parent.getAttribute("square");
            while (matrix[parseInt(matrixPoint/size)][matrixPoint%size].parent !== null){
                document.getElementById("cell."+(parseInt(matrixPoint/size)+"."+(matrixPoint%size))).className = "theWay";
                await sleep(10);
                matrixPoint = matrix[parseInt(matrixPoint/size)][matrixPoint%size].parent.getAttribute("square");
            }
            alert("Путь найден. Работа алгоритма завершена");
            return;
        }

        queue.splice(positionInQueue, 1);
        
        let currNeighbours = findNeighboursOfPoint(currMatrixPoint);
        for (let i = 0; i < currNeighbours.length; i++){
            let neighbourInd = currNeighbours[i].getAttribute("square");
            let temporaryAssessment = matrix[parseInt(bestIndex/size)][bestIndex%size].g + 1; 
            if (temporaryAssessment < matrix[parseInt(neighbourInd/size)][neighbourInd%size].g){ //временная оценка < стоимомти пути до соседней точки
                matrix[parseInt(neighbourInd/size)][neighbourInd%size].parent = currMatrixPoint;
                matrix[parseInt(neighbourInd/size)][neighbourInd%size].g = temporaryAssessment;
                matrix[parseInt(neighbourInd/size)][neighbourInd%size].f = temporaryAssessment + manhattanDistance(currNeighbours[i], finishPoint);
                if (!elementInQueue(queue, neighbourInd)){
                    queue.push(neighbourInd);
                    if (currNeighbours[i] !== startPoint && currNeighbours[i] !== finishPoint) {
                        currNeighbours[i].className = "possibleWay";
                        await sleep(2);
                    }
                }
            }
        }
        await sleep(2);
        if (currMatrixPoint !== startPoint && currMatrixPoint !== finishPoint) {
            currMatrixPoint.className = "seenCell";
        }
    }
    startPoint.className = "startPoint";
    finishPoint.className = "endPoint";
    changeAccesebility("enable");
    alert("Путь отсутствует!");
}
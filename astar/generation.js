function createQueueOfSuitablePoints(sourceQueue, x, y) {
    let queue = sourceQueue;
    if (y - 2 >= 0 && document.getElementById("cell." + (y - 2) + "." + x).className === "wall") {
        queue.push((y - 2)*size + x);
    }
    if (y + 2 < size && document.getElementById("cell." + (y + 2) + "." + x).className === "wall") {
        queue.push((y+2)*size + x);
    }
    if (x - 2 >= 0 && document.getElementById("cell." + y + "." + (x - 2)).className === "wall") {
        queue.push(y*size + (x - 2));
    }
    if (x + 2 < size && document.getElementById("cell." + y + "." + (x + 2)).className === "wall") {
        queue.push(y*size + (x + 2));
    }
    return queue;
}

function fillTheSpaceWithWalls() {
    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            document.getElementById("cell."+i+"."+j).className = "wall";
        }
    }
}

function createNewPoints() {
    while (true) {
        let startMapIndex = randomNumber(0, size*size);
        let beginPoint = document.getElementById("cell."+parseInt(startMapIndex/size)+"."+(startMapIndex%size));

        let endIndex = randomNumber(0, size*size);
        let finishPoint = document.getElementById("cell."+parseInt(endIndex/size)+"."+(endIndex%size));
        
        if (beginPoint !== finishPoint && beginPoint.className === "blankCell" && finishPoint.className === "blankCell") {
            beginPoint.className = "startPoint";
            finishPoint.className = "endPoint";
            break;
        }
    }
}

function startOfClearing() {
    if (size % 2 === 1) {
        return size+1;
    }
    else {
        return randomNumber(0, size*size);
    }
}

function checkingDirections(x, y) {
    let directions = ["up", "down", "left", "right"];

    while (directions.length > 0) {
        let directionIndex = randomNumber(0, directions.length);
        let direction = directions[directionIndex];

        if (direction === "up") {
            if (y - 2 >= 0 && document.getElementById("cell." + (y - 2) + "." + x).className === "blankCell") {
                document.getElementById("cell." + (y - 1) + "." + x).className = "blankCell";
                break;
            }
        }
        else if (direction === "down") {
            if (y + 2 < size && document.getElementById("cell." + (y + 2) + "." + x).className === "blankCell") {
                document.getElementById("cell." + (y + 1) + "." + x).className = "blankCell";
                break;
            }
        }
        else if (direction === "left") {
            if (x - 2 >= 0 && document.getElementById("cell." + y + "." + (x - 2)).className === "blankCell") {
                document.getElementById("cell." + y + "." + (x - 1)).className = "blankCell";
                break;
            }
        }
        else if (direction === "right") {
            if (x + 2 < size && document.getElementById("cell." + y + "." + (x + 2)).className === "blankCell") {
                document.getElementById("cell." + y + "." + (x + 1)).className = "blankCell";
                break;
            }
        }

        directions.splice(directionIndex, 1);
    } 
}

document.querySelector('#generateLabirynth').onclick = async function() {
    changeAccesebility("disable");
    fillTheSpaceWithWalls();

    let stPosition = startOfClearing();
    document.getElementById("cell."+(parseInt(stPosition/size)+"."+(stPosition%size))).className = "blankCell";

    let queue = [];
    queue.push(stPosition);

    while (queue.length > 0) {
        let index = randomNumber(0, queue.length);
        let currentCell = queue[index];

        let y = parseInt(currentCell/size);
        let x = currentCell%size;

        document.getElementById("cell." + y + "." + x).className = "blankCell";
        await sleep(1);

        queue.splice(index, 1)
        checkingDirections(x, y);
        queue = createQueueOfSuitablePoints(queue, x, y);
    }
    createNewPoints();
    changeAccesebility("enable");
}
var minPTSD = document.getElementById("PTS");//КРУЖОЧКИ
var selectedPTS = document.getElementById("SelectedPTS");

var minPTS = minPTSD.value;
selectedPTS.textContent = minPTS;

minPTSD.addEventListener("input", function() {
    minPTS = this.value;
    selectedPTS.textContent = minPTS;
});


var preValueEps = document.getElementById("eps");
var SelectedEps = document.getElementById("SelectedEps");

var eps = preValueEps.value;
SelectedEps.textContent = eps;

preValueEps.addEventListener("input", function() {
    eps = this.value;
    SelectedEps.textContent = eps;
});

//minPTS && eps считываются с мейн страницы
//сюда передаются var points, eps, minPTS 
//в этой функции точки у которых точек >= minPTS принадлежат кластерам
//если меньше, то просто шум (noise)

function DBSCAN() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);   
    let visited = new Array(points.length).fill(false); // Массив для отслеживания посещенных точек
    let clusters = []; 
    let amount = 0; // Счетчик кластеров
    
    for (let i = 0, len = points.length; i < len; i++) {
        if (!visited[i]) {
            visited[i] = true;
            let neighbors = rangeQuery(points[i]);
            
            if (neighbors.length >= minPTS) { //если соседей достаточно
                let cluster = expandCluster(points[i], neighbors, visited);
                clusters.push(cluster);
                amount++;
            }
        }
    }
    let noCol = colorizeClustersForDBSCAN(clusters);
    console.log(noCol);
    noise(noCol);
}

function rangeQuery(point) {
    let neighbors = [];
    for (let i = 0, len = points.length; i < len; i++) {
        if (EuclideanDistance(point, points[i]) <= eps) {
            neighbors.push(points[i]);
        }
    }
    return neighbors;
}

function expandCluster(point, neighbors, visited) {
    let cluster = [];
    cluster.push(point);
    for (let i = 0; i < neighbors.length; i++) {
        let neighbour = neighbors[i];
        if (!visited[points.indexOf(neighbour)]) {
            visited[points.indexOf(neighbour)] = true;
            let neighborNeighbors = rangeQuery(neighbour);//находим соседей соседа
            if (neighborNeighbors.length >= minPTS) {//если у соседа достаточно соседей
                neighbors = neighbors.concat(neighborNeighbors);
            }
        }
        if (!isInCluster(neighbour, cluster)) {
            cluster.push(neighbour);
        }
    }
    return cluster;
}

function isInCluster(point, cluster) {
    for (let i = 0; i < cluster.length; i++) {
        if (point[0] === cluster[i][0] && point[1] === cluster[i][1]) {
            return true;
        }
    }
    return false;
}

function EuclideanDistance(point1, point2) {
    let dx = point1[0] - point2[0];
    let dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function noise(unVisited) {//окраска шума
    for (let i = 0, len = unVisited.length; i < len; i++) { 
        ctx.fillStyle = color;
        const point = unVisited[i];
        const x = point[0];
        const y = point[1];
        
        // Вызываем функцию strokeStar для определения цвета
        strokeStar(x, y, 5, 5, 0.5); // Здесь используем координаты точки и цвет кластера
    }
}

function colorizeClustersForDBSCAN(clusters) {
    let noColorized = [];

    for (let i = 0, len = points.length; i < len; i++) {
        noColorized[i] = points[i];
    }

    for (let i = 0; i < clusters.length; i++) {
        const clusterColor = colours[i]; // Выбираем цвет для кластера

        for (let j = 0; j < clusters[i].length; j++) {
            const point = clusters[i][j];
            noColorized.splice(noColorized.indexOf(point), 1);
            const x = point[0];
            const y = point[1];
            
            // Вызываем функцию strokeStar для определения цвета
            ctx.fillStyle = clusterColor;
            strokeStar(x, y, 5, 5, 0.5); // Здесь используем координаты точки и цвет кластера
        }
    }
    return noColorized; 
}


function strokeStar(x, y, r, n, inset) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (r*inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//К-средние
let iterations = 50;//итерации

function euclideanDistance(point1, point2) {
    return (Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function centroids() {
    let dict = [];
    let centers = [];
    for (let i = 0; i < k;) {
        let num = points[randomIntFromInterval(0, points.length - 1)];
        if (!centers.includes(num)) {
            centers[i] = num;
            dict[i] = centers[i];
            i++;
        }
    }
    return centers;
}

function calculateWCSS(arr, centre) {
    let wcss = 0;
    for (let i = 0; i < arr.length; i++) {
        let point = arr[i][0];
        let clusterColor = arr[i][1];
        let clusterIndex = colours.indexOf(clusterColor);
        let centroid = centre[clusterIndex];
        let distance = euclideanDistance(point, centroid);
        wcss += Math.pow(distance, 2);
    }
    return wcss;
}


function kmeans() {
    //ПЕРВОНАЧАЛЬНОЕ РАСПРЕДЕЛЕНИЕ КЛАСТЕРОВ
    let centers = [];//координаты центров
    centers = centroids();
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);   

    let arr = [];

    for (let i = 0; i < points.length; i++) {
        let dist = [];

        for (let j = 0; j < k; j++) {
            dist[j] = euclideanDistance(points[i], centers[j]);
        }
        arr[i] = ([points[i], colours[dist.indexOf(Math.min(...dist))]]);
        ctx.fillStyle = arr[i][1];
        ctx.fillRect(arr[i][0][0], arr[i][0][1], pointSize, pointSize);
    }
    console.log("ПЕРВОНАЧАЛЬНО:", arr, centers);

    ////////////////////////ПЕРЕСЧЕТ КЛАСТЕРОВ:
    let centre = [];
    let newCentroids = [];
    let wcss = []
    wcss[0] = [calculateWCSS(arr, centers), centers];
    for (let num = 1; num < iterations; num++) {
        newCentroids = [];

        for (let i = 0; i < k; i++) {
            newCentroids[i] = [];
        }

        for (let i = 0; i < arr.length; i++) {
            newCentroids[colours.indexOf(arr[i][1])].push(arr[i][0]);
        }

        for (let i = 0; i < newCentroids.length; i++) {
            let sumx = 0, sumy = 0;
            for (let j = 0; j < newCentroids[i].length; j++) {
                sumx += newCentroids[i][j][0];
                sumy += newCentroids[i][j][1];
            }
            centre[i] = [sumx/newCentroids[i].length, sumy/newCentroids[i].length];
        }

        for (let i = 0; i < points.length; i++) {
            let dist = [];
    
            for (let j = 0; j < k; j++) {
                dist[j] = euclideanDistance(points[i], centre[j]);
            }
            arr[i] = ([points[i], colours[dist.indexOf(Math.min(...dist))]]);
            ctx.fillStyle = arr[i][1];
            ctx.fillRect(arr[i][0][0], arr[i][0][1], pointSize, pointSize);
        }

        if (wcss <= calculateWCSS(arr, centre)) {
            for (let i = 0; i < k; i++) {
                ctx.fillStyle = colours[i];
                ctx.fillRect(centre[i][0], centre[i][1], 2, 2);
            }
            return;
        }
        wcss[num] = [calculateWCSS(arr, centre) - wcss[num - 1], centre];
    }
    console.log(wcss, wcss[wcss.indexOf(Math.min(...wcss))], (Math.min(...wcss)));

    for (let final = 0; final < points.length; final++) {
        let dist = [];

        for (let ind = 0; ind < k; ind++) {
            centers[ind] = wcss[wcss.indexOf(Math.min(...wcss))][1][ind];//индекс минимального отклонения
        }

        for (let prefinal = 0; prefinal < k; prefinal++) {
            dist[prefinal] = euclideanDistance(points[i], centers[j]);
        }
        arr[final] = ([points[final], colours[dist.indexOf(Math.min(...dist))]]);
        ctx.fillStyle = arr[final][1];
        ctx.fillRect(arr[final][0][0], arr[final][0][1], pointSize, pointSize);
    }

    for (let i = 0; i < k; i++) {
        ctx.fillStyle = colours[i];
        ctx.fillRect(centre[i][0], centre[i][1], 2, 2);
    }
}



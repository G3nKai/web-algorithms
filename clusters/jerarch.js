function jerach() {//КВАДРАТЫ
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height); 
    let clusters = [];
    let centers = []; //изначальные центры

    for (let i = 0; i < points.length; i++) {
        centers.push(points[i]); // сколько точек - столько и центров кластеров. Изначально.
        clusters.push([points[i]]);
    }

    while (clusters.length > k) {
        let minDistance = Infinity;
        let mergeIndices = [-1, -1];
        
        for (let i = 0; i < clusters.length - 1; i++) {
            for (let j = i + 1; j < clusters.length; j++) {
                const dist = euclideanDistance(centers[i], centers[j]);
                if (dist < minDistance) {
                    minDistance = dist;
                    mergeIndices = [i, j];
                }
            }
        }

        //объединение двух ближайших кластеров
        const mergedCluster = clusters[mergeIndices[0]].concat(clusters[mergeIndices[1]]);
        const newCenter = calculateCenter(mergedCluster);
        
        clusters.splice(mergeIndices[1], 1);
        clusters[mergeIndices[0]] = mergedCluster;
        centers.splice(mergeIndices[1], 1);
        centers[mergeIndices[0]] = newCenter;
    }
    colorizeClusters(clusters);
    
    return clusters; 
}

// функция для расчета центра кластера
function calculateCenter(cluster) {
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < cluster.length; i++) {
        sumX += cluster[i][0];
        sumY += cluster[i][1];
    }
    const centerX = sumX / cluster.length;
    const centerY = sumY / cluster.length;
    return [centerX, centerY];
}

function colorizeClusters(clusters) {
    let noColorized = [];

    for (let i = 0, len = points.length; i < len; i++) {
        noColorized[i] = points[i];
    }

    for (let i = 0; i < clusters.length; i++) {
        const clusterColor = colours[i];

        for (let j = 0; j < clusters[i].length; j++) {
            const point = clusters[i][j];
            noColorized.splice(noColorized.indexOf(point), 1);
            const x = point[0];
            const y = point[1];
            
            ctx.fillStyle = clusterColor;
            ctx.fillRect(x, y, pointSize, pointSize);
        }
    }
    return noColorized; 
}

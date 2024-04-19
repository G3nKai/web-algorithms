function generateCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.fillStyle = "rgb(204, 204, 172)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; 
    ctx.shadowBlur = 5; 
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2; 
    ctx.fill();
}

function generateLine(x,y,x1,y1){
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
function connectGens(){
    for(let i = 0; i < bestPath.length-1; ++i){
        let x = arr[bestPath[i]][0];
        let y = arr[bestPath[i]][1];
        let x1 = arr[bestPath[i+1]][0]; // Corrected from [1] to [0]
        let y1 = arr[bestPath[i+1]][1]; // Corrected from [0] to [1]
        generateLine(x, y, x1, y1);
    }
    x = arr[bestPath[0]][0];
    y = arr[bestPath[0]][1];
    x1 = arr[bestPath[bestPath.length-1]][0];
    y1 = arr[bestPath[bestPath.length-1]][1];
    generateLine(x, y, x1, y1);
    
    for(let i = 0; i < bestPath.length-1; ++i){
        let x = arr[bestPath[i]][0];
        let y = arr[bestPath[i]][1];
        let x1 = arr[bestPath[i+1]][0];
        let y1 = arr[bestPath[i+1]][1];
        generateCircle(x, y); // Рисуем круги сначала
        generateCircle(x1, y1);
    }
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

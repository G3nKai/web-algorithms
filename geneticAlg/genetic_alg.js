
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

function generateLine(x,y,x1,y1,r,g,b){
    ctx.lineWidth = 5;
    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = 'rgb('+r+','+g+','+b+')'; // Задаем цвет линии
    ctx.stroke(); // Рисуем линию
}

function updateCircles(){
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
    ctx.clearRect(0, 0, block.width, block.height);
}

function connectGens(r,g,b){

    clearCanvas();

    for(let i = 0; i < bestPath.length-1; ++i){
        let x = arr[bestPath[i]][0];
        let y = arr[bestPath[i]][1];
        let x1 = arr[bestPath[i+1]][0]; // Corrected from [1] to [0]
        let y1 = arr[bestPath[i+1]][1]; // Corrected from [0] to [1]
        generateLine(x, y, x1, y1,r,g,b);
    }
    x = arr[bestPath[0]][0];
    y = arr[bestPath[0]][1];
    x1 = arr[bestPath[bestPath.length-1]][0];
    y1 = arr[bestPath[bestPath.length-1]][1];
    generateLine(x, y, x1, y1,r,g,b);

    updateCircles();

}
class GeneticAlgor {
    constructor(sizeOfPopulation, quantityOfGen, mutationProcent, arrOfPoints) {
        this.sizeOfPopulation = sizeOfPopulation; //кол-во строк при генерации популяции
        this.quantityOfGen = quantityOfGen; //поколения
        this.mutationProcent = mutationProcent; //процент мутации
        this.arrOfPoints = arrOfPoints; //координаты точек
        this.path = new Array(sizeOfPopulation).fill().map(() => new Array(arrOfPoints.length).fill(0));
        this.distances = new Array(sizeOfPopulation);
        this.randArr1 = [];//выбор  радомной строки из матрицы
        this.randArr2 = [];//выбор  радомной строки из матрицы
        this.crossedArr1;//1 скрещенный массив
        this.crossedArr2;//2 скрещенный массив
        this.distancesForCrossed =[2];
    }

    //рандомное число в заданом диапaзоне
    randNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //расстояние между двумя точками
    findCoord(x,y,x1,y1){
        return Math.sqrt(Math.pow(x-x1,2) + Math.pow(y-y1,2));   
    }
   
    //расстония между всеми точками
    findDist(path,city,arrOfPoints){
   
        let sum = 0;
        let x,y,x1,y1;
        
        for(let i = 0; i < path[city].length - 1; ++i){
        
           let j = i+1;
           x = arrOfPoints[path[city][i]][0];
           y = arrOfPoints[path[city][i]][1];
           x1 = arrOfPoints[path[city][j]][0];
           y1 = arrOfPoints[path[city][j]][1];

           sum += this.findCoord(x,y,x1,y1);
        }

        x = arrOfPoints[path[city][0]][0];
        y = arrOfPoints[path[city][0]][1];
        x1 = arrOfPoints[path[city][path[city].length - 1]][0];
        y1 = arrOfPoints[path[city][path[city].length - 1]][1];

        sum += this.findCoord(x,y,x1,y1);

        return sum;
    }

     //cкрещивание
    findCrossing(arr){

        let sum = 0;
        let x,y,x1,y1;
        
        for(let i = 0; i < arr.length-1; ++i){

            x = this.arrOfPoints[arr[i]][0];
            y = this.arrOfPoints[arr[i]][1];
            x1 = this.arrOfPoints[arr[i+1]][0];
            y1 = this.arrOfPoints[arr[i+1]][1];

            sum += this.findCoord(x,y,x1,y1);
        }
        return sum;
    }

    crossing(arr1,arr2){

        let length = arr1.length;
        let result = new Array(length).fill(0);
        let result2 = new Array(length);
        let visited = new Array(this.arrOfPoints.length).fill(false);
        let visited2 = new Array(this.arrOfPoints.length).fill(false);
        
        for(let i = 0; i < Math.floor(length/2); ++i){

            visited[arr1[i]] = true; 
            result[i] = arr1[i];
            
            result2[i] = arr2[i];
            visited2[arr2[i]] = true;
        }


        let key = Math.floor(length/2);
        let key2 =  Math.floor(length/2);

        for(let i = Math.floor(length/2); i < length; ++i){

            if(!visited[arr2[i]]){
                result[key] = arr2[i];
                key++;
                visited[arr2[i]] = true;
            }
        
            if(!visited2[arr1[i]]){
                result2[key2] = arr1[i];
                key2++;
                visited2[arr1[i]] = true;
            }
        
        }
        for(let i =  Math.floor(length/2); i < length; ++i){

            if(!visited[arr1[i]]){
                result[key] = arr1[i];
                key++;
                visited[arr2[i]] = true;
                
            }
            if(!visited2[arr2[i]]){
                result2[key2] = arr2[i];
                key2++;
                visited2[arr1[i]] = true;
                
            }

        }
        
        return [result,result2];
    }
    //мутация
    mutation(arr1){
        let mutated = arr1;

        let mutationRand = this.randNum(0,100);

        if(mutationRand > mutationProcent){
            let gen1, gen2;
            do {
                gen1 = this.randNum(1, arr1.length - 1); // Исправлено
                gen2 = this.randNum(1, arr1.length - 1); // Исправлено
            } while (gen1 == gen2);

            let gen3 = mutated[gen1];
            mutated[gen1] = mutated[gen2];
            mutated[gen2] = gen3;
        }

        return mutated;
    }

    addNewKids(){

        this.path.push(this.crossedArr1);
        this.path.push(this.crossedArr2);
        this.distances.push(this.distancesForCrossed[0]);
        this.distances.push(this.distancesForCrossed[1]);

    }
    sortKids() {
        for (let i = 0; i < this.distances.length; ++i) {
            for (let j = 0; j < this.distances.length - 1; ++j) {
                if (this.distances[j] > this.distances[j + 1]) {
                    let dist = this.distances[j];
                    this.distances[j] = this.distances[j + 1];
                    this.distances[j + 1] = dist;
                    
                    // Сохраняем путь до того, как менять
                    let tempPath = this.path[j].slice();
                    this.path[j] = this.path[j + 1].slice();
                    this.path[j + 1] = tempPath;
                }
            }
        }
    }
    
    deleteWorstIndivid() {
        // Проверка наличия элементов перед удалением
        if (this.distances.length >= 2 && this.path.length >= 2) {
            this.distances.splice(-2);
            this.path.splice(-2);
        }
    }

    generateChromo(){
        for (let i = 0; i < this.sizeOfPopulation; ++i) {
            this.path[i][0] = 0;
            let visited = new Array(this.arrOfPoints.length).fill(false);
            visited[0] = true; // Первая вершина всегда 0

            for (let j = 1; j < this.arrOfPoints.length; ++j) {
                let rnd;
                do {
                    rnd = this.randNum(0, this.arrOfPoints.length - 1);
                } while (visited[rnd]); // проверка на длину массива
                this.path[i][j] = rnd;
                visited[rnd] = true;
            }
            this.distances[i] = this.findDist(this.path, i, this.arrOfPoints);
        }

    }
    run() {
        // берем 2 рандомные массивы 
        let rnd, rnd2;
        rnd = this.randNum(0, this.sizeOfPopulation - 1);
        rnd2 = this.randNum(0, this.sizeOfPopulation - 1);
        this.randArr1 = this.path[rnd].slice();
        this.randArr2 = this.path[rnd2].slice();

        let result = this.crossing(this.randArr1, this.randArr2);

        this.crossedArr1 = result[0];
        this.crossedArr2 = result[1];
        this.distancesForCrossed[0] = this.findCrossing(this.crossedArr1);
        this.distancesForCrossed[1] = this.findCrossing(this.crossedArr2);

        if (this.path[0].length >= 2) {

            if (this.distancesForCrossed[0] > this.distancesForCrossed[1]) {
                this.crossedArr1 = this.mutation(this.crossedArr1);
                this.distancesForCrossed[0] = this.findCrossing(this.crossedArr1);
            } else {
                this.crossedArr2 = this.mutation(this.crossedArr2);
                this.distancesForCrossed[1] = this.findCrossing(this.crossedArr2);
            }

        }

        this.addNewKids();
        this.sortKids();
        this.deleteWorstIndivid();
    }
    
    async mutationCounter(){
        let key = 0;
        while(key < this.quantityOfGen){
            this.run();
            bestPath = this.path[0];

            let r = this.randNum(0,255);
            let g = this.randNum(0,255);
            let b = this.randNum(0,255);

            await sleep(200);
            connectGens(r,g,b);
            key++;
        }
        alert("Работа алгоритма завершена!");
        changeAccessibility("enable");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function slider(upt, set_upt,key) {
    upt.addEventListener('input', function() {
        if(key>=1){
            set_upt.innerHTML = upt.value;
        }else{
            set_upt.innerHTML = '0.' + upt.value;
        }
    });
}

slider(update, set_update,1);
//вес расстояний
let Beta = document.getElementById('beta');
let set_Beta = document.getElementById('set_beta');
slider(Beta,set_Beta,1); 
//скорость испарения ферамонов
let speed = document.getElementById('speed');
let set_speed = document.getElementById('set_speed');
slider(speed,set_speed,0.1);
//количество прохождений
let Count = document.getElementById('count');
let set_count = document.getElementById('set_count');
slider(Count,set_count,1);


function mouseMove(event) {
    let rect = block.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    arr.push([x, y]);
    generate_circle(x, y);
}

block.addEventListener('click', function(event) {
    if (event.target === block) {
        mouseMove(event);
    }
});

document.querySelector('#getInfoAlgo').onclick = function() {
    alert("Муравьиный алгоритм — один из эффективных алгоритмов для нахождения приближённых решений задачи коммивояжёра, а также решения аналогичных задач поиска маршрутов на графах. Суть подхода заключается в анализе и использовании модели поведения муравьёв, ищущих пути от колонии к источнику питания, и представляет собой метаэвристическую оптимизацию.");
}

document.querySelector('#clearCanv').onclick = function() {
    bestPath = [];
    arr = [];
    bestDistance =[];
    clearCanvas();
}

function changeAccessibility(action) {
    if (action === "enable") {
        document.getElementById("submt").hidden = "";
    }
    
    else if (action === "disable") {
        document.getElementById("submt").hidden = "hidden";
    }

    var sliders = document.getElementsByClassName("sliders")[0].querySelectorAll("input[type=range]");
    for (var i = 0; i < sliders.length; i++) {
        if (action === "enable") {
            sliders[i].removeAttribute("disabled");
        } else if (action === "disable") {
            sliders[i].setAttribute("disabled", "true");
        }
    }
}

submit.addEventListener('click',function(event){
    changeAccessibility("disable");
    run_ants_algor(arr);
});

function run_ants_algor(arr){
    let distances = find_dist(arr);
    let numCities = distances.length; // Количество городов
    let alpha = 1.0;
    let beta = parseInt(Beta.value); // Вес расстояния
    let evaporation = parseFloat(speed.value/10); // Скорость испарения феромона
    let Q = parseInt(update.value); // Параметр Q для обновления феромонов
    let antsCount = numCities; // Количество муравьев
    let count = parseInt(Count.value);
    let antColony = new AntColony(numCities, distances, alpha, beta, evaporation, Q, antsCount);

    
    antColony.run(count);
    // Получение лучшего найденного пути и его длины
    bestDistance = antColony.get_best_distance();
}
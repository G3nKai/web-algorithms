//population slider
let set_population = document.getElementById('set_population');
let population = document.getElementById('population');
set_population.innerHTML = population.value;
population.addEventListener('input', function() {
    set_population.innerHTML = population.value;
});

//size of brush
let range = document.getElementById('range');
let rangeVal = document.getElementById('rangeVal');
rangeVal.innerHTML = range.value;
range.addEventListener('input', function() {
    rangeVal.innerHTML = range.value;
});

//gens
let gen_count = document.getElementById('gen');
let set_gen = document.getElementById('set_gen');
set_gen.innerHTML = gen_count.value;
gen.addEventListener('input', function() {
    set_gen.innerHTML = gen_count.value;
});


//mutation procent
let procent = document.getElementById('mutation');
let set_procent = document.getElementById('set_mutation');
set_procent.innerHTML = procent.value;
procent.addEventListener('input', function() {
    set_procent.innerHTML = procent.value;
});


//sumbit button
let submit = document.getElementById('submt');
submit.addEventListener('click',function(event){
   
    run_generic_algor(size_of_population, quantity_of_gen, mutation_procent, arr);
    draw_lines(bestPath,arr);
    console.log('успешно');
});


class Coords {
    constructor(x, y) {
        this.x = Math.min(Math.max(x, 10), 295);
        this.y = Math.min(Math.max(y, 10), 295);
    }
}

dots = new Coords(0,0);

function mouseMove(event) {
   
    let x = event.clientX - (point.offsetWidth / 2);
    let y = event.clientY - (point.offsetHeight / 2);


    dots = new Coords(x, y);

  
    arr.push([dots.x, dots.y]);

    let clone = point.cloneNode(true);
    setCoords(dots.x, dots.y, clone);
    block.appendChild(clone);


}
block.addEventListener('click', function(event) {
    if (event.target === block) {
        mouseMove(event);
    }
});

document.addEventListener('mousedown', function(event) {
    if (event.target === block) {
        document.addEventListener('mousemove', mouseMove);
    }
});

document.addEventListener('mouseup', function(event) {
    document.removeEventListener('mousemove', mouseMove);
});

let block = document.getElementById('plank');
let ctx = block.getContext('2d');
let arr = [];
let bestPath = [300];
let sizeOfPopulation = parseInt(population.value);
let dots;
let quantityOfGen = 5;
let mutationProcent = 20;
let colors = ["red","green","blue","orange","violet"]
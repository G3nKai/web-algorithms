function runGenericAlgor(sizeOfPopulation,quantityOfGen,mutationProcent,arrOfPoints){
    changeAccessibility("disable");
    sizeOfPopulation = parseInt(population.value);
    quantityOfGen = parseInt(genCount.value);
    mutationProcent = parseInt(procent.value);
    let print = new GeneticAlgor(sizeOfPopulation,quantityOfGen,mutationProcent,arrOfPoints);
    print.generateChromo();
    print.mutationCounter();
    connectGens();
}
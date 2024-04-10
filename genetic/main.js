
function run_generic_algor(size_of_population,quantity_of_gen,mutation_procent,arr_of_points){

    size_of_population = parseInt(population.value);
    quantity_of_gen = parseInt(gen_count.value);
    mutation_procent = parseInt(procent.value);

    console.log(size_of_population);
    console.log(quantity_of_gen);
    console.log(mutation_procent);
    let print = new Genetic_Algor(size_of_population,quantity_of_gen,mutation_procent,arr_of_points);
    print.generate_chromo();
    print.mutation_counter();
    bestPath = print.best_path();

}


function start(){
    seed = randomSeed(nodes);
    seed2 = randomSeed(nodes2);
    vgrid = randomVectorGrid(nodes);
    vgrid2 = randomVectorGrid(nodes2);
    spawnSpecies();
    tick();
}

start();
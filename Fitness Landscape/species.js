species = [];
const specnum = 100;

function spawnSpecies(){
    for(var i = 0; i < specnum; i++){
        species.push({x: Math.floor(Math.random()*500), y: Math.floor(Math.random()*500)});
    }
}

function moveSpecies(){
    const data = document.getElementById('map-layer').getContext('2d').getImageData(0,0,500,500).data;
    for(var i = 0; i < species.length; i++){
        x = species[i].x;
        y = species[i].y;
        for(var y1 = -1; y1 < 2; y1++){
            for(var x1 = -1; x1 < 2; x1++){
                if(data[dataAlpha(x,y)] < data[dataAlpha(x+x1,y+y1)]){
                    species[i].x = x+x1;
                    species[i].y = y+y1;
                }
            }
        }
    }
}

function dataAlpha(x,y){
    return y * 2000 + x * 4 + 3;
}

function drawSpecies(){
    var canvas = document.getElementById('species-layer');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,500,500);

    for(var i = 0; i < species.length; i++){
        x = species[i].x;
        y = species[i].y;

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2, true);
        ctx.fill();
    }
}
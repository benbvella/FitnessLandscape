var canvas = document.getElementById('map-layer');
var ctx = canvas.getContext('2d', {willReadFrequently: true});

let grid = [];
let grid2 = [];
let vgrid = [];
let vgrid2 = [];
let seed = '';
let seed2 = '';
const nodes = 6;
const nodes2 = 10;
const mapspeed = 15;
const perc = 0.2;

function randomSeed(noden){
    out = ''
    for(var t = 0; t < noden**2; t++){
        out += String(Math.floor(Math.random()*1000)) + ' ';
    }
    return out;
}

function randomVectorGrid(noden){
    out = [];
    for(var i = 0; i < noden**2; i++){
        out.push(Math.random());
    }
    return out;
}

function seedtogrid(s,noden){
    out = [];
    var seedlist = s.split(' ');
    for(var i = 0; i < noden; i++){
        var row = [];
        for (var j = 0; j < noden; j++) {
            row.push(unitVector(Number(seedlist[i*noden+j])/1000));
        }
        out.push(row);
    }
    return out;
}

function getseed(){
    output = ''
    for(var a = 0; a < nodes; a++){
        for(var b = 0; b < nodes; b++){
            output += String(Math.trunc(Math.acos(grid[a][b].x)/Math.PI*500)) + ' ';
        }
    }
    return output;
}

function modifyseed(s,field){
    var seedlist = s.split(' ');
    var mseed = ''
    for(var i = 0; i < seedlist.length; i++){
        if(field==1){
            vgrid[i] += randInt(-mapspeed,mapspeed)/10;
            var n = Number(seedlist[i]) + Math.round(Math.sin(vgrid[i])*mapspeed);
        } else {
            vgrid2[i] += randInt(-mapspeed,mapspeed)/10;
            var n = Number(seedlist[i]) + Math.round(Math.sin(vgrid2[i])*mapspeed);
        }
        if(n<0){n+=1000};
        if(n>1000){n-=1000};
        mseed += String(n) + ' ';
    }
    return mseed;
}

function getPerlin(x,y,field){
    var x0 = Math.floor(x);
    var x1 = x0 + 1;
    var y0 = Math.floor(y);
    var y1 = y0 + 1;
    var n0 = smoothInterp(x-x0,gridDotProduct(x,y,x0,y0,field),gridDotProduct(x,y,x1,y0,field));
    var n1 = smoothInterp(x-x0,gridDotProduct(x,y,x0,y1,field),gridDotProduct(x,y,x1,y1,field));
    return smoothInterp(y-y0,n0,n1);
}

function unitVector(n){
    var theta = n * Math.PI * 2;
    return {x: Math.cos(theta), y: Math.sin(theta)};
}

function gridDotProduct(x, y, vert_x, vert_y,field){
    if(field==1){
        var g_vect = grid[vert_y][vert_x];
    } else {
        var g_vect = grid2[vert_y][vert_x];
    }
    var d_vect = {x: x - vert_x, y: y - vert_y};
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
}

function smoothInterp(x, a, b){
    return a + smootherstep(x) * (b-a);
}

function linInterp(x, a, b){
    return a + x * (b-a);
}

function smootherstep(x){
    return 6*x**5 - 15*x**4 + 10*x**3;
}

function randInt(min,max){
    return Math.floor(Math.random() * (max+1-min))+min;
}

function drawmap() {
    var w = canvas.width;
    var h = canvas.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,w,h);

    const imageData = ctx.getImageData(0,0,w,h);
    const data = imageData.data;
        
    for (var b = 0; b < w*h; b++) {
        data[b*4+3] = linInterp(perc, (getPerlin((b%w)/(w/(nodes-1)),(b-(b%w))/w/(w/(nodes-1)), 1)+1)/2, (getPerlin((b%w)/(w/(nodes2-1)),(b-(b%w))/w/(w/(nodes2-1)), 2)+1)/2)*255;
    }
    ctx.putImageData(imageData, 0, 0);
};
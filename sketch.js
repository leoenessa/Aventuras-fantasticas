var dados = [];
var pipefile = [];

function setup() {
    var canvas = createCanvas(640, 480);
    canvas.parent('area-sketch');
    
    button = createButton('Rolar dado');
    button.position(width, height);
    button.parent('area-sketch');
    button.mouseClicked(rolarDado);
}

function draw() {
    if(dados.length>0){
       for(let i=0;i<dados.length;i++){
           dados[i].show();
       }
     
    }
}

function mousePressed(){
//    dado.shuffle();
//    dado2.shuffle();
}

function rolarDado(){
    if(dados.length>0){
        for(let i=0;i<dados.length;i++){
            dados[i].shuffle();
        }
    }
}

function limpaDados(){
    dados = [];
}

function criaDados(num){
    for(let i=0;i<num;i++){
        dados.push(new Dado());
    }
}
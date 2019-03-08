var dados = [];
var pipefile = [];

function setup() {
    createCanvas(800, 600);
    button = createButton('Rolar dado');
    button.position(1, 1);
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
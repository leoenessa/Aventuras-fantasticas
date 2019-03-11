var dados = [];

function setup() {
    var canvas = createCanvas(640, 480);
    canvas.parent('area-sketch');
    
    button = createButton('Rolar dado');
    button.position(width, height);
    button.parent('area-sketch');
    button.mouseClicked(rolaDado);
}

function draw() {
    if(dados.length>0){
       for(let i=0;i<dados.length;i++){
           dados[i].show();
       }
     
    }
}

function mousePressed(){
}

function rolaDado(){
    let total=0;
    if(dados.length>0){
        for(let i=0;i<dados.length;i++){
            dados[i].shuffle();
            total+=dados[i].getValor();
        }

        return(total);
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

function limpaTela(){
    clear();
}
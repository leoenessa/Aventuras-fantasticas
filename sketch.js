var dados = []

function setup() {
    createCanvas(800, 600);
    button = createButton('Rolar dado');
    button.position(1, height-100);
    button.mousePressed(rolarDado);
    dado = new Dado();
    dado2 = new Dado();
    dados.push(dado);
    dados.push(dado2);
}

function draw() {
    dado.show();
    dado2.show();
}

function mousePressed(){
    dado.shuffle();
    dado2.shuffle();
}

function rolarDado(){
    for(let i=0;i<=dados.length;i++){
        dados[i].shuffle();
    }
}
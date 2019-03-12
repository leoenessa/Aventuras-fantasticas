var sketch1 = function(p){
    
    var dados = [];
    
    p.setup = function(){
        var canvas = p.createCanvas(640, 480);
        canvas.parent('area-sketch');
    
        p.button = p.createButton('Rolar dado');
        p.button.position(p.width, p.height);
        p.button.parent('area-sketch');
        p.button.mouseClicked(p.rolaDado);
    };
    
    p.draw = function(){
        if(dados.length>0){
            for(var i=0;i<dados.length;i++){
                dados[i].show();
            }
        }
    };
    
    p.rolaDado = function(){
        var total=0;
        if(dados.length>0){
            for(var i=0;i<dados.length;i++){
                dados[i].shuffle();
                total+=dados[i].getValor();
            }

            return(total);
        }
    };
    
    p.limpaDados = function(){
        dados = [];
    };
    
    p.criaDados = function(num){
        for(var i=0;i<num;i++){
            dados.push(new Dado());
        }
    };
    
    p.limpaTela = function(){
        p.clear();    
    };
};
var mesa_dados = new p5(sketch1);
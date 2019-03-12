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

    function Dado(){   
    
    this.lado = 80;
    this.x = p.random(1,p.width-this.lado);
    this.y = p.random(1,p.height-this.lado);

    this.type = 6;
    
    this.show = function(){
        p.stroke(0,0,0);
        p.fill(255,255,255);
        
        p.rect(this.x,this.y, this.lado, this.lado);

        switch(this.type){
            case 1:
                p.fill(0,0,0);
                p.ellipse(this.x+this.lado*0.5, this.y+this.lado*0.5, 10, 10);
                break;
            case 2:
                p.fill(0,0,0);
                p.ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                break;
            case 3:
                p.fill(0,0,0);
                p.ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                p.ellipse(this.x+this.lado*0.5, this.y+this.lado*0.5, 10, 10);
                break;
            case 4:
                p.fill(0,0,0);
                p.ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse(this.x+this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                break;
            case 5:
                p.fill(0,0,0);
                p.ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse(this.x+this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                p.ellipse(this.x+this.lado*0.5, this.y+this.lado*0.5, 10, 10);
                break;
            case 6:
                p.fill(0,0,0);
                p.ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                p.ellipse(this.x+this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                p.ellipse(this.x+this.lado*0.25, this.y+this.lado*0.5, 10, 10);
                p.ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.5, 10, 10);
                break;
        }

    }

    this.clear = function(){

    }

    this.shuffle = function(){
        this.type = p.ceil(p.random(0,6));
    }
    
    this.shufflePos = function(){
        times = 100;
        speed = 50;
        this.xdirection = p.random(-1,1);
        this.ydirection = p.random(-1,1);
    }

    this.getValor = function(){
        return(this.type);
    }
}

};
var mesa_dados = new p5(sketch1);
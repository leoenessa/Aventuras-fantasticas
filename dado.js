function Dado(){   
    
    this.lado = 100;
    this.x = random(1,width-this.lado);
    this.y = random(1,height-this.lado);

    this.type = 6;
    
    this.show = function(){
        stroke(0,0,0);
        fill(255,255,255);
        
        rect(this.x,this.y, this.lado, this.lado);

        switch(this.type){
            case 1:
                fill(0,0,0);
                ellipse(this.x+this.lado*0.5, this.y+this.lado*0.5, 10, 10);
                break;
            case 2:
                fill(0,0,0);
                ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                break;
            case 3:
                fill(0,0,0);
                ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                ellipse(this.x+this.lado*0.5, this.y+this.lado*0.5, 10, 10);
                break;
            case 4:
                fill(0,0,0);
                ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse(this.x+this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                break;
            case 5:
                fill(0,0,0);
                ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse(this.x+this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                ellipse(this.x+this.lado*0.5, this.y+this.lado*0.5, 10, 10);
                break;
            case 6:
                fill(0,0,0);
                ellipse(this.x+this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.25, 10, 10);
                ellipse(this.x+this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, (this.y+this.lado)-this.lado*0.25, 10, 10);
                ellipse(this.x+this.lado*0.25, this.y+this.lado*0.5, 10, 10);
                ellipse((this.x+this.lado)-this.lado*0.25, this.y+this.lado*0.5, 10, 10);
                break;
        }

    }

    this.clear = function(){

    }

    this.shuffle = function(){
        this.type = ceil(random(0,6));
        console.log(this.type);
//        for(i=0;i<10;i++){
//            setTimeout(function(){
//                this.type=random(1,6);
//                this.show();
//            }, 300);
//            
//
//        }
    }
    
    this.shufflePos = function(){
        times = 100;
        speed = 50;
        this.xdirection = random(-1,1);
        this.ydirection = random(-1,1);
    }
}
var hero_status = {nome:"Alucard",energia:0,habilidade:0,sorte:0,magias:[]};
var enemy_status = {nome:"Cerberus",energia:12,habilidade:8,sorte:6};
var personagens_status = [ guerreiro_status = {nome:"Guerreiro", energia:24, habilidade:10, sorte:7}, mago_status = {nome:"Mago", energia:15, habilidade:7, sorte:11}, clerigo_status = {nome:"Clérigo", energia:19, habilidade:9, sorte:9}];
var hero_turn = true;
var poder_ataque_hero = 0;
var poder_ataque_enemy = 0;
var max_magias = 3;

$.getJSON('https://api.myjson.com/bins/ut85k', function(data){
    livrocompleto = data;
    pagina_start = 1;
    var teste;

    populaMagias();

    //SELECIONAR PERSONAGEM
    $(".selecionar-personagem-classes-personagem .classe-personagem").mouseover(function(){
        var tmp_class = $(this).attr("data-classe");
        atualizaStatusSelPersonagem(tmp_class);
    });

    $(".selecionar-personagem-classes-personagem .classe-personagem").on('click',function(){
        hero_status = personagens_status[$(this).attr("data-classe")];
        $(".selecionar-personagem-container").css('display','none');
    });

    //TELA CRIAÇÃO PERSONAGEM
    $(".botao-criar-personagem").on('click',function(){
        $(".selecionar-personagem-container").css("display","none");
        $(".criar-personagem-container").css("display","block");
    });

    $("#btn-cria-personagem").on('click',function(){
       $.each($(".lista-magias input[type=checkbox]:checked"), function(){
            hero_status.magias.push($(this).attr('id'));
       });

       hero_status.energia = $(".attr_valor.energia").text();
       hero_status.habilidade = $(".attr_valor.habilidade").text();
       hero_status.sorte = $(".attr_valor.sorte").text();

        $("#area-sketch button").off();
       $(".criar-personagem-container").css("display","none");
    });

    //LOGICA CRIAÇÃO PERSONAGEM
    $("button.criar-personagem-botao-rolar-dado").on('click',function(){
        var atributo = $(this).attr("data-origem");
        $(".combate-container").css("display","flex");
        
        $("#area-sketch button").on('click',function(){ 
           
            mesa_dados.limpaDados();
            mesa_dados.limpaTela();
            mesa_dados.criaDados(2);
            var num_rolado = mesa_dados.rolaDado();
            if(atributo=='energia' || atributo=='habilidade'){
                num_rolado+=12;
            }
            else if(atributo=='sorte'){
                num_rolado+=6;
            }
            
            $(".criar-personagem-atributo span.attr_valor."+atributo).text(num_rolado);
            $(".combate-container").css("display","none");
            atributo = null;
        });
        $(this).css("display","none");
        
    });
    $(".item-magia").on('change',function(){
        console.log(max_magias);
        if($(".lista-magias input[type=checkbox]:checked").length > max_magias){
            $(this).prop('checked',false);
        }
        else{
            $(".qtde-restante-magias").text(max_magias);
        }
    });
                
    atualizaPagina(retornaPagina(pagina_start));
}),'jsonp';   
     
function retornaPagina(page){
    return(livrocompleto.pagina[page-1]);
}
function populaMagias(){
    $(".qtde-restante-magias").text(max_magias);
    var pai = $("fieldset.criar-personagem-magias .lista-magias");
    pai.empty();
            
    for(i=0;i<livrocompleto.magias.length;i++){
        var filho = "<div>"+
                        "<input class='item-magia' type = 'checkbox' id = 'magia"+i+
                              "' name = 'magia"+i+"' value = '"+livrocompleto.magias[i]+"'>"+
                        "<label for = 'magia"+i+"'>"+livrocompleto.magias[i]+"</label>"+
                    "</div>";
        
        pai.append(filho);
    }
}
function combate(irpara){
    mesa_dados.limpaDados();
    mesa_dados.limpaTela();
    
    if(hero_turn){
        if(hero_status.energia>0 && enemy_status.energia>0){
            mesa_dados.criaDados(2);
            poder_ataque_hero = mesa_dados.rolaDado();
            hero_turn = false;
            combate();
        }
        else{
            console.log("ACABOU A LUTA");
            $(".combate-container").css("display","none");
            atualizaPagina(irpara);
            hero_turn = true;
            enemy_status.energia=12;
            return true;
        }    
    }
    else{
        mesa_dados.criaDados(2);
        poder_ataque_enemy = mesa_dados.rolaDado();
        if(poder_ataque_hero>poder_ataque_enemy){
            console.log("HERÓI");
            enemy_status.energia-=2;
            atualizaFichas();
        }
        else{
            console.log("MONSTRO");
            hero_status.energia-=2;
            $("canvas.tela-efeitos").css("z-index",2);
            tela_efeitos.hit();
            $("canvas.tela-efeitos").css("z-index",0);
            atualizaFichas();
        }
        console.log("Vida HERÓI:"+hero_status.energia+"\nVida MONSTRO:"+enemy_status.energia);
        hero_turn = true;
    }
}
function atualizaStatusSelPersonagem(classe_personagem){
    $(".selecionar-personagem-imagem-classe .imagem-classe").attr("src","img/char_"+personagens_status[classe_personagem].nome+".jpg");
    $(".selecionar-personagem-atributo.energia .attr_valor").text(personagens_status[classe_personagem].energia);
    $(".selecionar-personagem-atributo.habilidade .attr_valor").text(personagens_status[classe_personagem].habilidade);
    $(".selecionar-personagem-atributo.sorte .attr_valor").text(personagens_status[classe_personagem].sorte);
}
function atualizaFichas(){
    $(".heroi-nome").text(hero_status.nome);
    $(".heroi-status .heroi-energia .box").text(hero_status.energia);
    $(".heroi-status .heroi-habilidade .box").text(hero_status.habilidade);
    $(".heroi-status .heroi-sorte .box").text(hero_status.sorte);
    $(".inimigo-nome").text(enemy_status.nome);
    $(".inimigo-status .inimigo-energia .box").text(enemy_status.energia);
    $(".inimigo-status .inimigo-habilidade .box").text(enemy_status.habilidade);
    $(".inimigo-status .inimigo-sorte .box").text(enemy_status.sorte);
}

function atualizaPagina(page){
    $(".texto").text(page.texto);
    
    if(page.id)
    
    if(page.questoes){
        if(page.questoes.length>0){
            var pai = $(".open-book .pagina-texto .opcoes");
            pai.empty();
            
            for(i=0;i<page.questoes.length;i++){
                var filho = document.createElement('l1');
                filho.className += "questao";
                $(filho).attr("data-destino",page.questoes[i].destino);
                filho.textContent = page.questoes[i].mensagem;
                pai.append(filho);
            }
        }
    }
    
    if(page.imagem!=null){
        $("#painel-img").attr("src","img/"+page.imagem);
    }
    else{
        $("#painel-img").attr("src","img/1.jpg");
    }
    
    if(page.combate){
        console.log("Prepare for battle!");
        $(".combate-container").css("display","flex");
        atualizaFichas();

        $("#area-sketch button").on('click',function(){   
           // mesa_dados.limpaDados();
           // mesa_dados.limpaTela();
           // mesa_dados.criaDados(2);
           // var tt = mesa_dados.rolaDado();
           // console.log(tt);
           combate(page.pos_combate);
        });
    }
    else{
        $(".combate-container").css("display","none");
    }
}

//MONITORA OPÇÃO ESCOLHIDA             
$(document).on("click", ".questao", function(){
    var vapara = $(this).attr("data-destino");
    console.log(vapara);
    atualizaPagina(retornaPagina(vapara));
    
});
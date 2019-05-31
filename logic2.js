MOMENTO_COMBATE = "c";

var hero_status = {nome:"Alucard",energia:0,habilidade:0,sorte:0,magia:0, magias:[]};
var enemy_status = {nome:"Cerberus",energia:12,habilidade:8,sorte:6};
var personagens_status = [ guerreiro_status = {nome:"Guerreiro", energia:24, habilidade:10, sorte:7,magias:["1","1","1","1"]}, 
                           mago_status = {nome:"Mago", energia:15, habilidade:7, sorte:11,magias:["1","1","1","1"]}, 
                           clerigo_status = {nome:"Clérigo", energia:19, habilidade:9, sorte:9,magias:["1","1","1","1"]}
                           ];
var hero_turn = true;
var poder_ataque_hero = 0;
var poder_ataque_enemy = 0;
var turno = 1;
var monstro_ganhando = false;

// $.getJSON('https://api.myjson.com/bins/k45nu', function(data){ Livro com destinos sequenciais
    $.getJSON('https://api.myjson.com/bins/1d157k', function(data){ //COMPLETO
    livrocompleto = data;
    pagina_start = 15;
    
    populaMagias();

    //=============SELECIONAR PERSONAGEM

    //Muda imagem seleção de personagem
    $(".selecionar-personagem-classes-personagem .classe-personagem").mouseover(function(){
        var tmp_class = $(this).attr("data-classe");
        atualizaStatusSelPersonagem(tmp_class);
    });

    //Seleciona o personagem ao clicar
    $(".selecionar-personagem-classes-personagem .classe-personagem").on('click',function(){
        hero_status = personagens_status[$(this).attr("data-classe")];
        $(".selecionar-personagem-container").css('display','none');
    });

    //=============TELA CRIAÇÃO PERSONAGEM

    let temp_qtde_magias = 0;
    //Habilita a tela de criação de personagem
    $(".botao-criar-personagem").on('click',function(){
        $(".selecionar-personagem-container").css("display","none");
        $(".criar-personagem-container").css("display","block");
    });

    //Cria o personagem recebendo valores dos atributos e magias
    $("#btn-cria-personagem").on('click',function(){
       $.each($(".lista-magias input[type=number]"), function(){
            // hero_status.magias.push($(this).attr('id'));
            let mag_id = $(this).attr('id');
            let mag_qtde = $(this).val();
            hero_status.magias[mag_id]=mag_qtde;

       });

       hero_status.energia = $(".attr_valor.energia").text();
       hero_status.habilidade = $(".attr_valor.habilidade").text();
       hero_status.sorte = $(".attr_valor.sorte").text();
       hero_status.magia = $(".attr_valor.magia").text();

       $("#area-sketch button").off();
       $(".criar-personagem-container").css("display","none");
    });

    //Aumenta quantidade de magia por magia
    $(".btn_up").on('click',function(){
        var campo = $(this).closest("div").find("input");
        if(temp_qtde_magias>0){
            campo.val(Number(campo.val())+1);
            temp_qtde_magias--;
            console.log(temp_qtde_magias);
        }
    });

    //Decrementa quantidade de magia por magia
    $(".btn_down").on('click',function(){
        var campo = $(this).closest("div").find("input");
        if(campo.val()>0){
            campo.val(Number(campo.val())-1);
            temp_qtde_magias++;    
            console.log(temp_qtde_magias);
        }  
    });

    //Botao rolar dado para cada atributo
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
            else if(atributo=='sorte' || atributo=='magia'){
                num_rolado+=6;

                if(atributo=='magia'){temp_qtde_magias=num_rolado;}
            }
            
            $(".criar-personagem-atributo span.attr_valor."+atributo).text(num_rolado);
            $(".combate-container").css("display","none");
            atributo = null;
        });
        $(this).css("display","none"); 
    });

    //Botao realizar teste para condição do texto
    $("p.teste").on('click',function(){
        var num_rolado = 0;
        var teste = $(this).attr("data-teste");
        var atributo = $(this).attr("data-origem");
        $(".combate-container").css("display","flex");
        
        $("#area-sketch button").on('click',function(){ 
           
            mesa_dados.limpaDados();
            mesa_dados.limpaTela();
            mesa_dados.criaDados(2);
            num_rolado = mesa_dados.rolaDado();
            console.log(num_rolado);
            if(realizaTeste(teste,num_rolado)){
                $('ul.resposta .opcao').attr("data-sucesso", function(id,valor){
                    if(valor=="true"){
                        $(this).removeClass("desabilitado");
                    }
                });
            }else{
                $('ul.resposta .opcao').attr("data-sucesso", function(id,valor){
                    if(valor=="false"){
                        $(this).removeClass("desabilitado");
                    }
                });
            }
            $(".combate-container").css("display","none");
            $("p.teste").css("display","none");
            
        });
        
    });    


    //Usado quando as magias eram checkboxes
    // $(".item-magia").on('change',function(){
    //     console.log(max_magias);
    //     if($(".lista-magias input[type=checkbox]:checked").length > max_magias){
    //         $(this).prop('checked',false);
    //     }
    //     else{
    //         $(".qtde-restante-magias").text(max_magias);
    //     }
    // });
                
    atualizaPagina(retornaPagina(pagina_start));
}),'jsonp';   
     
//Recebe e checa condição de habilitação de opção da página
function checaCondicao(condicao){
    let cond = condicao.split("%");
    let passou = false;

    switch(cond[1]){ //Condição
        case 'p': //Possuir
            switch(cond[2]){
                case 'm': //Magia
                    let magia = cond[3];
                    if(hero_status.magias[magia]>0) passou=true;
                    break;
            }
            break;
        default:
            console.log("Condição não cadastrada");
            break;
    }

    return passou;
}   

function realizaTeste(teste_str,numero_rolado){
    let teste = teste_str.split("%");
    let passou = false;

    switch(teste[1]){ //Condição
        case 't': //Testar
            switch(teste[2]){
                case 's': //sorte
                    if(numero_rolado<=hero_status.sorte){passou=true;}
                    hero_status.sorte--;
                    break;
            }
            break;
        default:
            console.log("Teste não cadastrado");
            break;
    }
    console.log("Passou:"+passou);
    return passou;
}

function lancaMagia(id_magia){
    console.log(livrocompleto.magias[id_magia].efeito);
}  

function executaComando(comando){
    console.log(comando);
    let cmd = comando.split("%");

    switch(cmd[1]){//Comando
        case 's': //Subtrair
            switch(cmd[2]){
                case 'm':
                    subtraiMagia(cmd[3],cmd[4]);
                    break;
            }
            break;
        default:
            console.log("Comando não cadastrado");
            break;
    }
}

function subtraiMagia(magia,qtde){
    if(hero_status.magias[magia]>0){
        hero_status.magias[magia]-=qtde;
    }
}

function retornaPagina(page){
    return(livrocompleto.pagina[page-1]);
}

function populaMagias(){
    var pai = $("fieldset.criar-personagem-magias .lista-magias");
    pai.empty();
            
    for(i=0;i<livrocompleto.magias.length;i++){
        console.log(livrocompleto.magias[i].nome);
        var filho = "<div>"+
                        "<label for = 'magia"+i+"'>"+livrocompleto.magias[i].nome+"</label>"+
                        "<input  type='number' class='item-magia' id = '"+i+
                              "' name = 'magia"+i+"' value = '"+livrocompleto.magias[i].nome+"'>"+
                        "<button class='btn_up'>+</button><button class='btn_down'>-</button>"
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

function combate2(irpara){
    console.log("Welcome to combate2");

    $(".btn-next").on('click',function(){
        if(turno==5){turno=1;}
        else{turno++;}
        console.log(turno);
        combate2(irpara);
        return;
    });

    //Exibe Mensagem de escolha magia
    if(turno==1){
        console.log("Lançar magia?");
        

        $("ul.heroi-magias li.magia").on('click',function(){
            let id_magia_selecionada = $(this).attr('data-id');
            lancaMagia(id_magia_selecionada);
            executaComando("%s%m%"+id_magia_selecionada+"%1");
            $("btn-next").trigger("click");

        });

    }else if(turno==2){
        console.log("TURNO 2");
        $("#area-sketch button").css('display','block');
        $("#area-sketch button").off();

        $("#area-sketch button").on('click',function(){   
            mesa_dados.criaDados(2);
            poder_ataque_hero = mesa_dados.rolaDado();
            hero_turn = false;
            $("btn-next").trigger("click");
        });
    }else if(turno==3){
        console.log("TURNO 3");
        
        mesa_dados.criaDados(2);
        poder_ataque_enemy = mesa_dados.rolaDado();

        if(poder_ataque_hero>poder_ataque_enemy){
            console.log("HERÓI");
            enemy_status.energia-=2;
            atualizaFichas();
        }else{
            console.log("MONSTRO");
            monstro_ganhando = true;
            $("canvas.tela-efeitos").css("z-index",2);
            tela_efeitos.hit();
            $("canvas.tela-efeitos").css("z-index",0);
        }

         $("btn-next").trigger("click");

    }else if(turno==4){
        console.log("TURNO 4");
        if(monstro_ganhando){
            hero_status.energia-=2;
        }

        $("btn-next").trigger("click");

    }else if(turno==5){
        console.log("TURNO 5");

        $("btn-next").trigger("click");
    }
    else{console.log("Erro - Turno de combate inválido");}
    //Incrementa turno
    //if turno2 
    // Rodada dados
    //Incrementa turno
    //if turno3 
    //Sorte?
    // Rodada dados
    //Incrementa turno
    //if turno4
    //Aplica danos
    //testa fim da batalha
    //if turno5
    //possibilita fuga?
    //fugir
    //Incrementa turno = 1
    mesa_dados.limpaDados();
    mesa_dados.limpaTela();
    
    
}

function combate3(){
    var turno=1;
    var poder_ataque_hero = 0;
    var poder_ataque_enemy = 0;
    var monstro_ganhando = false;
    var sorte_check = 0;
    var venceu = false;
    var gameover = false;

    return{
        proximo:function(){
            if(turno==1){
                console.log(turno);
                console.log("Lançar magia?");
        
                $("ul.heroi-magias li.magia").on('click',function(){
                    let id_magia_selecionada = $(this).attr('data-id');
                    lancaMagia(id_magia_selecionada);
                    executaComando("%s%m%"+id_magia_selecionada+"%1");
                    // $("btn-next").trigger("click");
                });
                turno++;
                console.log(turno);
            }else if(turno==2){
                console.log(turno);   

                console.log("BATALHA HEROI");
                $("#area-sketch button").css('display','block');
                $("#area-sketch button").off();

                $("#area-sketch button").on('click',function(){   
                    mesa_dados.criaDados(2);
                    poder_ataque_hero = mesa_dados.rolaDado();
                    turno++;
                    // $("btn-next").trigger("click");
                    $("#area-sketch button").css('display','none');
                });  
                                 
            }else if(turno==3){
                console.log(turno);   

                console.log("BATALHA MONSTRO");
                
                mesa_dados.limpaDados();
                mesa_dados.limpaTela();
                mesa_dados.criaDados(2);
                poder_ataque_enemy = mesa_dados.rolaDado();

                if(poder_ataque_hero>poder_ataque_enemy){
                    console.log("HERÓI");
                    enemy_status.energia-=2;
                    atualizaFichas();
                }else{
                    console.log("MONSTRO");
                    monstro_ganhando = true;

                    $("canvas.tela-efeitos").css("z-index",2);
                    tela_efeitos.hit();
                    $("canvas.tela-efeitos").css("z-index",0);
                }
                turno++;

                // $("btn-next").trigger("click");             
            }else if(turno==4){
                if(monstro_ganhando){
                    console.log(turno);   

                    console.log("LANÇAR SORTE");
                
                    mesa_dados.limpaDados();
                    mesa_dados.limpaTela();
                    
                    $("#area-sketch button").css('display','block');
                    
                    $("#area-sketch button").on('click',function(){   
                        mesa_dados.criaDados(2);
                        sorte_check = mesa_dados.rolaDado();
                        
                        $("#area-sketch button").css('display','none');
                        console.log(sorte_check);
                    });  
                    
                    
                    
                    if(sorte_check<=hero_status.sorte){
                        hero_status.energia--;
                        hero_status.sorte--;
                    }
                    else{
                        hero_status.energia-=2;
                        if(hero_status.sorte>0){
                            hero_status.sorte--;
                        }
                    }  
                    poder_ataque_enemy = poder_ataque_hero = sorte_check = 0;
                    monstro_ganhando = false;
                    turno++;
                }
                else{
                    turno++;
                    poder_ataque_enemy = poder_ataque_hero = sorte_check = 0;
                    monstro_ganhando = false;
                    $("btn-next").trigger("click");                 
                }
                
            }
            else if(turno==5){
                console.log("Fugir?");
                if(enemy_status.energia<=0){venceu=true;}
                if(hero_status.energia<=0){gameover=true;}
            }   
            }
        }
    };


function atualizaStatusSelPersonagem(classe_personagem){
    $(".selecionar-personagem-imagem-classe .imagem-classe").attr("src","img/char_"+personagens_status[classe_personagem].nome+".jpg");
    $(".selecionar-personagem-atributo.energia .attr_valor").text(personagens_status[classe_personagem].energia);
    $(".selecionar-personagem-atributo.habilidade .attr_valor").text(personagens_status[classe_personagem].habilidade);
    $(".selecionar-personagem-atributo.sorte .attr_valor").text(personagens_status[classe_personagem].sorte);
    $(".selecionar-personagem-atributo.magia .attr_valor").text(personagens_status[classe_personagem].magia);
}

function magiaeCombate(id){
    let status = livrocompleto.magias[id].efeito;
    let cmd = status.split('%')[1]; //busca posicao 1 do efeito que contem momento de lançamento
    cmd = cmd.split(","); 
    if(cmd.indexOf(MOMENTO_COMBATE) != -1){
        return true;
    }

    return false;
}

function atualizaFichas(){
    console.log("function atualizaFichas");

    $(".heroi-nome").text(hero_status.nome);
    $(".heroi-status .heroi-energia .box").text(hero_status.energia);
    $(".heroi-status .heroi-habilidade .box").text(hero_status.habilidade);
    $(".heroi-status .heroi-sorte .box").text(hero_status.sorte);
    $(".inimigo-nome").text(enemy_status.nome);
    $(".inimigo-status .inimigo-energia .box").text(enemy_status.energia);
    $(".inimigo-status .inimigo-habilidade .box").text(enemy_status.habilidade);
    $(".inimigo-status .inimigo-sorte .box").text(enemy_status.sorte);

    //Pópula Lista de magias
    let pai = $("ul.heroi-magias");
    pai.empty();

    for(let i=0;i<hero_status.magias.length;i++){
        let filho = document.createElement('l1');
        filho.className += "magia";

        if(magiaeCombate(i)){
            if(hero_status.magias[i] == 0){
                filho.className += " consumida";
            }

            $(filho).attr('data-id',i);
            filho.textContent = livrocompleto.magias[i].nome;
            pai.append(filho);
        }

        
    }
}

function atualizaPagina(page){
    $(".texto").text(page.texto);
     
    if(page.opcoes){

        if(page.opcoes.length>0){

            $("p.questao").text(page.questao);

            var pai = $(".open-book .pagina-texto .resposta");
            pai.empty();
            
            for(i=0;i<page.opcoes.length;i++){
                var filho = document.createElement('l1');
                filho.className += "opcao";

                if(page.teste){
                    filho.className += " desabilitado";                    
                    $(filho).attr('data-sucesso',page.opcoes[i].resultado_teste);
                }else{
                    if(page.opcoes[i].condicao){
                    console.log("VEJAMOS: "+page.opcoes[i].condicao);    
                        if(checaCondicao(page.opcoes[i].condicao)){}else{
                            filho.className += " desabilitado";

                        }
                    }    
                }
                
                
                
                $(filho).attr("data-destino",page.opcoes[i].destino);
                if(page.opcoes[i].cmd){
                    $(filho).attr("data-cmd",page.opcoes[i].cmd);
                }
                filho.textContent = page.opcoes[i].mensagem;
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

        var nextTurn = combate3();

        $(".btn-next").on('click',function(){
            nextTurn.proximo();
        });
    
        $("#area-sketch button").off();
        // $("#area-sketch button").on('click',function(){   
        //    combate2(page.pos_combate);
        // });
    }
    else{
        $(".combate-container").css("display","none");
    }

    if(page.teste){
        
        $(".teste").css('display','block');
        $("p.teste").attr("data-teste",page.teste);


    }
}

//Listener de click das opções das páginas             
$(document).on("click", ".opcao", function(){
    
    if($(this).hasClass("desabilitado")){
        event.preventDefault();
    }else{
        pagina_start++;
        if($(this).attr("data-cmd")){
            executaComando($(this).attr("data-cmd"));    
        }        
        atualizaPagina(retornaPagina(pagina_start));
        // var vapara = $(this).attr("data-destino");
        // console.log(vapara);
        // atualizaPagina(retornaPagina(vapara));
    }
      
});
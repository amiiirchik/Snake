"use strict";
    //Привязываем нашим переменным кнопки из HTML
    let game_mode = document.getElementById('game_mode_tittle'),
        solo = document.getElementById('solo'),
        coop = document.getElementById('coop'),

        solo_name = document.getElementById('solo-name'),
        solo_player = document.getElementById('solo-player'),
        solo_next = document.getElementById('solo-next'),

        difficulty = document.getElementById('difficulty'),
        easy = document.getElementById('easy'),
        hard = document.getElementById('hard'),

        multi_player = document.getElementById('multi-player'),
        player1 = document.getElementById('player1'),
        player2 = document.getElementById('player2'),
        multi_players_next = document.getElementById('multi-players-next'),

        modal_window = document.querySelector('.modal-window'),
        header = document.querySelector('.header'),
        main = document.querySelector('.main'),
        wrapper = document.querySelector('.wrapper'),
        span_player1 = document.getElementById('span-player1'),
        span_player2 = document.getElementById('span-player2'),

        p_player1 = document.getElementById('p-player1'),
        p_player2 = document.getElementById('p-player2');


    // Функции, вызванные при нажатии на выбор соло или кооп режима с задержкой в переходе
    solo.addEventListener('click', ()=> {
        // setTimeout(Solo, 2000);
        Solo();
    });

    coop.addEventListener('click', ()=> {
        // setTimeout(Coop, 2000);
        Coop();
    });


    // Перменные для задержки вызова функции при нажатии на кнопки
    // let SoloTimeOut = setTimeout(Solo, 2000);
    // let CoopTimeOut = setTimeout(Coop, 2000);


    //Переход из одиночной игры в выбор режима сложности
    function SoloNext() {
        // Валидация инпута при клике на кнопку
        if (solo_player.value === null || solo_player.value.length == 0 || solo_player.value.length > 20){
            alert('Введите корректное значение, с количеством символом от 0 до 20!');
        }
        else {

            difficulty.style.display = 'block';
            easy.style.display = 'block';
            hard.style.display = 'block';

            solo_name.style.display = 'none';
            solo_player.style.display = 'none';
            solo_next.style.display = 'none';

        }
    }

    //Переход из кооп режима в выбор режима сложности
    function CoopNext() {
        // Валидация инпута при клике на кнопку
        if ((player1.value === null || player1.value.length == 0 || player1.value.length > 20) || (player2.value === null || player2.value.length == 0 || player2.value.length > 20)){
            alert('Проверьте оба ли игрока ввели корректное значение, с количеством символом от 0 до 20!');
        }
        else{

            multi_player.style.display = 'none';
            player1.style.display = 'none';
            player2.style.display = 'none';
            multi_players_next.style.display = 'none';

            difficulty.style.display = 'block';
            easy.style.display = 'block';
            hard.style.display = 'block';

        }
    }


    // Одиночная игра
  function Solo() {
        // document.querySelector('.wrapper').style.background = 'none';
        game_mode.style.display ='none';
        solo.style.display = 'none';
        coop.style.display = 'none';


        solo_name.style.display = 'block';
        solo_player.style.display = 'block';
        solo_next.style.display = 'block';

        solo_next.addEventListener('click', ()=>{
            // setTimeout(SoloNext, 2000);
            SoloNext();
        });

      EasyGameSoloPlay()
    }


    // Кооп
    function Coop(){

        game_mode.style.display ='none';
        solo.style.display = 'none';
        coop.style.display = 'none';


        multi_player.style.display = 'block';
        player1.style.display = 'block';
        player2.style.display = 'block';
        multi_players_next.style.display = 'block';


        multi_players_next.addEventListener('click', ()=>{
            // setTimeout(CoopNext,2000);
            CoopNext();
        });

        EasyGameSCoopPlay()
    }



    function EasyGameSoloPlay() {
        easy.addEventListener('click', ()=> {
            EasyGameSolo();
            GameStartSoloPlayer1()
        });
    }

    function EasyGameSCoopPlay() {
        easy.addEventListener('click', ()=> {
            EasyGameCoop();
            GameStartCoopPlayers()
        });
    }

function EasyGameSolo() {
        wrapper.style.background = 'none';
        modal_window.style.display = 'none';
        header.style.display = 'flex';
        main.style.display = 'flex';

        span_player1.style.display = 'block';
        p_player1.textContent = solo_player.value;
    }

    function EasyGameCoop() {

        wrapper.style.background = 'none';
        modal_window.style.display = 'none';
        header.style.display = 'flex';
        main.style.display = 'flex';

        span_player1.style.display = 'block';
        span_player2.style.display = 'block';

        p_player1.textContent = player1.value;
        p_player2.textContent = player2.value;

    }

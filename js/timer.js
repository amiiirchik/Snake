// таймер игры
let gameTimerP = document.querySelector('#p-timer');

let date = new Date(0, 0, 0, 0, 1, 0, 0);

let seconds, minutes;

easy.addEventListener('click', gameTimer);

function gameTimer(){
  let gameTimerId = setInterval(function(){
    date.setSeconds(date.getSeconds() - 1);
    gameTimerP.textContent = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
    
    seconds = date.getSeconds();
    minutes = date.getMinutes();

    if(minutes === 0 && seconds === 0) {
      clearInterval(game);        //Остановка лупа игры
      clearInterval(gameTimerId);    //Остановка времени
      gameTimerP.textContent = 'Игра окончена';
      setTimeout(()=>{ location.reload(); }, 4000);
    }
  }, 1000);



  function addZero(n){
    if (n < 10){
      return '0'+n;
    } else {
      return ''+n;
    }
  }
}
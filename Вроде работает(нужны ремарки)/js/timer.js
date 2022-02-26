

// let gameTimerP = document.querySelector('p-timer');
// //
// //
// // easy.addEventListener('click', gameTimer);
// // let date = new Date(0,0, 0, 0,0,5,0);
// // let seconds = date.getSeconds();
// //
// //
// // function gameTimer(){
// //   let gameTimerId = setInterval(function(){
// //     date.setSeconds(date.getSeconds()-1);
// //     gameTimerP.textContent = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
// //   }, 1000);
// //
// //
// // stopTimer();
// //
// //   function stopTimer(){
// //     if(date.getSeconds() <= '00') {
// //       clearInterval(gameTimerId);
// //     }
// //   }
// //   function addZero(n){
// //     if (n<10){
// //       return '0'+n;
// //     } else {
// //       return ''+n;
// //     }
// //   }
// // }


// таймер игры
let gameTimerP = document.querySelector('#p-timer');

let date = new Date(0,0, 0, 0,0,10,0);
let seconds = date.getSeconds();
let minutes = date.getMinutes();

easy.addEventListener('click', gameTimer);
function gameTimer(){
  let gameTimerId = setInterval(function(){

    date.setSeconds(date.getSeconds()-1);
    gameTimerP.textContent = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
  }, 1000);

  stopTimer();


  function stopTimer(){
    if(seconds <= 0) {
      clearInterval(gameTimerId);
      gameTimerP.textContent = 'Игра окончена';
    }
  }


  function addZero(n){
    if (n<10){
      return '0'+n;
    } else {
      return ''+n;
    }
  }


}
"use strict";

// Главное Меню Игры

let mainGameMenu = document.getElementById('mainGameMenu');
let mainGameMenuContainer = document.querySelector('.mainGameMenuContainer');
let singlePlayerButton = document.getElementById('singlePlayerButton');
let multiPlayerButton = document.getElementById('multiPlayerButton');

// Меню Выбора Имени

let selectNickNameMenu = document.getElementById('selectNickNameMenu');
let singleNickNameInput = document.getElementById('singleNickNameInput');
let singleNickNameInputWarning = document.getElementById('singleNickNameInputWarning');
let selectNickNameNextButton = document.getElementById('selectNickNameNextButton');
let selectNickNameBackButton = document.getElementById('selectNickNameBackButton');
let selectNickNameNextButtonPressElement = document.getElementById('selectNickNameNextButtonPressElement');
let selectNickNameNextButtonPlateElement = document.getElementById('selectNickNameNextButtonPlateElement');

// Переход в Меню Выбора Имени Одиночной Игры из Главного Меню

singlePlayerButton.addEventListener('click', StartSingleOptions);
function StartSingleOptions()
{
    mainGameMenu.classList.toggle('hidden');
    selectNickNameMenu.classList.toggle('hidden');
}

// Возвращение в Главное Меню из Меню Выбора Имени

selectNickNameBackButton.addEventListener('click', ReturnMainMenu);
function ReturnMainMenu()
{
    mainGameMenu.classList.toggle('hidden');
    selectNickNameMenu.classList.remove('hidden');
    selectDifficultyMenu.classList.remove('hidden');
}

// Валидация Имени в Меню Выбора Имени Одиночной Игры

singleNickNameInput.addEventListener('change', singleNickNameValidation);
function singleNickNameValidation()
{
    let checkString;
    let singleNickName;
    let bannedSymbols = 0;
    let maxInputValueLengthFlag;
    let minInputValueLengthFlag;
    let containTrueSymbolsFlag;
    checkString = singleNickNameInput.value;
    if (checkString.length < 5)
    {
        singleNickNameInputWarning.classList.add('inputWarningAttention');
        singleNickNameInputWarning.textContent = 'Ваше имя не может содержать меньше 5 символов!';
        selectNickNameNextButtonPressElement.classList.add('buttonOffPressElement');
        selectNickNameNextButtonPlateElement.classList.add('buttonOffPlateElement');
        selectNickNameNextButton.removeEventListener('click', SelectDifficulty);
        maxInputValueLengthFlag = false;
    }
    if (checkString.length > 4)
    {
        singleNickNameInputWarning.classList.remove('inputWarningAttention');
        maxInputValueLengthFlag = true;

        if (checkString.length > 20)
        {
            singleNickNameInputWarning.classList.add('inputWarningAttention');
            singleNickNameInputWarning.textContent = 'Ваше имя не может содержать больше 20 символов!';
            selectNickNameNextButtonPressElement.classList.add('buttonOffPressElement');
            selectNickNameNextButtonPlateElement.classList.add('buttonOffPlateElement');
            selectNickNameNextButton.removeEventListener('click', SelectDifficulty);
            minInputValueLengthFlag = false;
        }
        if (checkString.length < 21)
        {
            singleNickNameInputWarning.classList.remove('inputWarningAttention');
            minInputValueLengthFlag = true;
        }
    }
    if (maxInputValueLengthFlag === true && minInputValueLengthFlag === true)
    {
        for (let i = 0; i < checkString.length; i++)
        {
            if (checkString[i] === '!' || checkString[i] === '?' || checkString[i] === '.' || checkString[i] === ',' || checkString[i] === ' '|| checkString[i] === ':'|| checkString[i] === ';' || checkString[i] === '/')
            {
                singleNickNameInputWarning.classList.add('inputWarningAttention');
                singleNickNameInputWarning.textContent = 'Ваше имя не может содержать символы «!» «?» «:» «/» « »!';
                selectNickNameNextButtonPressElement.classList.add('buttonOffPressElement');
                selectNickNameNextButtonPlateElement.classList.add('buttonOffPlateElement');
                selectNickNameNextButton.removeEventListener('click', SelectDifficulty);
                containTrueSymbolsFlag = false;
                bannedSymbols++;
            }
            if (bannedSymbols === 0)
            {
                singleNickNameInputWarning.classList.remove('inputWarningAttention');
                containTrueSymbolsFlag = true;
            }
        }
    }
    if (maxInputValueLengthFlag === true && minInputValueLengthFlag === true && containTrueSymbolsFlag === true)
    {
        // Доступ к Меню Выбора Сложности Игры
        selectNickNameNextButtonPressElement.classList.remove('buttonOffPressElement');
        selectNickNameNextButtonPlateElement.classList.remove('buttonOffPlateElement');
        selectNickNameNextButton.addEventListener('click', SelectDifficulty);
        singleNickName = checkString;
    }
}

// Меню Выбора Сложности

let selectDifficultyMenu = document.getElementById('selectDifficultyMenu');
let selectDifficultyStartButton = document.getElementById('selectDifficultyStartButton');
let selectDifficultyBackButton = document.getElementById('selectDifficultyBackButton');
let difficultyButton = document.getElementById('difficultyButton');
let difficultyButtonPress = document.getElementById('difficultyButtonPress');
let difficultyButtonPlate = document.getElementById('difficultyButtonPlate');
let difficultySmile = document.getElementById('difficultySmile');
let selectDifficultyContainer = document.getElementById('selectDifficultyContainer');

// Переход в Меню Выбора Сложности Игры из Меню Выбора Имени Одиночной Игры

function SelectDifficulty()
{
    selectDifficultyMenu.classList.toggle('hidden');
    selectNickNameMenu.classList.toggle('hidden');
    difficultyButton.addEventListener('click', MediumDifficulty);
    selectDifficultyStartButton.addEventListener('click', GameStartSoloPlayer1)
}

//Легкая сложность
function EasyDifficulty()
{
    difficultyButton.classList.toggle('difficultyHardButton');
    difficultyButton.classList.toggle('difficultyEasyButton');
    difficultyButton.classList.toggle('redDifficultyButtonAnimation');
    difficultyButtonPress.classList.toggle('redPress');
    difficultyButtonPlate.classList.toggle('redPlate');
    difficultyButtonPress.classList.toggle('greenPress');
    difficultyButtonPlate.classList.toggle('greenPlate');
    selectDifficultyBackButton.classList.toggle('right');
    selectDifficultyBackButton.classList.toggle('bottom');
    difficultySmile.setAttribute('src','../img/EasyDifficulty.png');
    difficultyButton.removeEventListener('click', EasyDifficulty);
    difficultyButton.addEventListener('click', MediumDifficulty);
    selectDifficultyContainer.style.backgroundColor = '#30D030';
    selectDifficultyContainer.style.flexDirection = 'row';
}

//Средняя сложность
function MediumDifficulty()
{
    difficultyButton.classList.toggle('difficultyEasyButton');
    difficultyButton.classList.toggle('yellowDifficultyButtonAnimation');
    difficultyButtonPress.classList.toggle('greenPress');
    difficultyButtonPlate.classList.toggle('greenPlate');
    difficultyButtonPress.classList.toggle('yellowPress');
    difficultyButtonPlate.classList.toggle('yellowPlate');
    difficultySmile.setAttribute('src','../img/MediumDifficulty.png');
    difficultyButton.removeEventListener('click', MediumDifficulty);
    difficultyButton.addEventListener('click', HardDifficulty);
    selectDifficultyContainer.style.backgroundColor = '#FFE040';
}

//Высокая сложность
function HardDifficulty()
{
    difficultyButton.classList.toggle('difficultyHardButton');
    difficultyButton.classList.toggle('yellowDifficultyButtonAnimation');
    difficultyButton.classList.toggle('redDifficultyButtonAnimation');
    difficultyButtonPress.classList.toggle('yellowPress');
    difficultyButtonPlate.classList.toggle('yellowPlate');
    difficultyButtonPress.classList.toggle('redPress');
    difficultyButtonPlate.classList.toggle('redPlate');
    selectDifficultyBackButton.classList.toggle('right');
    selectDifficultyBackButton.classList.toggle('bottom');
    difficultySmile.setAttribute('src','../img/HardDifficulty.png');
    difficultyButton.removeEventListener('click', HardDifficulty);
    difficultyButton.addEventListener('click', EasyDifficulty);
    selectDifficultyContainer.style.backgroundColor = '#F05050';
    selectDifficultyContainer.style.flexDirection = 'column';
}

// Возвращение в Меню Выбора Имени из Меню Выбора Сложности

selectDifficultyBackButton.addEventListener('click', ReturnNickNameMenu)
selectNickNameBackButton.addEventListener('click', ReturnNickNameMenu);
function ReturnNickNameMenu()
{
    selectDifficultyMenu.classList.toggle('hidden');
    selectNickNameMenu.classList.toggle('hidden');
}

function Solo() {
    // document.querySelector('.wrapper').style.background = 'none';
    game_mode.style.display ='none';
    solo.style.display = 'none';
    coop.style.display = 'none';


    solo_name.style.display = 'block';
    solo_player.style.display = 'block';
    solo_next.style.display = 'block';

    mainGameMenuContainer.classList.add('hidden');

    solo_next.addEventListener('click', ()=>{
        // setTimeout(SoloNext, 2000);
        SoloNext();
    });

    EasyGameSoloPlay()
}
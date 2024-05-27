let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];
const FLASH_DURATION = 300;
const NEXT_LEVEL_DELAY = 1000;
const GAME_OVER_BG_IMAGE = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQTzkIscF3UA_eu6rMLPnbRx4RLb61Cnbe4tuYJLObg&s')";
const DEFAULT_BG_IMAGE = "url('https://www.shutterstock.com/shutterstock/photos/2179928869/display_1500/stock-photo-students-and-teacher-having-fun-in-class-kids-playing-charades-or-simon-says-game-at-school-small-2179928869.jpg')";

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, FLASH_DURATION);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, FLASH_DURATION);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomClr = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomClr}`);
    gameSeq.push(randomClr);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start the game.`; 
        document.body.style.backgroundImage = GAME_OVER_BG_IMAGE;
        
        setTimeout(() => {
            console.log("Reverting background image to default");
            document.body.style.backgroundImage = DEFAULT_BG_IMAGE;
        }, FLASH_DURATION);
        
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "green", "red", "purple"];

let starter = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector('h2');

document.addEventListener('keypress', function () {

    if (starter == false) {
        console.log('game started')
        starter = true;

        levelUp();
        allBtns();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    level++;
    userSeq = [];
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if (highScore > level) {
            h2.innerHTML = `Game over! Your Score  <b>${level} and</b><br> High Score ${highScore}. <br> Press any key to start.`;
        } else {
            highScore = level;
            h2.innerHTML = `Game over! Your Score is ${level}<br>Congrats! You break the High Score. <br> Press any key to start.`;
        }

        let body = document.querySelector('body');
        body.style.backgroundColor = "red"
        setTimeout(function () {
            body.style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

function btnPress() {
    btnFlash(this);

    let userColor = (this.getAttribute("id"));
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
};

function allBtns() {
    let allBtns = document.querySelectorAll(".btn-container div");

    for (let btn of allBtns) {
        btn.addEventListener('click', btnPress);
    }
}

function reset() {
    starter = false;
    userSeq = [];
    gameSeq = [];
    level = 0;

    let allBtns = document.querySelectorAll(".btn-container div");
    for (let btn of allBtns) {
        btn.removeEventListener('click', btnPress);
    }
}

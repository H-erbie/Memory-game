window.addEventListener("load", () => {
  game.memoryGame();
});

const game = {
  //image sources
  imgs: [
    "/images/assets/flutter.png",
    "/images/assets/git.png",
    "/images/assets/graphql.png",
    "/images/assets/html.png",
    "/images/assets/javascript.png",
    "/images/assets/mobile.png",
    "/images/assets/node.png",
    "/images/assets/python.png",
    "/images/assets/react.png",
    "/images/assets/redux.png",
    "/images/assets/sass.png",
    "/images/assets/typescript.png",
    "/images/assets/flutter.png",
    "/images/assets/git.png",
    "/images/assets/graphql.png",
    "/images/assets/html.png",
    "/images/assets/javascript.png",
    "/images/assets/mobile.png",
    "/images/assets/node.png",
    "/images/assets/python.png",
    "/images/assets/react.png",
    "/images/assets/redux.png",
    "/images/assets/sass.png",
    "/images/assets/typescript.png",
  ],
  memoryGame: function () {
    let btn = document.querySelectorAll(".btn");
    let overlay = document.querySelector(".overlay");
    let imgSrcs = this.imgs;
    let score = document.querySelector(".score");
    let count = document.querySelector(".countDown");
    let gameOn = document.querySelector(".game");
    let gameOver = document.querySelector(".game-over");
    let youWin = document.querySelector(".you-win");
    let imgs = document.querySelector(".imgs");
    let totalScore = document.querySelector("#totalScore");
    let minutes = 2;
    let secs = 60;
    let counter = "";
    let spare = document.querySelector(".toSpare");
    score.textContent = 0;

    //randomize the img sources
    function randomizeSrcs() {
      imgSrcs.sort(() => 0.5 - Math.random());
      //console.log(imgSrcs);
      score.textContent = 0;
    }

    //start game
    function gamePlay() {
      overlay.classList.remove("rolldown");
      overlay.classList.add("rollup");
      counter = setInterval(countDown, 1000);
      startGame();
      countDown();
    }

    //start countdown
    function countDown() {
      if (secs == 0) {
        secs = 59;
        minutes--;
      } else if (secs == 60) {
        minutes--;
      }
      secs--;
      if (secs == 0 && minutes == 0) {
        clearInterval(counter);
      }

      displayTime(minutes, secs);
    }

    //functionalities for each button
    btn.forEach((btnn) => {
      switch (btnn.textContent) {
        case "Play":
          btnn.addEventListener("click", () => {
            randomizeSrcs();
            createImage();
            gamePlay();
          });
          break;
        case "Play Again?":
          btnn.addEventListener("click", () => {
            minutes = 2;
            secs = 60;
            imgs.textContent = "";
            randomizeSrcs();
            createImage();
            gamePlay();
          });
          break;
        case "Reset":
          btnn.addEventListener("click", () => {
            minutes = 2;
            secs = 60;
            imgs.textContent = "";
            randomizeSrcs();
            createImage();
            clearInterval(counter);
            gamePlay();
          });
          break;
        default:
          break;
      }
    });

    //show countdown
    function displayTime(min, sec) {
      min < 10 ? (min = `0${minutes}`) : min;
      sec < 10 ? (sec = `0${secs}`) : sec;
      min == 0 && sec < 10
        ? (count.style.color = "red")
        : (count.style.color = "black");
      if (min == 0 && sec == 0) {
        gameOn.classList.add("disappear");
        youWin.classList.remove("appear");
        youWin.classList.add("disappear");
        gameOver.classList.remove("disappear");
        gameOver.classList.add("appear");
        overlay.classList.remove("rollup");
        totalScore.textContent = `Score: ${score.textContent}`;
        overlay.classList.add("rolldown");
      }
      count.textContent = `${min} : ${sec}`;
    }

    //create cards
    function createImage() {
      for (let i = 0; i < imgSrcs.length; i++) {
        let image = document.createElement("img");
        image.src = "images/assets/about04.png";
        image.setAttribute("data-id", i);
        imgs.append(image);
      }
    }

    function startGame() {
      let boards = document.querySelectorAll("img");
      let dataIds = [];
      let displayNone = [];
      boards.forEach((board, Bindex) => {
        board.addEventListener("click", () => {
          dataIds.push(Bindex);
          if (dataIds.length >= 3) {
            dataIds = [];
            dataIds.push(Bindex);
          }
          imgSrcs.forEach(function (item, Imgindex) {
            if (Bindex == Imgindex) {
              //show image when card is clicked
              board.src = imgSrcs[Imgindex];
              //check if two clicks are made
              if (dataIds.length == 2) {
                //check if clicked items' data-ids are not equal but their srcs are
                if (
                  boards[dataIds[0]] != boards[dataIds[1]] &&
                  boards[dataIds[0]].src === boards[dataIds[1]].src
                ) {
                  //if clicks are equal add 'display: none' to both card(s)
                  setTimeout(() => {
                    boards[dataIds[0]].style.display = "none";
                    displayNone.push(boards[dataIds[0]]);
                    boards[dataIds[1]].style.display = "none";
                    displayNone.push(boards[dataIds[0]]);
                    score.textContent++;
                    if (displayNone.length == 24) {
                      spare.textContent = `Congrats, bruh. You made it with ${count.textContent} seconds to spare`;
                      gameOn.classList.add("disappear");
                      youWin.classList.add("appear");
                      gameOver.classList.remove("appear");
                      gameOver.classList.add("disappear");
                      overlay.classList.remove("rollup");
                      overlay.classList.add("rolldown");
                      clearInterval(counter);
                      totalScore.textContent = `Score: ${score.textContent}`;
                    }
                  }, 500);
                }
                //if clicked items are not equal set them back to way they were
                else {
                  setTimeout(() => {
                    boards[dataIds[0]].src = "images/assets/about04.png";
                    boards[dataIds[1]].src = "images/assets/about04.png";
                  }, 500);
                }
              }
            }
          });
        });
      });
    }
  },
};

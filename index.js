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
    function loadImages() {
      imgSrcs.sort(() => 0.5 - Math.random());
      console.log(imgSrcs);
      score.textContent = 0;
    }
    function gamePlay() {
      overlay.classList.remove("rolldown");
      overlay.classList.add("rollup");

      counter = setInterval(countDown, 1000);
      PlayGame();
      function countDown() {
        if (secs == 0) {
          secs = 59;
          minutes--;
        } else if (secs == 60) {
          minutes--;
        }
        secs--;
        if (secs == 0 && minutes == 0) {
          console.log(count.textContent);
          clearInterval(counter);
        }

        displayTime(minutes, secs);
      }
      countDown();
    }
    btn.forEach((btnn) => {
      switch (btnn.textContent) {
        case "Play":
          btnn.addEventListener("click", () => {
            loadImages();
            createImage();
            gamePlay();
          });
          break;
        case "Play Again?":
          btnn.addEventListener("click", () => {
            minutes = 2;
            imgs.textContent = "";
            loadImages();
            createImage();
            gamePlay();
          });
          break;
        case "Reset":
          btnn.addEventListener("click", () => {
            minutes = 2;
            secs = 60;
            imgs.textContent = "";
            loadImages();
            createImage();
            clearInterval(counter);
            gamePlay();
          });
          break;
        default:
          break;
      }
    });
    function displayTime(min, sec) {
      min < 10 ? (min = `0${minutes}`) : min;
      sec < 10 ? (sec = `0${secs}`) : sec;
      min == 0 && sec < 10
        ? (count.style.color = "red")
        : (count.style.color = "black");
      if (min == 0 && sec == 0) {
        gameOn.classList.add("disappear");
        youWin.classList.add("disappear");
        gameOver.classList.remove("disappear");
        gameOver.classList.add("appear");
        overlay.classList.remove("rollup");
        totalScore.textContent = `Score: ${score.textContent}`;
        overlay.classList.add("rolldown");
      }
      count.textContent = `${min} : ${sec}`;
    }
    function createImage() {
      for (let i = 0; i < imgSrcs.length; i++) {
        let image = document.createElement("img");
        image.src = "images/assets/about04.png";
        image.setAttribute("data-id", i);
        imgs.append(image);
      }
    }
    function PlayGame() {
      let boards = document.querySelectorAll("img");
      let dataIds = [];
      let displayNone = [];
      boards.forEach((board, Bindex) => {
        board.addEventListener("click", (e) => {
          dataIds.push(Bindex);
          if (dataIds.length >= 3) {
            dataIds = [];
            dataIds.push(Bindex);
          }
          imgSrcs.forEach(function (item, Imgindex) {
            if (Bindex == Imgindex) {
              board.src = imgSrcs[Imgindex];

              if (dataIds.length == 2) {
                console.log(dataIds);
                //check if boardIds items are not equal
                if (
                  boards[dataIds[0]] != boards[dataIds[1]] &&
                  boards[dataIds[0]].src === boards[dataIds[1]].src
                ) {
                  setTimeout(() => {
                    boards[dataIds[0]].style.display = "none";
                    displayNone.push(boards[dataIds[0]]);
                    boards[dataIds[1]].style.display = "none";
                    displayNone.push(boards[dataIds[0]]);
                    console.log(displayNone);
                    score.textContent++;
                    if (displayNone.length == 24) {
                      spare.textContent = `Congrats, bruh. You made it with ${count.textContent} seconds to spare`;
                      gameOn.classList.add("disappear");
                      youWin.classList.add("appear");
                      gameOver.classList.remove("appear");
                      gameOver.classList.add("disappear");
                      overlay.classList.remove("rollup");
                      overlay.classList.add("rolldown");
                      console.log(minutes);
                      clearInterval(counter);

                      totalScore.textContent = `Score: ${score.textContent}`;
                    }
                  }, 500);
                } else {
                  setTimeout(() => {
                    boards[dataIds[0]].src = "images/assets/about04.png";
                    boards[dataIds[1]].src = "images/assets/about04.png";
                  }, 500);
                }

                console.log(document.querySelectorAll("img").length);
              }
            }
          });
        });
      });
    }
  },
};

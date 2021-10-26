window.onload = function() {
  let boardContainer = [];
  let attemptsCounter = 0;
  let boardCompleted = false;
  let boardDiv = document.getElementById('board');
  let restartButton = document.getElementById('restart');
  let helpButton = document.getElementById('help');

  let createGameForm = document.forms['createGameForm'];
  let attemptsPara = document.getElementById('attempts');
  restartButton.style.display = 'none';
  helpButton.style.display = 'none';
  createGameForm.onsubmit = e => newGame(e);
  let StepsToSolution = [];
  restartButton.onclick = e => restartGame(e);
  helpButton.onclick = e => showHelp(e);
  var choice;
  function setChoice(e) {
    e.preventDefault();
    choice = e.target.choice.value;
  }



  function newGame(e) {
    e.preventDefault();
    setChoice(e)
    createGame();
    createGameForm.style.display = 'none';
    restartButton.style.display = 'inline';
    attemptsPara.style.display = 'block';
    helpButton.style.display = 'inline';
    console.log(e.target.choice.value);
  }

  function showGameForm(e) {
    e.preventDefault();
    while (boardDiv.hasChildNodes()) {
      boardDiv.removeChild(boardDiv.lastChild);
    }
    createGameForm.style.display = 'inline';
    attemptsPara.style.display = 'none';
    restartButton.style.display = 'none';
  }

  function restartGame(e) {
    e.preventDefault();
    createGame();
  }

  function createGame() {
    boardContainer = createBoard();
    attemptsCounter = 0;
    attemptsPara.innerHTML = `Ruchy: ${attemptsCounter}`;
    boardCompleted = false;
    displayBoard(boardContainer);
  }

  function showHelp(e) {
    e.preventDefault();
    userClick(
        Number(StepsToSolution.at(-1)[0]), Number(StepsToSolution.at(-1)[1]));
  }

  function userClick(x, y) {
    if (!boardCompleted) {
      attemptsCounter++;
      attemptsPara.innerHTML = `Ruchy: ${attemptsCounter}`;
      updateBoard(boardContainer, x, y);
      if (checkBoardCompleted(boardContainer)) {
        boardCompleted = true;
        attemptsPara.innerHTML =
            `Gratulacje! Udało ci się w  ${attemptsCounter} Ruchach.`;
      }
      displayBoard(boardContainer);
    }
  }

  function displayBoard(board) {
    while (boardDiv.hasChildNodes()) {
      boardDiv.removeChild(boardDiv.lastChild);
    }
    for (i = 0; i < 7; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      for (j = 0; j < 7; j++) {
        let boardItem = document.createElement('div');
        if (Number(board[i][j]) === 0) {
          boardItem.className = 'boardItemRed';
        }
        if (Number(board[i][j]) === 1) {
          boardItem.className = 'boardItemBlue';
        }
        if (Number(board[i][j]) === 2) {
          boardItem.className = 'boardItemGreen';
        }
        boardItem.onclick = userClick.bind(undefined, i, j);
        row.appendChild(boardItem);
      }
      boardDiv.appendChild(row);
    }
  }

  function createBoard() {
    let newBoard = new Array(7);

    for (var i = 0; i < 7; i++) {
      newBoard[i] = new Array(7).fill(0);
    }
    for (var i = 0; i < 10; i++) {
      addRandomMovesToMap(newBoard)
    }
    return newBoard;
  }

  function addRandomMovesToMap(board) {
    x = Math.floor(Math.random() * 7);
    y = Math.floor(Math.random() * 7);
    updateBoard(board, x, y)
  }

  function addMoveToList(x, y) {  // in order to reverse one move, we have to
                                  // make 2 moves on the same teil
    StepsToSolution.push([x, y])
    StepsToSolution.push([x, y])
  }

  function updateBoard(board, x, y) {
    console.log(choice);
    if (Number(choice) == 1) {
      updateBoard1(board, x, y);
    } else if (Number(choice) == 2) {
      updateBoard2(board, x, y);
    } else {
      updateBoard3(board, x, y);
    }
  }

  function updateBoard1(board, x, y) {
    board[x][y] = (board[x][y] += 1) % 3;
    if (x > 0) {
      board[x - 1][y] = (board[x - 1][y] += 1) % 3;
    }
    if (x < board.length - 1) {
      board[x + 1][y] = (board[x + 1][y] += 1) % 3;
    }
    if (y > 0) {
      board[x][y - 1] = (board[x][y - 1] += 1) % 3;
    }
    if (y < board[0].length - 1) {
      board[x][y + 1] = (board[x][y + 1] += 1) % 3;
    }

    if (StepsToSolution.length > 0) {
      if (Number(StepsToSolution.at(-1)[0]) == Number(x) &&
          Number(StepsToSolution.at(-1)[1]) == Number(y)) {
        console.log(StepsToSolution.at(-1), 'popped');

        StepsToSolution.pop();
      } else {
        addMoveToList(x, y);
        console.log([x, y], 'added');
      }
    } else {
      addMoveToList(x, y);
    }
  }

  function updateBoard2(board, x, y) {
    board[x][y] = (board[x][y] += 1) % 3;
    if (x > 0 && y > 0) {
      board[x - 1][y - 1] = (board[x - 1][y - 1] += 1) % 3;
    }
    if (x < board.length - 1) {
      board[x + 1][y + 1] = (board[x + 1][y + 1] += 1) % 3;
    }
    if (y > 0) {
      board[x][y - 1] = (board[x][y - 1] += 1) % 3;
    }
    if (y < board[0].length - 1) {
      board[x][y + 1] = (board[x][y + 1] += 1) % 3;
    }

    if (StepsToSolution.length > 0) {
      if (Number(StepsToSolution.at(-1)[0]) == Number(x) &&
          Number(StepsToSolution.at(-1)[1]) == Number(y)) {
        console.log(StepsToSolution.at(-1), 'popped');

        StepsToSolution.pop();
      } else {
        addMoveToList(x, y);
        console.log([x, y], 'added');
      }
    } else {
      addMoveToList(x, y);
    }
  }


  function updateBoard3(board, x, y) {
    board[x][y] = (board[x][y] += 1) % 3;
    if (x > 0) {
      board[x - 1][y] = (board[x - 1][y] += 1) % 3;
    }
    if (x < board.length - 1) {
      board[x + 1][y] = (board[x + 1][y] += 1) % 3;
    }
    if (y > 0) {
      board[x][y - 1] = (board[x][y - 1] += 1) % 3;
    }
    if (y < board[0].length - 1) {
      board[x][y + 1] = (board[x][y + 1] += 1) % 3;
    }
    if (x < board.length - 1 && y < board[0].length - 1) {
      board[x + 1][y + 1] = (board[x + 1][y + 1] += 1) % 3;
    }
    if (y > 0 && x > 0) {
      board[x - 1][y - 1] = (board[x - 1][y - 1] += 1) % 3;
    }

    if (StepsToSolution.length > 0) {
      if (Number(StepsToSolution.at(-1)[0]) == Number(x) &&
          Number(StepsToSolution.at(-1)[1]) == Number(y)) {
        console.log(StepsToSolution.at(-1), 'popped');

        StepsToSolution.pop();
      } else {
        addMoveToList(x, y);
        console.log([x, y], 'added');
      }
    } else {
      addMoveToList(x, y);
    }
  }



  function checkBoardCompleted(board) {
    if (!(board.flat().includes(1)) && !(board.flat().includes(2))) {
      return true;
    }
    if (!(board.flat().includes(0)) && !(board.flat().includes(2))) {
      return true;
    }
    if (!(board.flat().includes(1)) && !(board.flat().includes(0))) {
      return true;
    }
    return false;
  }
}
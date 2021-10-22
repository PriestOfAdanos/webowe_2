window.onload = function () {
  let boardContainer = [];
  let xlength;
  let ylength;
  let attemptsCounter = 0;
  let boardCompleted = false;
  let boardDiv = document.getElementById("board");
  let restartButton = document.getElementById("restart");
  let createGameForm = document.forms["createGameForm"];
  let attemptsPara = document.getElementById("attempts");
  restartButton.style.display = 'none';
  createGameForm.onsubmit = e => newGame(e);
  restartButton.onclick = e => restartGame(e);
  let StepsToSolution = [];

  function newGame(e) {
    e.preventDefault();
    createGame();
    createGameForm.style.display = 'none';
    restartButton.style.display = 'inline';
    attemptsPara.style.display = 'block'; 
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
    boardContainer = createBoard(xlength, ylength);
    attemptsCounter = 0;
    attemptsPara.innerHTML = `Ruchy: ${attemptsCounter}`;
    boardCompleted = false;
    displayBoard(boardContainer);
  }

  function userClick(x, y) {
    if (!boardCompleted) { 
      attemptsCounter++;
      attemptsPara.innerHTML = `Ruchy: ${attemptsCounter}`;
      updateBoard(boardContainer, x, y);
      if (checkBoardCompleted(boardContainer)) {
        boardCompleted = true;
        attemptsPara.innerHTML = `Gratulacje! Udało ci się w  ${attemptsCounter} Ruchach.`;
      }
      displayBoard(boardContainer);
    }
  }

  function displayBoard(board) {
    while (boardDiv.hasChildNodes()) {
      boardDiv.removeChild(boardDiv.lastChild);
    }
    for (i=0; i<7; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      for (j=0; j<7; j++) {
        let boardItem = document.createElement('div');
        if(Number(board[i][j])===0){boardItem.className='boardItemRed';}
        if(Number(board[i][j])===1){boardItem.className='boardItemBlue';}
        if(Number(board[i][j])===2){boardItem.className='boardItemGreen';}        
        boardItem.onclick = userClick.bind(undefined, i, j);
        row.appendChild(boardItem);
      }
      boardDiv.appendChild(row);
    }
    console.log(StepsToSolution);
  }

  function createBoard(x, y) {
    let newBoard =  new Array(7);

    for (var i = 0; i < 7; i++) {
      newBoard[i] = new Array(7).fill(0);
    }
    for (var i = 0; i < 100; i++) {
      addRandomMovesToMap(newBoard)
    }
    return newBoard;
  }

  function addRandomMovesToMap(board){
    x = Math.floor(Math.random() * 7);
    y = Math.floor(Math.random() * 7);
    updateBoard(board,x,y)
    addMoveToList(x,y);
  }

  function addMoveToList(x,y){// in order to reverse one move, we have to make 2 moves on the same teil
    StepsToSolution.push((x,y))
    StepsToSolution.push((x,y))
  }

  function updateBoard(board, x, y) {
    board[x][y] = (board[x][y]+=1)%3;
    if (x > 0)                  { board[x-1][y] = (board[x-1][y]+=1)%3; }
    if (x < board.length-1)     { board[x+1][y] = (board[x+1][y]+=1)%3; }
    if (y > 0)                  { board[x][y-1] = (board[x][y-1]+=1)%3; }
    if (y < board[0].length-1)  { board[x][y+1] = (board[x][y+1]+=1)%3; }

    if(StepsToSolution.at(-1)===(x,y)){
      StepsToSolution.pop();
    }else if(StepsToSolution.at(-1)!=(x,y)){
      addMoveToList(x,y);
    }
  }

  function checkBoardCompleted(board) {
    for (i=0; i<board.length; i++) {
      for (j=0; j<board[0].length; j++) {
        if (board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
}
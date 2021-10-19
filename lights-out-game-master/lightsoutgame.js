// Ensure the DOM is loaded before attempting to mutate or add elements.
window.onload = function () {

  // Use a multidemnsional array to represent the x and y respectively 
  // where the value is a boolean to represent whether the light is on
  let boardContainer = [];

  let xlength;
  let ylength;


  let attemptsCounter = 0;
  let boardCompleted = false;

  let boardDiv = document.getElementById("board");
  let restartButton = document.getElementById("restart");
  let newBoardButton = document.getElementById("newboard");
  let createGameForm = document.forms["createGameForm"];
  let attemptsPara = document.getElementById("attempts");

  // Initally hide game option functionality 
  restartButton.style.display = 'none';
  newBoardButton.style.display = 'none';

  // Once DOM items are loaded attach the event handlers
  createGameForm.onsubmit = e => newGame(e);
  restartButton.onclick = e => restartGame(e);
  newBoardButton.onclick = e => showGameForm(e);

  let StepsToSolution = [];

  function newGame(e) {
    e.preventDefault();
    // Update x and y lengths
    xlength = createGameForm["width"].value;
    ylength = createGameForm["height"].value;
    createGame();
    createGameForm.style.display = 'none';
    restartButton.style.display = 'inline';
    newBoardButton.style.display = 'inline';
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
    newBoardButton.style.display = 'none';
  }

  function restartGame(e) {
    e.preventDefault();
    createGame();
  }

  function createGame() {
    // Update board container
    boardContainer = createBoard(xlength, ylength);
    // Reset counter
    attemptsCounter = 0;
    attemptsPara.innerHTML = `Attempts: ${attemptsCounter}`;
    // Reset board completed
    boardCompleted = false;
    // Finally display the board
    displayBoard(boardContainer);
  }

  function userClick(x, y) {
    if (!boardCompleted) { 
      // Update attempts counter information
      attemptsCounter++;
      attemptsPara.innerHTML = `Attempts: ${attemptsCounter}`;
      updateBoard(boardContainer, x, y);
      if (checkBoardCompleted(boardContainer)) {
        boardCompleted = true;
        let attemptText = attemptsCounter === 1 ? 'attempt' : 'attempts';
        attemptsPara.innerHTML = `Congratulations! Completed in ${attemptsCounter} ${attemptText}. Restart or update the board size to continue.`;
      }
      displayBoard(boardContainer);
    }
  }

  function displayBoard(board) {
    while (boardDiv.hasChildNodes()) {
      boardDiv.removeChild(boardDiv.lastChild);
    }
    for (i=0; i<ylength; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      for (j=0; j<xlength; j++) {
        let boardItem = document.createElement('div');
        console.log(board);
        if(board[i][j]===0){boardItem.className='boardItemRed'; console.log("aaa");}
        else if(board[i][j]===1){boardItem.className='boardItemBlue'; console.log("bbb");}
        else if(board[i][j]===2){boardItem.className='boardItemGreen'; console.log("ccc");}        
        boardItem.onclick = userClick.bind(undefined, i, j);
        row.appendChild(boardItem);
      }
      boardDiv.appendChild(row);
    }
  }

  function createBoard(x, y) {
    let newBoard =  new Array(x);

    for (var i = 0; i < x; i++) {
      newBoard[i] = new Array(x);
    }
    for(k=0;k<y;k++){//randomly make as many moves as 1 dimension of board
      addRandomMovesToMap(y)
    }
    return newBoard;

  }

  function addRandomMovesToMap(edge_length){
    x = Math.floor(Math.random() * edge_length);
    y = Math.floor(Math.random() * edge_length);
    addMoveToList(x,y);
  }

  function addMoveToList(x,y){// in order to reverse one move, we have to make 2 moves on the same teil
    StepsToSolution.push((x,y))
    StepsToSolution.push((x,y))
  }

  function updateBoard(board, x, y) {
    board[x][y] = !board[x][y];
    if (x > 0)                  { board[x-1][y] = (board[x-1][y]+=1)%3; }
    if (x < board.length-1)     { board[x+1][y] = (board[x+1][y]+=1)%3; }
    if (y > 0)                  { board[x][y-1] = (board[x][y-1]+=1)%3; }
    if (y < board[0].length-1)  { board[x][y+1] = (board[x][y+1]+=1)%3; }

    if(StepsToSolution.at(-1)===(x,y)){
      anArray.pop();
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
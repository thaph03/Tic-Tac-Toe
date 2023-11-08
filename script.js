'use strict';

const getPlayer = (playerName, symbol) => {
  return { playerName, symbol };
};

const gameBoard = () => {
  let gameData = ['', '', '', '', '', '', '', '', ''];
  const checkSymbol = (check, symbol) => {
    if (gameData[check] == '' && check >= 0 && check <= 8) {
      gameData[check] = symbol;
      return true;
    } else {
      return false;
    }
  };

  const winCon = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const findTripleDup = () => {
      for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        const [a, b, c] = combination;

        if (
          gameData[a] !== '' &&
          gameData[a] === gameData[b] &&
          gameData[a] === gameData[c]
        ) {
          return true;
        }
      }

      return false;
    };

    return findTripleDup();
  };

  const checkFull = () => {
    return !gameData.includes('');
  };

  const resetBoard = () => {
    return (gameData = ['', '', '', '', '', '', '', '', '']);
  };

  return {
    returnArray: () => {
      return gameData;
    },
    checkSymbol,
    checkFull,
    resetBoard,
    winCon,
  };
};

const Player1 = getPlayer('Laplus', 'O');
const Player2 = getPlayer('Suisei', 'X');
const gamePlay = gameBoard();

const cells = document.querySelectorAll('.cell');

const restartBtn = document.querySelector('.restart-button');
const scoreAnnounce = document.querySelector('.score-announce');
// INTERFACE
let gameOver = false;
const playerMove = (moves, playerName) => {
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (!gameOver) {
        if (gamePlay.checkSymbol(index, moves)) {
          cell.textContent = moves;
        }

        if (gamePlay.winCon()) {
          scoreAnnounce.textContent = `${playerName} has won the game!`;
          gameOver = true;
        } else if (gamePlay.checkFull()) {
          scoreAnnounce.textContent = `This is a draw! Please restart!`;
          gameOver = true;
        } else {
          if ((moves = cell.textContent === Player1.symbol)) {
            moves = Player2.symbol;
            playerName = Player2.playerName;
            scoreAnnounce.textContent = `${Player2.playerName}'s turn with ${moves}`;
          } else {
            moves = Player1.symbol;
            playerName = Player1.playerName;

            scoreAnnounce.textContent = `${Player1.playerName}'s turn with ${moves}`;
          }
        }
      }
    });
  });
};
playerMove(Player1.symbol, Player1.playerName);

restartBtn.addEventListener('click', () => {
  cells.forEach((cell) => {
    cell.textContent = '';
    gamePlay.resetBoard();
    scoreAnnounce.textContent = 'Laplus (O) vs Suisei (X) ';
    gameOver = false;
    playerMove(Player1.symbol, Player1.playerName);
  });
});

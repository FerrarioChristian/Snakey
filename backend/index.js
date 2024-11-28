import io from "./helpers/connection.js";
import { initNewGame, nextFrame } from "./game/gameInterface.js";
import { changeVelocity } from "./game/movements.js";

let gameState;
let playerNumber = 0;
let interval = null;
let readyPlayers = 0;

const connected = (socket) => {
  if (playerNumber === 0) {
    gameState = initNewGame();
    gameState.player1["id"] = socket.id;
    playerNumber++;
    console.log("Player 1 connected: " + socket.id);
  } else if (playerNumber === 1) {
    gameState.player2["id"] = socket.id;
    playerNumber++;
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    interval = setInterval(loop, 500);
    console.log("Player 2 connected: " + socket.id);
  } else {
    socket.disconnect();
    console.log("Too many players, new connection refused");
  }

  socket.on("disconnect", () => {
    playerNumber--;
    console.log("User " + socket.id + " disconnected, number of players: " + playerNumber);
  });

  socket.on("playerMoved", (data) => {
    changeVelocity(gameState, socket.id, data);
  });

  socket.on("newGame", () => {
    readyPlayers++;
    console.log(`Player ${socket.id} is ready. (${readyPlayers}/2)`);
    if (readyPlayers === 2) {
      readyPlayers = 0;
      if (interval !== null) {
        clearInterval(interval);
      }
      gameState = initNewGame(gameState);
      console.log("\nNew game started");
      interval = setInterval(loop, 500);
      io.emit("newGame");
    }
  });
};

const loop = () => {
  if (playerNumber < 2) {
    clearInterval(interval);
    interval = null;
    return;
  }

  const winner = nextFrame(gameState);
  if (winner) {
    clearInterval(interval);
    if (winner === 3) {
      io.emit("gameOver", "draw");
      console.log("Game over, draw");
    } else if (winner === 1) {
      io.emit("gameOver", gameState.player1.id);
      console.log("Player 1 wins - ", gameState.player1.id);
    } else {
      io.emit("gameOver", gameState.player2.id);
      console.log("Player 2 wins - ", gameState.player2.id);
    }
  } else {
    io.emit("stateUpdate", gameState);
  }
};

io.on("connection", connected);

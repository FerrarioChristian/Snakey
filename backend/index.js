import io from "./helpers/connection.js";
import { initNewGame, nextFrame } from "./game/gameInterface.js";
import { changeVelocity } from "./game/movements.js";

let gameState;
let playerNumber = 1;
let interval = null;

const connected = (socket) => {
  if (playerNumber === 1) {
    gameState = initNewGame();
    gameState.player1["id"] = socket.id;
    playerNumber++;
  } else if (playerNumber === 2) {
    gameState.player2["id"] = socket.id;
    playerNumber++;
    interval = setInterval(loop, 500);
  } else {
    socket.disconnect();
    console.log("Too many players, new connection refused");
  }

  socket.on("disconnect", () => {
    console.log("User disconnected");
    playerNumber--;
  });

  socket.on("playerMoved", (data) => {
    changeVelocity(gameState, socket.id, data);
  });

  socket.on("newGame", () => {
    socket.emit("newGame");
    interval = setInterval(loop, 500);
  });
};

const loop = () => {
  if (playerNumber > 2) {
    const winner = nextFrame(gameState);
    if (winner) {
      clearInterval(interval);
      io.emit("gameOver", winner);
      gameState = initNewGame();
    } else {
      io.emit("stateUpdate", gameState);
    }
  }
};

io.on("connection", connected);

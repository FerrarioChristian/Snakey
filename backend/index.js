import io from "./helpers/connection.js";
import { initNewGame, nextFrame } from "./game/gameInterface.js";
import { changeVelocity } from "./game/movements.js";

let gameState;
let playerNumber = 1;

const connected = (socket) => {
  if (playerNumber === 1) {
    gameState = initNewGame();
    gameState.player1["id"] = socket.id;
    playerNumber++;
    console.log("Player 1 connected");
  } else if (playerNumber === 2) {
    gameState.player2["id"] = socket.id;
    playerNumber++;
    console.log("Player 2 connected");
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
};

const loop = () => {
  if (playerNumber > 2) {
    const winner = nextFrame(gameState);
    if (!winner) {
      io.emit("stateUpdate", gameState);
    } else {
      io.emit("gameOver", winner);
      gameState = initNewGame();
    }
  }
};

io.on("connection", connected);
const interval = setInterval(loop, 1000);

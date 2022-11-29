import { startingPositions } from "./startingPositions.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { borderCollision, equalPosition } from "./utilities.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

let gameState = startingPositions;
let playerNumber = 1;

const connected = (socket) => {
  if (playerNumber === 1) {
    gameState.player1["id"] = socket.id;
    console.log("Player 1 connected");
    playerNumber++;
  } else if (playerNumber === 2) {
    gameState.player2["id"] = socket.id;
    console.log("Player 2 connected");
    playerNumber++;
  } else {
    socket.disconnect();
    console.log("Too many players");
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
    playerNumber--;
  });

  socket.on("playerMoved", (data) => {
    console.dir(data);
    changeVelocity(socket.id, data);
  });
};

const loop = () => {
  if (playerNumber > 2) {
    const winner = nextFrame();
    if (!winner) {
      io.emit("stateUpdate", gameState);
    } else {
      io.emit("gameOver", winner);
      clearInterval(interval);
    }
  }
};

const changeVelocity = (id, data) => {
  if (id === gameState.player1.id) {
    if (data === "ArrowUp") {
      gameState.player1.velocity = { x: 0, y: -1 };
    } else if (data === "ArrowDown") {
      gameState.player1.velocity = { x: 0, y: 1 };
    } else if (data === "ArrowLeft") {
      gameState.player1.velocity = { x: -1, y: 0 };
    } else if (data === "ArrowRight") {
      gameState.player1.velocity = { x: 1, y: 0 };
    }
  } else if (id === gameState.player2.id) {
    if (data === "ArrowUp") {
      gameState.player2.velocity = { x: 0, y: -1 };
    } else if (data === "ArrowDown") {
      gameState.player2.velocity = { x: 0, y: 1 };
    } else if (data === "ArrowLeft") {
      gameState.player2.velocity = { x: -1, y: 0 };
    } else if (data === "ArrowRight") {
      gameState.player2.velocity = { x: 1, y: 0 };
    }
  }
};

const nextFrame = () => {
  moveBody();
  checkFoodCollision();
  return checkCollision();
};

/* Return:
    0 if no collision
    1 if player 1 collided
    2 if player 2 collided
    3 if both collided 
*/
const checkCollision = () => {
  let player1Dead = false;
  let player2Dead = false;

  if (equalPosition(gameState.player1.body[0], gameState.player2.body[0])) {
    //player1Dead = true;
    //player2Dead = true;
    console.log("Both players collided");
    return 3;
  }

  if (
    gameState.player1.body.find((elem) =>
      equalPosition(elem, gameState.player2.body[0])
    ) ||
    borderCollision(gameState.player2.body[0])
  ) {
    player2Dead = true;
  }
  if (
    gameState.player2.body.find((elem) =>
      equalPosition(elem, gameState.player1.body[0])
    ) ||
    borderCollision(gameState.player1.body[0])
  )
    player1Dead = true;

  if (player1Dead && player2Dead) {
    console.log("Both players collided");
    return 3;
  } else if (player1Dead) {
    console.log("player 1 collided, player 2 wins");
    return 2;
  } else if (player2Dead) {
    console.log("player 2 collided, player 1 wins");
    return 1;
  }

  return 0;
};

const checkFoodCollision = () => {
  if (equalPosition(gameState.player1.body[0], gameState.food)) {
    gameState.food = newFood();
    gameState.player1.body.push(
      gameState.player1.body[gameState.player1.body.length - 1]
    );
  }
  if (equalPosition(gameState.player2.body[0], gameState.food)) {
    gameState.food = newFood();
    gameState.player2.body.push(
      gameState.player2.body[gameState.player2.body.length - 1]
    );
  }
};

const moveBody = () => {
  gameState.player1.body.pop();
  gameState.player1.body.unshift({
    x: gameState.player1.body[0].x + gameState.player1.velocity.x,
    y: gameState.player1.body[0].y + gameState.player1.velocity.y,
  });

  gameState.player2.body.pop();
  gameState.player2.body.unshift({
    x: gameState.player2.body[0].x + gameState.player2.velocity.x,
    y: gameState.player2.body[0].y + gameState.player2.velocity.y,
  });
};

const newFood = () => {
  const food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };

  if (
    gameState.player1.body.find((elem) => elem === food) ||
    gameState.player2.body.find((elem) => elem === food)
  ) {
    return newFood();
  }

  gameState.food = food;
};

io.on("connection", connected);
const interval = setInterval(loop, 1000);

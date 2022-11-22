import { startingPositions } from "./startingPositions.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

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

  socket.on("playerMoved", (data, callback) => {
    changeVelocity(socket.id, data);
    callback(gameState);
  });
};

const loop = () => {
  if (playerNumber > 2) {
    moveBody();
    checkFoodCollision();
    const collision = checkCollision();
  }
  console.clear();
  console.dir(gameState, { depth: null });
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

/* Return:
    0 if no collision
    1 if player 1 collided
    2 if player 2 collided
    3 if both collided 
*/
const checkCollision = () => {
  let player1Dead = false;
  let player2Dead = false;

  if (gameState.player1[0] === gameState.player2[0]) {
    //player1Dead = true;
    //player2Dead = true;
    return 3;
  }

  if (
    gameState.player1.body.find((elem) => elem === gameState.player2[0]) ||
    gameState.player2.body[0].x > 19 ||
    gameState.player2.body[0].x < 0 ||
    gameState.player2.body[0].y > 19 ||
    gameState.player2.body[0].y < 0
  ) {
    player2Dead = true;
  }
  if (
    gameState.player2.body.find((elem) => elem === gameState.player1[0]) ||
    gameState.player1.body[0].x > 19 ||
    gameState.player1.body[0].x < 0 ||
    gameState.player1.body[0].y > 19 ||
    gameState.player1.body[0].y < 0
  )
    player1Dead = true;

  if (player1Dead && player2Dead) {
    return 3;
  } else if (player1Dead) {
    return 2;
  } else if (player2Dead) {
    return 1;
  }

  return 0;
};

const checkFoodCollision = () => {
  if (gameState.player1.body[0] === gameState.food) {
    gameState.food = newFood();
    gameState.player1.body.push(
      gameState.player1.body[gameState.player1.body.length - 1]
    );
  }
  if (gameState.player2.body[0] === gameState.food) {
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

const changeVelocity = (id, data) => {
  if (id === gameState.player1.id) {
    if (data === "up") {
      gameState.player1.velocity = { x: 0, y: -1 };
    } else if (data === "down") {
      gameState.player1.velocity = { x: 0, y: 1 };
    } else if (data === "left") {
      gameState.player1.velocity = { x: -1, y: 0 };
    } else if (data === "right") {
      gameState.player1.velocity = { x: 1, y: 0 };
    }
  } else if (id === gameState.player2.id) {
    if (data === "up") {
      gameState.player2.velocity = { x: 0, y: -1 };
    } else if (data === "down") {
      gameState.player2.velocity = { x: 0, y: 1 };
    } else if (data === "left") {
      gameState.player2.velocity = { x: -1, y: 0 };
    } else if (data === "right") {
      gameState.player2.velocity = { x: 1, y: 0 };
    }
  }
};

io.on("connection", connected);
setInterval(loop, 1000);

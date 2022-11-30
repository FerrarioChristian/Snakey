import { socket } from "./socket.js";
let canvas, context;

export const init = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = canvas.height = 600;

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  document.addEventListener("keydown", (e) => {
    socket.emit("playerMoved", e.key);
  });

  return { canvas, context };
};

export const render = (gameState) => {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const food = gameState.food;
  const size = canvas.width / 20;

  context.fillStyle = "pink";
  context.fillRect(food.x * size, food.y * size, size, size);

  paintSnake(gameState.player1, size, "blue");
  paintSnake(gameState.player2, size, "red");
};

function paintSnake(playerState, size, colour) {
  const body = playerState.body;

  context.fillStyle = colour;
  for (let cell of body) {
    context.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

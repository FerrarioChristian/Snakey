import { socket } from "./socket.js";
let canvas, ctx;

export const init = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas?.getContext("2d");

  canvas.width = canvas.height = 600;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.addEventListener("keydown", (e) => {
    socket.emit("keydown", e.key);
  });

  return { canvas, ctx };
};

export const render = (gameState) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const food = gameState.food;
  const size = canvas.width / 20;

  ctx.fillStyle = "pink";
  ctx.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(gameState.player1, size, "blue");
  paintPlayer(gameState.player2, size, "red");
};

function paintPlayer(playerState, size, colour) {
  const body = playerState.body;

  ctx.fillStyle = colour;
  for (let cell of body) {
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

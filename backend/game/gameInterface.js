import { checkCollision } from "./collisions.js";
import newFood from "./food.js";
import { moveBody } from "./movements.js";
import { startingPositions } from "../helpers/startingPositions.js";

export const initNewGame = (gameState) => {
  const newGameState = startingPositions();
  if (gameState) {
    newGameState.player1.id = gameState.player1.id;
    newGameState.player2.id = gameState.player2.id;
  }
  newFood(newGameState);
  return newGameState;
};

export const nextFrame = (gameState) => {
  moveBody(gameState);
  return checkCollision(gameState);
};

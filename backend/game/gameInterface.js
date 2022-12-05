import { checkCollision } from "./collisions.js";
import newFood from "./food.js";
import { moveBody } from "./movements.js";
import { startingPositions } from "../helpers/startingPositions.js";

export const initNewGame = () => {
  const gameState = startingPositions();
  newFood(gameState);
  return gameState;
};

export const nextFrame = (gameState) => {
  moveBody(gameState);
  return checkCollision(gameState);
};

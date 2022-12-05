import newFood from "./food.js";
import { borderCollision, equalPosition } from "../helpers/utilities.js";

export const checkCollision = (gameState) => {
  checkFoodCollision(gameState);

  let player1Dead = false;
  let player2Dead = false;

  checkBorderCollision(gameState.player1) ? (player1Dead = true) : null;
  checkBorderCollision(gameState.player2) ? (player2Dead = true) : null;

  checkSelfCollision(gameState.player1) ? (player1Dead = true) : null;
  checkSelfCollision(gameState.player2) ? (player2Dead = true) : null;

  checkBodyCollision(gameState.player1.body[0], gameState.player2)
    ? (player1Dead = true)
    : null;
  checkBodyCollision(gameState.player2.body[0], gameState.player1)
    ? (player2Dead = true)
    : null;

  if (player1Dead && player2Dead) {
    return 3;
  } else if (player1Dead) {
    return 2;
  } else if (player2Dead) {
    return 1;
  }
  return 0;
};

const checkBodyCollision = (head, enemy) => {
  if (enemy.body.find((elem) => equalPosition(elem, head))) return true;
  return false;
};

const checkSelfCollision = (player) => {
  if (
    player.body.find(
      (elem, index) => equalPosition(elem, player.body[0]) && index !== 0
    )
  ) {
    console.log("Self collision");
    return true;
  }
  return false;
};

const checkBorderCollision = (player) => {
  if (borderCollision(player.body[0])) {
    return true;
  }
  return false;
};

const checkFoodCollision = (gameState) => {
  if (equalPosition(gameState.player1.body[0], gameState.food)) {
    newFood(gameState);
    gameState.player1.body.push(
      gameState.player1.body[gameState.player1.body.length - 1]
    );
  }
  if (equalPosition(gameState.player2.body[0], gameState.food)) {
    newFood(gameState);
    gameState.player2.body.push(
      gameState.player2.body[gameState.player2.body.length - 1]
    );
  }
};

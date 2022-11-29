export const borderCollision = (playerPos) =>
  playerPos.x > 19 || playerPos.x < 0 || playerPos.y > 19 || playerPos.y < 0;

export const equalPosition = (player1, player2) =>
  player1.x === player2.x && player1.y === player2.y;

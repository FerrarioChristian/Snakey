export const borderCollision = (playerPos) =>
  playerPos.x > 19 || playerPos.x < 0 || playerPos.y > 19 || playerPos.y < 0;

export const equalPosition = (pos1, pos2) =>
  pos1.x === pos2.x && pos1.y === pos2.y;

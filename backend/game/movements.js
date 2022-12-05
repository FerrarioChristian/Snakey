export const moveBody = (gameState) => {
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

export const changeVelocity = (gameState, id, data) => {
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

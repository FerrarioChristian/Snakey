const newFood = (gameState) => {
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

export default newFood;

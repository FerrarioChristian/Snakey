export const startingPositions = () => ({
  player1: {
    velocity: { x: 1, y: 0 },
    body: [
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ],
  },
  player2: {
    velocity: { x: -1, y: 0 },
    body: [
      { x: 16, y: 18 },
      { x: 17, y: 18 },
      { x: 18, y: 18 },
    ],
  },
  food: {},
});

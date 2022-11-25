/* type Position = {
  x: number;
  y: number;
};

type StartingPositions = {
  player1: {
    velocity: Position;
    body: Position[];
  };
  player2: {
    velocity: Position;
    body: Position[];
  };
  food?: Position;
}; */

export const startingPositions /* : StartingPositions */ = {
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
};

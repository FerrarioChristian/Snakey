import React from "react";
import { useEffect, useState } from "react";
import { init, render } from "./gameEngine";

import { socket } from "./socket";

function App() {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    init();
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("gameStart", () => {});
    socket.on("gameOver", (winner) => {
      if (winner === 3) {
        setWinner("Draw");
      }
      if (winner === 2) {
        setWinner("Player 2");
      }
      if (winner === 1) {
        setWinner("Player 1");
      }
    });

    socket.on("stateUpdate", (gameState) => {
      render(gameState);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("statusUpdate");
    };
  }, []);

  const playerMoved = () => {
    socket.emit("playerMoved");
  };

  return (
    <>
      <div id="gameScreen">
        <div>
          <p>winner: {winner}</p>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </>
  );
}

export default App;

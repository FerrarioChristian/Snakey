import React, { useState } from "react";
import { useEffect } from "react";
import { init, render, winnerToText } from "./gameEngine";
import { socket } from "./socket";

function App() {
  let playerNumber;
  const [winner, setWinner] = useState("");

  useEffect(() => {
    init();
    socket.on("connect", (playerNumber) => {
      playerNumber = playerNumber;
    });

    socket.on("gameStart", () => {});

    socket.on("gameOver", (winner) => {
      setWinner(winnerToText(winner));
    });

    socket.on("stateUpdate", (gameState) => {
      render(gameState);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("statusUpdate");
      socket.off("gameStart");
      socket.off("gameOver");
    };
  }, []);

  return (
    <div id="gameScreen">
      <h1>{winner}</h1>
      <div>
        <canvas id="canvas" />
      </div>
    </div>
  );
}

export default App;

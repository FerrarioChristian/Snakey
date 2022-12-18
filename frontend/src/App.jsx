import React, { useState } from "react";
import { useEffect } from "react";
import Canvas from "./components/Canvas";
import { init, render, winnerToText } from "./gameEngine";
import { socket } from "./socket";
import Title from "./components/Title";

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
      setWinner(winnerToText(winner, playerNumber));
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
      <Title />
      <Canvas winner={winner} />
    </div>
  );
}

export default App;

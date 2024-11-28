import React, { useState } from "react";
import { useEffect } from "react";
import Canvas from "./components/Canvas";
import { init, render, winnerToText } from "./gameEngine";
import { socket } from "./socket";
import Title from "./components/Title";

function App() {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    init();
    socket.on("connect", () => {
      console.log("Connected as player " + socket.id);
    });

    socket.on("gameStart", () => { });

    socket.on("gameOver", (winner) => {
      setWinner(winnerToText(winner));
    });

    socket.on("stateUpdate", (gameState) => {
      render(gameState);
    });

    socket.on("newGame", () => {
      setWinner("");
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
      <Canvas winner={winner} setWinner={setWinner} />
    </div>
  );
}

export default App;

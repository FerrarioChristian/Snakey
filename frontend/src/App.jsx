import React from "react";
import { useEffect, useState } from "react";
import { init, render } from "./gameEngine";

import { socket } from "./socket";

function App() {
  useEffect(() => {
    init();
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("statusUpdate", (gameState) => {
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
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </>
  );
}

export default App;

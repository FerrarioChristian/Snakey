import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const playerMoved = () => {
    socket.emit("playerMoved", "left", (data: any) => {
      setMessage(data);
      console.log(data);
    });
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Message: {"" + JSON.stringify(message)}</p>
      <button onClick={playerMoved}>Send ping</button>
    </div>
  );
}

export default App;

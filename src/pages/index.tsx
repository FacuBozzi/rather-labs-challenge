import React from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { connectToMetaMask } from "@/utils/metamask";

const Home = () => {
  const { connect, disconnect, isConnected, address } = useMetaMask();

  // Explicitly type the event handler
  const handleConnectClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    await connect();
  };

  const handleDisconnectClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    disconnect();
  };

  console.log("Address", isConnected, address);

  return (
    <div>
      <h1>MetaMask Connection Example</h1>
      {isConnected ? (
        <>
          <p>Connected with address: {address}</p>
          <button onClick={handleDisconnectClick}>Disconnect</button>
        </>
      ) : (
        <button onClick={handleConnectClick}>Connect to MetaMask</button>
      )}
    </div>
  );
};

export default Home;

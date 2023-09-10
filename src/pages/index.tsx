import React from "react";
import { useMetaMask } from "../hooks/useMetaMask";

const Home = () => {
  const { isConnected, address } = useMetaMask();

  console.log("Address", isConnected, address);

  return (
    <div>
      <h1 className="text-black mt-16">MetaMask Connection Example</h1>
    </div>
  );
};

export default Home;

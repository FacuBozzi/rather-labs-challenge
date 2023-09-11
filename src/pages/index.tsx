import React, { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { checkNetwork } from "../utils/checkNetwork";
import { switchToGoerli } from "../utils/switchNetwork";
import { checkConnection } from "../utils/checkConnection";

const Home = () => {
  const { isConnected, setIsConnected, address } = useMetaMask();
  const [isGoerli, setIsGoerli] = useState<boolean>(false);

  console.log("Address", isConnected, address, isGoerli);

  //Check if user is connected to goerli when the page loads
  useEffect(() => {
    if (!isConnected) return;
    const connectToGoerli = async () => {
      const isConnectedToGoerli = await checkNetwork();
      setIsGoerli(isConnectedToGoerli);
    };
    connectToGoerli();
    window.ethereum.on("chainChanged", checkNetwork);
  }, [isConnected]);

  //Checks if the user is initially connected
  useEffect(() => {
    const getConnection = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setIsConnected(true);
      } else {
        console.log(`CONNECT FALSE`);
      }
    };
    getConnection();
  }, []);

  return (
    <div>
      {!isConnected ? (
        <h1 className="text-primary-gray mt-16">
          Connect your wallet to view your $QUIZ balance
        </h1>
      ) : null}
      {!isGoerli && isConnected && (
        <button className="text-black" onClick={switchToGoerli}>
          Switch to Goerli
        </button>
      )}
    </div>
  );
};

export default Home;

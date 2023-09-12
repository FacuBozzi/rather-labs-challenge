import React, { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { checkNetwork } from "../utils/checkNetwork";
import { switchToGoerli } from "../utils/switchNetwork";

const Home = () => {
  const { isConnected, address, refetch } = useMetaMask();
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
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected) refetch(); //react-query's refetch function to get current connectivity status
  }, [isConnected]);

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

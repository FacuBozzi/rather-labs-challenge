import React, { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { checkNetwork } from "../utils/checkNetwork";
import { switchToGoerli } from "../utils/switchNetwork";
import { getTokenBalance } from "../utils/getTokenBalance";
import Survey from "@/components/Survey/page";

const Home = () => {
  const { isConnected, address, refetch } = useMetaMask();
  const [isGoerli, setIsGoerli] = useState<boolean>(false);
  const [tokenBalance, setTokenBalance] = useState<string>("0.0");

  console.log("Address", isConnected, address, isGoerli);

  useEffect(() => {
    if (!isConnected) return;
    connectToGoerli();
    getUserBalance();
  }, [isConnected]);

  //Check if user is connected to goerli when the page loads
  const connectToGoerli = async () => {
    const isConnectedToGoerli = await checkNetwork();
    setIsGoerli(isConnectedToGoerli);
  };

  //Check $QUIZ token balance
  const getUserBalance = async () => {
    const quizBalance = await getTokenBalance(address);
    setTokenBalance(quizBalance);
  };

  useEffect(() => {
    if (!isConnected) refetch(); //react-query's refetch function to get current connectivity status
  }, [isConnected]);

  return (
    <div>
      {isConnected ? (
        <>
          <h1 className="mt-10 text-primary-gray">
            Current $QUIZ Balance: {tokenBalance}
          </h1>
          <Survey />
        </>
      ) : (
        <h1 className="text-primary-gray mt-16">
          Connect your wallet to view your $QUIZ balance
        </h1>
      )}
      {!isGoerli && isConnected && (
        <button className="text-black" onClick={switchToGoerli}>
          Switch to Goerli
        </button>
      )}
    </div>
  );
};

export default Home;

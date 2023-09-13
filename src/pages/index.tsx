import React, { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { checkNetwork } from "../utils/checkNetwork";
import { switchToGoerli } from "../utils/switchNetwork";
import { getTokenBalance } from "../utils/getTokenBalance";
import Survey from "@/components/Survey/Survey";
import contractABI from "../survey/survey-abi.json"; // Import the survey data
import { ethers } from "ethers";
import { contractAddress } from "@/utils/contractAddress";

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

  // Use ethers.js to listen to the Transfer event for updating balance
  const updateBalance = async () => {
    if (typeof window.ethereum == "undefined") return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      contract.on("Transfer", async (_from, _to, _amount) => {
        if (_to.toLowerCase() === address.toLowerCase()) {
          // Token transfer to the user's address detected
          getUserBalance();
        }
      });
    } catch (error) {
      console.log("Error getting user $QUIZ balance: ", error);
    }
  };

  useEffect(() => {
    updateBalance();
  }, []);

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
    <div className="flex flex-col items-center">
      {isConnected ? (
        <>
          {isGoerli ? (
            <>
              <h1 className="mt-10 font-bold text-primary-gray">
                Current $QUIZ Balance: {tokenBalance}
              </h1>
              <Survey />
            </>
          ) : (
            <>
              <button
                className="text-primary-gray mt-16"
                onClick={switchToGoerli}
              >
                Switch to Goerli
              </button>
            </>
          )}
        </>
      ) : (
        <h1 className="text-primary-gray mt-16">
          Connect your wallet to view your $QUIZ balance
        </h1>
      )}
    </div>
  );
};

export default Home;

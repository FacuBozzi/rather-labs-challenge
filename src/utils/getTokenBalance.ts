const ethers = require("ethers");
import { contractAddress } from "./contractAddress";

// Initialize an ethers.js provider in goerli with alchemy
const provider = new ethers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/XFJe-dMTPoiW_D-QRBZNwFw79EZaLD0H"
); // didn't mind putting it in a .env since this project should run instantly for the ratherlabs team

export async function getTokenBalance(userAddress: string) {
  try {
    // Create an instance of the ERC20 contract
    const tokenContract = new ethers.Contract(
      contractAddress,
      ["function balanceOf(address) view returns (uint)"],
      provider
    );

    // Retrieve the balance of the user's address
    const balance = await tokenContract.balanceOf(userAddress);

    // Convert the balance to a readable format (in this case, it's likely in wei)
    const readableBalance = ethers.formatUnits(balance, 18); // Assuming 18 decimal places for $QUIZ, adjust as needed

    console.log(`Balance of ${userAddress} in $QUIZ: ${readableBalance}`);
    return readableBalance;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error);
      return error.message;
    }
  }
}

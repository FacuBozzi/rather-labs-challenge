const ethers = require("ethers");

// Initialize an ethers.js provider in goerli with alchemy
const provider = new ethers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/XFJe-dMTPoiW_D-QRBZNwFw79EZaLD0H"
); // didn't mind putting it in a .env since this project should run instantly for the ratherlabs team

// The address of the $QUIZ token
const tokenAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";

export async function getTokenBalance(userAddress) {
  try {
    // Create an instance of the ERC20 contract
    const tokenContract = new ethers.Contract(
      tokenAddress,
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
    console.error("Error:", error);
    return error.message;
  }
}

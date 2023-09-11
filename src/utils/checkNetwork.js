import { ethers } from "ethers";

const goerliChainID = 5;

export async function checkNetwork() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name);

      // Check if the network ID is for the Goerli network
      if (Number(network.chainId) !== goerliChainID) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error fetching network:", error);
      return false;
    }
  } else {
    return false;
  }
}

import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider;
//   }
// }

export async function connectToMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);

    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the user's address
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      return {
        provider,
        signer,
        address,
        isConnected: true,
      };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return {
        isConnected: false,
      };
    }
  } else {
    console.error("MetaMask extension not detected.");
    return {
      isConnected: false,
    };
  }
}

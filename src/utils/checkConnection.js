// Check if the user is connected
export async function checkConnection() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    // This line will throw an error if not connected
    await provider.listAccounts();

    // If no error is thrown, the user is connected
    console.log("Connected to MetaMask");
    return true;
  } catch (error) {
    console.log("Not connected to MetaMask");
    return false;
  }
}

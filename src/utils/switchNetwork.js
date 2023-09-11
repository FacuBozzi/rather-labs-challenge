export function switchToGoerli() {
  window.ethereum
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], // Goerli chain ID
    })
    .then(() => {
      alert("Successfully connected to Goerli");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error switching network:", error);
    });
}

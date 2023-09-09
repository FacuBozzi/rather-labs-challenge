import { useMutation, useQuery, useQueryClient } from "react-query";
import { connectToMetaMask } from "../utils/metamask";

const queryKey = "metaMask";

export const useMetaMask = () => {
  const queryClient = useQueryClient();

  // Query to get the MetaMask connection status
  const { data: metaMaskData } = useQuery(queryKey, connectToMetaMask, {
    initialData: { isConnected: false },
    enabled: false, // Disable auto-fetching at the beginning
  });

  // Mutation to connect to MetaMask
  const connectMutation = useMutation(connectToMetaMask, {
    onSuccess: (data) => {
      // If connected, refetch the MetaMask query
      if (data.isConnected) {
        queryClient.setQueryData(queryKey, data);
      }
    },
  });

  // Mutation to disconnect from MetaMask
  const disconnect = () => {
    queryClient.setQueryData(queryKey, { isConnected: false });
  };

  return {
    connect: connectMutation.mutate,
    disconnect,
    isConnected: metaMaskData?.isConnected || false,
    address: metaMaskData?.address || "",
  };
};

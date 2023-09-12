import { useMutation, useQuery, useQueryClient } from "react-query";
import { connectToMetaMask } from "../utils/metamask";
import { useEffect, useState } from "react";

const queryKey = "metaMask";

export const useMetaMask = () => {
  const queryClient = useQueryClient();

  // Query to get the MetaMask connection status
  const { data: metaMaskData, refetch } = useQuery(
    queryKey,
    connectToMetaMask,
    {
      initialData: { isConnected: false },
      enabled: false, // Disable auto-fetching at the beginning
      staleTime: 0, // Forces a re-fetch on every render
    }
  );

  // //Represents metamask connection status
  // const [isConnected, setIsConnected] = useState(
  //   metaMaskData?.isConnected || false
  // );

  // Mutation to connect to MetaMask
  const connectMutation = useMutation(connectToMetaMask, {
    onSuccess: (data) => {
      // If connected, refetch the MetaMask query
      if (data.isConnected) {
        queryClient.setQueryData(queryKey, data);
        // setIsConnected(data.isConnected);
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
    refetch,
  };
};

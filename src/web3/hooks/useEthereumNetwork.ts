import Web3 from "web3"
import { EthClient } from "../client/EthClient"
import { useWeb3Client } from "./useWeb3Client";

export const useEthereumNetwork = (networkUrl: string) => {
  const client = new EthClient(new Web3(networkUrl));

  return useWeb3Client(client)
}
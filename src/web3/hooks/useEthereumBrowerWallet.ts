import Web3 from "web3";
import { EthClient } from "../client/EthClient";
import { useWeb3Client } from "./useWeb3Client";

export const useEthereumBrowserWallet = () => {
  const client = (window as any).ethereum;
  
  client.request({ method: 'eth_requestAccounts' });

  return useWeb3Client(new EthClient(new Web3(client)));
}

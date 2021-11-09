import Web3 from "web3";

export const injectContract = (web3: Web3, abi: any, address: string) =>
  new web3.eth.Contract(abi, address);

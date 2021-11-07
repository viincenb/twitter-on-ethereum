import { useState } from "react";
import { IWeb3Client } from "../../web3/client/IWeb3Client";

export interface IWalletProps {
  web3: IWeb3Client;
}

export const Wallet = ({ web3 }: IWalletProps) => {
  const [balance, setBalance] = useState("0");

  web3.getBalance().then(setBalance);

  return <div>
    <h1>Wallet</h1>
    <p>{balance} ETH</p>
  </div>
}
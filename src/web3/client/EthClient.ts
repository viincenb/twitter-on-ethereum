import Web3 from "web3";
import { IWeb3Client } from "./IWeb3Client";

export class EthClient implements IWeb3Client {
  private client: Web3;

  constructor(client: Web3) {
    this.client = client;
  }


  getBlockNumber() {
    return this.client.eth.getBlockNumber();
  }

  getAccounts() {
    return this.client.eth.getAccounts();
  }

  async getBalance() {
    const address = (await this.getAccounts())[0];

    const value = await this.client.eth.getBalance(address);

    return this.client.utils.fromWei(value);
  }
}

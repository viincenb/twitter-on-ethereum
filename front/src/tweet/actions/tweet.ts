import { createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import { RootState } from "../../store/store";
import { Tweet } from "../Tweet";
import abi from "../TweetContract.json";

export const tweet = createAsyncThunk<any, Tweet, { extra: { web3: Web3 } }>(
  "tweet",
  async (tweet, { extra: { web3 }, getState }) => {
    const {
      connectedAccount: { accounts },
    } = getState() as RootState;
    const contract = new web3.eth.Contract(
      abi as any,
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );

    // 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199

    await contract.methods.sendTweet(tweet).send({
      from: accounts[0],
    });
  }
);

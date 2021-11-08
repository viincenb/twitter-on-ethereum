import { createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Tweet } from "../../tweet/Tweet";
import abi from "../../tweet/TweetContract.json";

export const fetchTimeline = createAsyncThunk<
  Tweet[],
  string,
  { extra: { web3: Web3 } }
>("timeline/fetch", async (from, { extra: { web3 }, getState }) => {
  const contract = new web3.eth.Contract(
    abi as AbiItem[],
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  return contract.methods.getTimeline().call({
    from,
  });
});

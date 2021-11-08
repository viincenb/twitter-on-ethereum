import { createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import { RootState } from "../../store/store";
import abi from "../../tweet/TweetContract.json";
import { fetchTimeline } from "./fetchTimeline";

export const followAccount = createAsyncThunk<
  any,
  string,
  { extra: { web3: Web3 } }
>(
  "timeline/follow",
  async (accountToFollow, { dispatch, extra: { web3 }, getState }) => {
    const {
      connectedAccount: { accounts },
    } = getState() as RootState;
    const contract = new web3.eth.Contract(
      abi as any,
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );

    await contract.methods.followAccount(accountToFollow).send({
      from: accounts[0],
    });
    await dispatch(fetchTimeline(accounts[0]));
  }
);

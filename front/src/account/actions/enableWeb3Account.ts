import { createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import { fetchTimeline } from "../../timeline/actions/fetchTimeline";

export const enableWeb3Account = createAsyncThunk<
  string[],
  void,
  { extra: { web3: Web3 } }
>("account/enableWeb3Account", async (none, { dispatch, extra: { web3 } }) => {
  const accounts = await web3.eth.requestAccounts();

  dispatch(fetchTimeline(accounts[0]));

  return accounts;
});

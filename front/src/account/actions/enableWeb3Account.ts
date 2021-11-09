import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgument } from "../../store/store";
import { fetchTimeline } from "../../timeline/actions/fetchTimeline";

export const enableWeb3Account = createAsyncThunk<
  string[],
  void,
  { extra: ExtraArgument }
>("account/enableWeb3Account", async (none, { dispatch, extra: { web3 } }) => {
  const accounts = await web3.eth.requestAccounts();

  dispatch(enableWeb3Account.fulfilled);

  return accounts;
});

export const enableWeb3AccountAndFetchTimeline = createAsyncThunk<
  void,
  void,
  { extra: ExtraArgument }
>(
  "account/enableWeb3AccountAndFetchTimeline",
  async (none, { dispatch }) => {
    await dispatch(enableWeb3Account());
    await dispatch(fetchTimeline());
  }
);

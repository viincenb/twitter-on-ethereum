import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgument } from "../../store/store";

export const enableWeb3Account = createAsyncThunk<
  string[],
  string[] | void,
  { extra: ExtraArgument }
>(
  "account/enableWeb3Account",
  async (givenAccounts, { extra: { web3 } }) => {
    if (givenAccounts) {
      return givenAccounts;
    }

    return await web3.eth.requestAccounts();
  }
);

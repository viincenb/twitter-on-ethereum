import { createAsyncThunk } from "@reduxjs/toolkit";

export const callContractWithAccount = <O>(input: any) =>
  createAsyncThunk<O, any, { state: any }>(
    "account/callContractWithAccount",
    async (method, { getState }) => {
      const { accounts } = (getState() as any).connectedAccount;

      return await method.call({
        from: accounts[0],
      });
    }
  )(input);

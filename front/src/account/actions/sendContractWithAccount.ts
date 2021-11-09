import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const sendContractWithAccount = <O>(input: any) =>
  createAsyncThunk<O, any, { state: any }>(
    "account/sendContractWithAccount",
    async (method, { getState }) => {
      const { accounts } = (getState() as RootState).connectedAccount;

      return await method.send({
        from: accounts[0],
      });
    }
  )(input);

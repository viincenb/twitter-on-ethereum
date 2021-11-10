import { createSlice } from "@reduxjs/toolkit";
import { ethAccountsPermissionsUpdated } from "../../wallet/actions/ethAccountsPermissionsUpdated";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export type Status = "offline" | "connecting" | "connected";

export interface connectedAccountState {
  accounts: string[];
  status: Status;
  hasAccountPermissions: boolean;
}

const initialState: connectedAccountState = {
  accounts: [],
  status: "offline",
  hasAccountPermissions: false,
};

export const connectedAccount = createSlice({
  name: "connectedAccount",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(enableWeb3Account.pending, (state) => {
        state.status = "connecting";
      })
      .addCase(enableWeb3Account.fulfilled, (state, { payload }) => {
        state.accounts = payload;
        state.status = "connected";
        state.hasAccountPermissions = true;
      })
      .addCase(enableWeb3Account.rejected, (state) => {
        state.accounts = [];
        state.status = "offline";
      })
      .addCase(ethAccountsPermissionsUpdated, (state, action) => {
        state.hasAccountPermissions = action.payload;
      }),
});

export const { setAccounts, setStatus } = connectedAccount.actions;

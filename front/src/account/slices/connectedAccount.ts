import { createSlice, createSelector } from "@reduxjs/toolkit";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export type Status = "offline" | "connecting" | "connected";

export interface connectedAccountState {
  accounts: string[];
  status: Status;
}

const initialState: connectedAccountState = {
  accounts: [],
  status: "offline",
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
      })
      .addCase(enableWeb3Account.rejected, (state) => {
        state.accounts = [];
        state.status = "offline";
      }),
});

const selectSelf = (state: connectedAccountState) => state;

export const accounts = createSelector(selectSelf, (state) => state.accounts);

export const status = createSelector(
  selectSelf,
  (state) => state.status
);

export const { setAccounts, setStatus } = connectedAccount.actions;

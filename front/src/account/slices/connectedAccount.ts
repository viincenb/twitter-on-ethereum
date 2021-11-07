import { createSlice, createSelector } from "@reduxjs/toolkit";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export interface connectedAccountState {
  accounts: string[];
  isConnected: boolean;
}

const initialState: connectedAccountState = {
  accounts: [],
  isConnected: false,
};

export const connectedAccount = createSlice({
  name: "connectedAccount",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(enableWeb3Account.fulfilled, (state, { payload }) => {
        state.accounts = payload;
        state.isConnected = true;
      })
      .addCase(enableWeb3Account.rejected, (state) => {
        state.accounts = [];
        state.isConnected = false;
      }),
});

const selectSelf = (state: connectedAccountState) => state;

export const accounts = createSelector(selectSelf, (state) => state.accounts);

export const isConnected = createSelector(
  selectSelf,
  (state) => state.isConnected
);

export const { setAccounts, setIsConnected } = connectedAccount.actions;

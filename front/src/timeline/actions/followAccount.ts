import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendContractWithAccount } from "../../account/actions/sendContractWithAccount";
import { ExtraArgument } from "../../store/store";
import { fetchTimeline } from "./fetchTimeline";

export const followAccount = createAsyncThunk<
  any,
  string,
  { extra: ExtraArgument }
>(
  "timeline/follow",
  async (accountToFollow, { dispatch, extra: { contracts } }) => {
    await dispatch(
      sendContractWithAccount<any>(
        contracts.follow.methods.followAccount(accountToFollow)
      )
    );
    await dispatch(fetchTimeline());
  }
);

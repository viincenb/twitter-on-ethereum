import { Middleware } from "@reduxjs/toolkit";
import { fetchTimeline } from "../../timeline/actions/fetchTimeline";
import { accountChanged } from "../../wallet/actions/accountChanged";
import { ethAccountsPermissionsUpdated } from "../../wallet/actions/ethAccountsPermissionsUpdated";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export const accountMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    await next(action);

    switch (action.type) {
      case enableWeb3Account.fulfilled.type:
        (dispatch as any)(fetchTimeline());
        break;
      case accountChanged.type:
        (dispatch as any)(enableWeb3Account(action.payload));
        break;
      case ethAccountsPermissionsUpdated.type:
        if (action.payload) {
          (dispatch as any)(enableWeb3Account());
        }
        break;
      default:
        break;
    }
  };

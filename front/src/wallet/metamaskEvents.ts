import { AppDispatch } from "../store/store";
import { accountChanged } from "./actions/accountChanged";
import { ethAccountsPermissionsUpdated } from "./actions/ethAccountsPermissionsUpdated";

export const listenMetamaskEvents = async (dispatch: AppDispatch) => {
  const eth = (window as any).ethereum;

  const permissions: any[] = await eth.request({
    method: "wallet_getPermissions",
    params: [],
  });

  if (
    permissions.find(
      ({ parentCapability }) => parentCapability === "eth_accounts"
    )
  ) {
    dispatch(ethAccountsPermissionsUpdated(true));
  } else {
    dispatch(ethAccountsPermissionsUpdated(false));
  }

  eth.on("accountsChanged", (accounts: string[]) => {
    dispatch(accountChanged(accounts));
  });
};

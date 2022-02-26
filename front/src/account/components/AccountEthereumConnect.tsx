import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { EthereumConnect, IEthereumConnectProps } from "./EthereumConnect";

const mapAccountStateToProps = ({
  connectedAccount: { status, hasAccountPermissions, accounts },
}: RootState): IEthereumConnectProps => ({
  isConnecting: status === "connecting",
  isLogged: hasAccountPermissions && accounts.length > 0,
});

export const AccountEthereumConnect = connect<
  IEthereumConnectProps,
  {},
  {},
  RootState
>(mapAccountStateToProps)(EthereumConnect);

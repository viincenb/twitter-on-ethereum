import { DefaultButton } from "@fluentui/react";
import { useDispatch } from "react-redux";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export interface IEthereumConnectProps {
  isConnecting: boolean;
  isLogged: boolean;
}

export const EthereumConnect = ({
  isConnecting = false,
  isLogged = true,
}: IEthereumConnectProps) => {
  const dispatch = useDispatch();
  const text = isConnecting ? "Connecting..." : "Connect with Ethereum";

  const handleClick = () => dispatch(enableWeb3Account());

  if (isLogged) {
    return <></>;
  }

  return (
    <DefaultButton disabled={isConnecting} onClick={handleClick} text={text} />
  );
};

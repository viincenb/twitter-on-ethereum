import { DefaultButton } from "@fluentui/react";
import { useDispatch } from "react-redux";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export interface IEthereumConnectProps {
  isDisabled: boolean;
  isLogged: boolean;
}

export const EthereumConnect = ({
  isDisabled = false,
  isLogged = true,
}: IEthereumConnectProps) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(enableWeb3Account());

  if (isLogged) {
    return <></>;
  }

  return (
    <DefaultButton
      disabled={isDisabled}
      onClick={handleClick}
      text="Ethereum connect"
    />
  );
};

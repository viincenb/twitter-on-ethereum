import { DefaultButton } from "@fluentui/react";
import { useDispatch } from "react-redux";
import { enableWeb3AccountAndFetchTimeline } from "../actions/enableWeb3Account";

export interface IEthereumConnectProps {
  isDisabled: boolean;
}

export const EthereumConnect = ({ isDisabled = false }: IEthereumConnectProps) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(enableWeb3AccountAndFetchTimeline());

  return <DefaultButton disabled={isDisabled} onClick={handleClick} text="Ethereum connect" />;
};

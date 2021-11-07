import { DefaultButton } from "@fluentui/react";
import { useDispatch } from "react-redux";
import { enableWeb3Account } from "../actions/enableWeb3Account";

export const EthereumConnect = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(enableWeb3Account());

  return <DefaultButton onClick={handleClick} text="Ethereum connect" />;
};

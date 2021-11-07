import { useEffect, useState } from "react"
import { IWeb3Client } from "../client/IWeb3Client";

export const useWeb3Client = (client: IWeb3Client) => {
  const [web3, setWeb3] = useState(client);

  useEffect(() => setWeb3(client), [client])

  return {
    web3
  }
}
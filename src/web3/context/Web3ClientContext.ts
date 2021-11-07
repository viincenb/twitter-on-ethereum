import React from "react";
import { IWeb3Client } from "../client/IWeb3Client";

export const Web3ClientContext = React.createContext<IWeb3Client | null>(null);

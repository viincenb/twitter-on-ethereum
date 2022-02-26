import React from "react";
import { Stack, Text } from "@fluentui/react";
import { AccountTimeline } from "./timeline/components/AccountTimeline";
import { AccountFollowInput } from "./timeline/components/AccountFollowInput";
import { AccountTweetEditor } from "./tweet/components/AccountTweetEditor";
import { AccountEthereumConnect } from "./account/components/AccountEthereumConnect";
import { useAppSelector } from "./store/store";

function App() {
  const status = useAppSelector((state) => state.connectedAccount.status);

  const Content =
    status !== "connected" ? (
      <AccountEthereumConnect />
    ) : (
      <Stack tokens={{ childrenGap: "l2" }}>
        <Stack tokens={{ childrenGap: "m" }}>
          <AccountTweetEditor />
          <AccountFollowInput />
        </Stack>
        <AccountTimeline />
      </Stack>
    );

  return (
    <Stack
      style={{ height: "100vh" }}
      horizontal
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Stack
        style={{ width: "550px" }}
        horizontalAlign="stretch"
        verticalAlign="center"
        tokens={{ childrenGap: "m" }}
      >
        <Text variant="xxLarge">Web3 Twitter</Text>
        <Stack horizontalAlign="stretch">{Content}</Stack>
      </Stack>
    </Stack>
  );
}

export default App;

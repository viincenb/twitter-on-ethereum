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
      <>
        <Stack grow={3} />
        <Stack grow horizontalAlign="stretch" verticalAlign="center">
          <Text variant="xxLarge">Web3 Twitter</Text>

          <Stack tokens={{ padding: "l2 0", childrenGap: "m" }}>
            <AccountTweetEditor />
            <AccountFollowInput />
          </Stack>
          <AccountTimeline />
        </Stack>

        <Stack grow={3} />
      </>
    );

  return (
    <Stack
      style={{ height: "100vh" }}
      horizontal
      horizontalAlign="center"
      verticalAlign="center"
    >
      {Content}
    </Stack>
  );
}

export default App;

import { TextField, DefaultButton, Stack } from "@fluentui/react";
import { useState } from "react";

export interface IFollowInputEvents {
  onSubmit: (address: string) => any;
}

export const FollowInput = (props: IFollowInputEvents) => {
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await props.onSubmit(address);

    setAddress("");
  };
  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAddress(event.currentTarget.value);

  return (
    <form onSubmit={handleSubmit}>
      <Stack horizontal tokens={{ childrenGap: "s1" }}>
        <Stack grow>
          <TextField
            onChange={handleChange}
            placeholder="0x0000000000000000000000000000000000000000"
            value={address}
          />
        </Stack>
        <DefaultButton type="submit">Follow</DefaultButton>
      </Stack>
    </form>
  );
};

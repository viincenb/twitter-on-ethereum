import { TextField } from "@fluentui/react";
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
  }
  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAddress(event.currentTarget.value);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        placeholder="Type the account to follow and hit Enter"
        value={address}
      />
      <input type="submit" hidden />
    </form>
  );
};

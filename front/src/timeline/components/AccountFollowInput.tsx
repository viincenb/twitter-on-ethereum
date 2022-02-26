import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { followAccount } from "../actions/followAccount";
import { FollowInput, IFollowInputEvents } from "./FollowInput";

const mapFollowInputDispatchToEvents = {
  onSubmit: followAccount,
};

export const AccountFollowInput = connect<{}, IFollowInputEvents, {}, RootState>(
  () => ({}),
  mapFollowInputDispatchToEvents
)(FollowInput);

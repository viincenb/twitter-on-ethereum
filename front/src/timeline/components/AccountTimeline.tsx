import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { ITimelineProps, Timeline } from "./Timeline";

const mapStateToProps = ({
    timeline: { tweets },
  }: RootState): ITimelineProps => ({ tweets });
  
  export const AccountTimeline = connect<ITimelineProps, {}, {}, RootState>(
    mapStateToProps
  )(Timeline);
  
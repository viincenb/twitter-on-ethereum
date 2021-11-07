import React from "react";
import { Provider, connect } from "react-redux";
import { EthereumConnect } from "./account/components/EthereumConnect";
import "./App.css";
import { RootState, store } from "./store/store";
import { ITimelineProps, Timeline } from "./timeline/components/Timeline";

function App() {
  const mapStateToProps = ({
    timeline: { tweets },
  }: RootState): ITimelineProps => ({ tweets });

  const ConnectedTimeline = connect<ITimelineProps, {}, {}, RootState>(mapStateToProps)(
    Timeline
  );

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <EthereumConnect />

          <ConnectedTimeline />
        </header>
      </div>
    </Provider>
  );
}

export default App;

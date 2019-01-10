import React, { Component, Suspense, lazy } from "react";
// import View from "./View";

export const MainContext = React.createContext();

const Sider = lazy(() => import("./Sider/Sider"));
const Ultimate = lazy(() => import("./Views/Ultimate"));

class Main extends Component {
  state = {
    toggle: true,
    linkView: false,
    nodeView: false
  };

  handleToggle = () =>
    this.setState(({ toggle: prevToggle }) => ({ toggle: !prevToggle }));

  linkViewer = ({ target: { id } }) =>
    this.setState({ linkView: id, nodeView: false });

  nodeViewer = ({ target: { id } }) => {
    const [nodeId, type] = id.split("_");
    this.setState({ linkView: false, nodeView: { nodeId, type } });

    // this.setState({ linkView: false, nodeView: { id, type } });
  };

  closeSider = () => this.setState({ linkView: false, nodeView: false });

  render() {
    const { toggle, linkView, nodeView } = this.state;
    return (
      <Suspense
        fallback={
          <div className="lds-circle">
            <div />
          </div>
        }
      >
        <div className="main-container">
          <MainContext.Provider
            value={{
              toggle,
              handleToggle: this.handleToggle,
              linkViewer: this.linkViewer,
              nodeViewer: this.nodeViewer,
              closeSider: this.closeSider,
              linkView,
              nodeView
            }}
          >
            {linkView || nodeView ? (
              <Sider linkView={linkView} nodeView={nodeView} />
            ) : null}
            <Ultimate />
          </MainContext.Provider>
        </div>
      </Suspense>
    );
  }
}

export default Main;

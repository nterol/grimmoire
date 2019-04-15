import React, { useEffect, useState } from "react";
import { GraphContext } from "../views/Ultimate";

export const CenterNode = ({ graphElement }) => {
  const [nodeInfo, setNodeInfo] = useState({});
  const [linkInfo, setLinkInfo] = useState({});

  // const fakeFetchNodeData () => {

  // }

  useEffect(() => {
    console.log("graphElement", graphElement);
    // const nodeData = async () => {
    //   try {
    //     const data = await setTimeout(fakeFetchNodeData(nodeView), 1000);
    //     setNodeInfo(...data);
    //   } catch (err) {
    //     throw new err();
    //   }
    // };

    // const linkData = async () => {
    //   try {
    //     const data = await settimeout(fakeFetchLinkData(linkView), 1000);
    //     setLinkInfo(...data);
    //   } catch (err) {
    //     throw new err();
    //   }

    //   nodeView ? nodeData() : linkData();
  }, []);

  return (
    <GraphContext.Consumer>
      {({ closeWorkSpace }) => (
        <div className="center-node">
          <button
            className="center-node__close-button"
            type="button"
            onClick={() => closeWorkSpace()}
          >
            close
          </button>
          <div className="center-node__header">
            <h1 className="center-node__header__title">Titre 1</h1>
            <p className="center-node__header__subtitle">Sous titre</p>
          </div>
          <div className="center-node__container">
            <div className="center-node__content">
              Ici le contenuIci le contenuIci le contenuIci le contenuIci le
              contenuIci le contenuIci le contenuIci le contenuIci le contenuIci
              le contenuIci le contenuIci le contenuIci le contenuIci le
              contenuIci le contenuIci le contenuIci le contenuIci le contenu{" "}
            </div>
          </div>
        </div>
      )}
    </GraphContext.Consumer>
  );
};

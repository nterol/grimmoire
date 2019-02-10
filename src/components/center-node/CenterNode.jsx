import React, { PureComponent } from "react";

export class CenterNode extends PureComponent {
  componentWillMount() {
    console.log("Here come centernode");
  }

  render() {
    return (
      <div className="center-node">
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
    );
  }
}

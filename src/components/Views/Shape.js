import React, { Component } from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";
import { bool } from "prop-types";

class Shape extends Component {
  state = {
    cubeRotation: new THREE.Euler()
  };

  onAnimate = () => {
    // this.setState({
    //   cubeRotation: new THREE.Euler(
    //     this.state.cubeRotation.x + 0.01,
    //     this.state.cubeRotation.y + 0.01,
    //     0
    //   )
    // });
    const { quick } = this.props;
    const rotationX = quick ? 0.1 : 0.01;
    const rotationY = quick ? 0.5 : 0.01;
    this.setState(({ cubeRotation: prevCube }) => {
      const cubeRotation = new THREE.Euler(
        prevCube.x + rotationX,
        prevCube.y + rotationY,
        0
      );
      return { cubeRotation };
    });
  };

  cameraPosition = new THREE.Vector3(0, 0, 10);

  render() {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    const { cubeRotation } = this.state;

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        clearColor={0x0c2340}
        alpha={true}
        clearAlpha={0}
        onAnimate={this.onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <mesh rotation={cubeRotation}>
            <boxGeometry width={3} height={3} depth={3} />
            <meshLambertMaterial color={0xf3ffe2} />
          </mesh>
          <ambientLight intensity={0.6} />
          <pointLight
            color={0xffffff}
            distance={10000}
            position={new THREE.Vector3(3, 3, 3)}
          />
        </scene>
      </React3>
    );
  }
}

Shape.propTypes = {
  quick: bool.isRequired
};

export default Shape;

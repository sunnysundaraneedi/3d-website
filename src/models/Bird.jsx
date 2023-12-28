import React, { useEffect, useRef } from "react";
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const ref = useRef();
  const { actions } = useAnimations(animations, ref);

  useFrame(({ clock, camera }) => {
    // ref.current.rotation.y += 0.25 * delta;
    ref.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 2;
    if (ref.current.position.x > camera.position.x + 10) {
      ref.current.rotation.y = Math.PI;
      console.log("hit1");
    } else if (ref.current.position.x < camera.position.x - 10) {
      console.log("hit2");
      ref.current.rotation.y = 0;
    }
    if (ref.current.rotation.y === 0) {
      ref.current.position.x += 0.01;
      ref.current.position.z -= 0.01;
    } else {
      ref.current.position.x -= 0.01;
      ref.current.position.z += 0.01;
    }
  });
  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  return (
    <mesh ref={ref} position={[-5, 1, 2]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;

import React, { useEffect, useRef } from "react";
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const ref = useRef();
  const { actions } = useAnimations(animations, ref);

  useFrame((_, delta) => {
    // ref.current.rotation.y += 0.25 * delta;
  });
  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  return (
    <mesh ref={ref} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;

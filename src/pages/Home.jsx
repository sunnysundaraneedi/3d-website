import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [1, -6.5, -45];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  return (
    <section className="w-100 h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
          <Sky />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;

// <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
//         POPUP
//       </div>
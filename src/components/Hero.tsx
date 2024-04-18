import { useAnimate,motion } from "framer-motion";
import { useRef, MouseEvent } from "react";
import {MouseImageTrailProps} from "../types";
import { FaMousePointer } from "react-icons/fa";


export const Hero: React.FC = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        `http://127.0.0.1:8000/media/Naruto_Tshirt_white_hMrdWqt.png`,
        `http://127.0.0.1:8000//media/Bleach.png`,
        `http://127.0.0.1:8000//media/one_piece_Tshirt_luffy_white_vhK5Wqu.png`,
        'http://127.0.0.1:8000//media/Naruto_Tshirt_e5PxsWR.png',
      



      ]}
    >
      <section className="flex justify-between h-[460px] w-full place-content-center bg-white overflow-hidden ">
        <div className=" ml-20 flex flex-col justify-evenly max-w-full  text-black">
          
        <motion.p
      initial={{ x: "-100vw" }} // Initial position, off-screen to the left
      animate={{
        x: ["-100vw","100vw"], // Move to the right edge of the screen
        transition: { duration:9, repeat: Infinity,delay:0.1}
      }}
      className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto p-4 uppercase text-3xl
       md:text-4xl lg:text-6xl  "
    >
      <div className="flex items-center justify-center gap-4">

      <p>New collection </p> <FaMousePointer size={26} />
      </div>
    </motion.p>
       
  <motion.p
      initial={{ x: "-100vw" }} 
      animate={{
        x: ["-100vw","100vw"], 
        transition: { duration:7, repeat: Infinity,delay:0.1}
      }}
      className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto p-4 uppercase text-lg mid:text-xl lg:text-2xl xl:text-3xl"
    >
      <div className="flex items-center justify-center  gap-4 text-3xl
       md:text-4xl lg:text-6xl w-full">

      <p> new collection </p> <FaMousePointer size={26} />
      </div>
    </motion.p>
        </div>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail: React.FC<MouseImageTrailProps> = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector) as HTMLImageElement;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative top-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0 overflow-hidden"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default MouseImageTrail;

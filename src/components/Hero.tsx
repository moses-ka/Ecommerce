import { useAnimate,motion } from "framer-motion";
import { useRef, MouseEvent } from "react";
import {MouseImageTrailProps} from "../types";
import { GiClick } from "react-icons/gi";

export const Hero: React.FC = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
       
        
        `http://127.0.0.1:8000//media/one_piece_Tshirt_luffy_white.png`,
        
        'http://127.0.0.1:8000/media/JJK_toji_stand_white.png',
       
        'http://127.0.0.1:8000/media/One_punch_man_white.png',
    
        
      ]}
    >
      <section className="flex justify-between h-[460px] w-full place-content-center bg-white dark:bg-[#19191a]  overflow-hidden ">
        <div className=" ml-20 flex flex-col justify-evenly max-w-full   text-black dark:text-white">
          
       
       
  
    <div className="flex   gap-4 text-3xl
       md:text-4xl lg:text-6xl w-full">
    <motion.div
      initial={{ x: "-100vw" }} 
      animate={{
        x: ["-100vw","100vw"], 
        transition: { duration:9, repeat: Infinity,delay:0.1}
      }}
      className="absolute top-20  transform   w-full h-auto p-4 uppercase text-lg mid:text-xl lg:text-2xl xl:text-3xl"
    >


      <p className="inline text-4xl "> new collection </p> <GiClick className="inline" size={26} />
     
    </motion.div>
    <motion.div
      initial={{ x: "100vw" }} 
      animate={{
        x: ["100vw","-100vw"], 
        transition: { duration:12, repeat: Infinity,delay:0.1}
      }}
      className="absolute   transform   w-full h-auto p-4 uppercase text-lg mid:text-xl lg:text-2xl xl:text-3xl"
    >


      <p className="inline text-4xl"> new collection </p> <GiClick className="inline" size={26} />
     
    </motion.div>
    </div>
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

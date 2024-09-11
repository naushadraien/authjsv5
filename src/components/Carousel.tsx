"use client";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  imgData: Array<{ src: string | StaticImageData; alt: string }>;
  autoSlide?: boolean;
  slidingDelay?: number;
};

function Carousel({ imgData, autoSlide = false, slidingDelay = 3000 }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);

  const handleNextImage = () => {
    setImgIndex((prevIndex) =>
      prevIndex === imgData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? imgData.length - 1 : prevIndex - 1
    );
  };

  const handleChangeImageIndex = (idx: number) => {
    setImgIndex(idx);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    endX.current = e.clientX;
    handleSwipe();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (startX.current - endX.current > 50) {
      handleNextImage();
    } else if (endX.current - startX.current > 50) {
      handlePrevImage();
    }
  };

  useEffect(() => {
    if (!autoSlide) return;

    const intervalId = setInterval(handleNextImage, slidingDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, [autoSlide, slidingDelay, imgIndex]);

  return (
    <div className="w-full flex justify-center flex-col gap-4 items-center mt-4">
      <div
        className="relative"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="transition-opacity duration-500 ease-in-out">
          <Image
            src={imgData[imgIndex].src}
            alt={imgData[imgIndex].alt}
            height={600}
            width={600}
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
        <div className="w-full absolute z-40 flex justify-between items-center top-0 bottom-0">
          <button onClick={handlePrevImage}>
            <ArrowBigLeft />
          </button>
          <button onClick={handleNextImage}>
            <ArrowBigRight />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {imgData.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`${
                imgIndex === idx ? "w-3 h-3 bg-green-500" : "w-2 h-2 bg-red-500"
              } rounded-full transition-all duration-300 ease-in-out`}
              onClick={() => handleChangeImageIndex(idx)}
              role="button"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;

// "use client";
// import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
// import Image, { StaticImageData } from "next/image";
// import { useEffect, useRef, useState } from "react";

// type Props = {
//   imgData: Array<{ src: string | StaticImageData; alt: string }>;
//   autoSlide?: boolean;
//   slidingDelay?: number;
// };

// function Carousel({ imgData, autoSlide = false, slidingDelay = 3000 }: Props) {
//   const [imgIndex, setImgIndex] = useState(0);
//   const startX = useRef(0);
//   const endX = useRef(0);

//   const handleNextImage = () => {
//     setImgIndex((prevIndex) =>
//       prevIndex === imgData.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrevImage = () => {
//     setImgIndex((prevIndex) =>
//       prevIndex === 0 ? imgData.length - 1 : prevIndex - 1
//     );
//   };

//   const handleChangeImageIndex = (idx: number) => {
//     setImgIndex(idx);
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     startX.current = e.clientX;
//   };

//   const handleMouseUp = (e: React.MouseEvent) => {
//     endX.current = e.clientX;
//     handleSwipe();
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     endX.current = e.changedTouches[0].clientX;
//     handleSwipe();
//   };

//   const handleSwipe = () => {
//     if (startX.current - endX.current > 50) {
//       handleNextImage();
//     } else if (endX.current - startX.current > 50) {
//       handlePrevImage();
//     }
//   };

//   useEffect(() => {
//     if (!autoSlide) return;

//     const intervalId = setInterval(handleNextImage, slidingDelay);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [autoSlide, slidingDelay, imgIndex]);

//   return (
//     <div className="w-full flex justify-center flex-col gap-4 items-center mt-4 relative overflow-hidden">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${imgIndex * 100}%)` }}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         {imgData.map((img, index) => (
//           <Image
//             key={index}
//             src={img.src}
//             alt={img.alt}
//             height={600}
//             width={600}
//             className="flex-shrink-0"
//           />
//         ))}
//       </div>
//       <div className="w-full absolute z-40 flex justify-between items-center top-0 bottom-0">
//         <button onClick={handlePrevImage}>
//           <ArrowBigLeft />
//         </button>
//         <button onClick={handleNextImage}>
//           <ArrowBigRight />
//         </button>
//       </div>
//       <div className="flex items-center gap-2">
//         {imgData.map((_, idx) => (
//           <div
//             key={idx}
//             className={`${
//               imgIndex === idx ? "w-3 h-3 bg-green-500" : "w-2 h-2 bg-red-500"
//             } rounded-full transition-all duration-300 ease-in-out`}
//             onClick={() => handleChangeImageIndex(idx)}
//             role="button"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Carousel;

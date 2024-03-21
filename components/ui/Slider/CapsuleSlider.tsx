import { motion, useDragControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import categories from "./categories.json";
const LocationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-1 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

const CapsuleSlider = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const capsuleContainer = useRef<HTMLDivElement>(null);
  const capsule = useRef<HTMLAnchorElement[]>([]);
  const container = useRef<HTMLDivElement>(null);

  const controls = useDragControls();

  const [hasScrolled, setHasScrolled] = useState(0);

  useEffect(() => {
    const carouselEle = carousel.current;
    if (carouselEle) {
      // console.log(
      //   carouselEle.offsetWidth,
      //   capsuleContainer.current?.offsetWidth,
      //   carouselEle.scrollWidth
      // );
      setWidth(carouselEle.scrollWidth - carouselEle.offsetWidth + 10);
    }
  }, []);
  const startDrag = (
    event:
      | MouseEvent
      | React.MouseEvent<Element, MouseEvent>
      | React.TouchEvent<Element>
      | React.PointerEvent<Element>
      | TouchEvent
      | PointerEvent
  ) => {
    // controls.start(event);
  };
  // const endDrag = (
  //   event:
  //     | MouseEvent
  //     | React.MouseEvent<Element, MouseEvent>
  //     | React.TouchEvent<Element>
  //     | React.PointerEvent<Element>
  //     | TouchEvent
  //     | PointerEvent
  // ) => {
  //   console.log(event, "control event");
  //   controls.start(event);
  //   console.log({ controls });
  // };

  // useEffect(() => {
  //   const containerEle = container.current;
  //   const onWheel = (event: {
  //     deltaX: number;
  //     deltaY: number;
  //     preventDefault: () => void;
  //   }) => {
  //     const { deltaX, deltaY } = event;
  //     if (deltaY == 0 || deltaX > width) return;
  //     const totalWidth = containerEle?.scrollWidth || containerEle?.offsetWidth;
  //     if (totalWidth && deltaY > totalWidth) {
  //       return;
  //     }
  //     if (containerEle) {
  //       const scrollPercentage =
  //         (100 * containerEle.scrollLeft) /
  //         (containerEle.scrollWidth - containerEle.clientWidth);

  //       setHasScrolled(hasScrolled + scrollPercentage);
  //     }

  //     event.preventDefault();
  //     if (totalWidth) {
  //       carousel?.current?.scrollBy({
  //         left: deltaY > totalWidth ? 0 : deltaY,
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //       // setScroll((width) => width - deltaY);
  //       // if()
  //       setWidth((width) => width - deltaY / 10);
  //       // console.log(width, deltaY, "=", width - deltaY, "scroll container");
  //       console.log(deltaY, "horizontal scroll");
  //       // console.log(
  //       //   containerEle?.scrollWidth,
  //       //   containerEle?.offsetWidth,
  //       //   "scroll width"
  //       // );
  //     }
  //   };
  //   containerEle?.addEventListener("wheel", onWheel);
  //   return () => {
  //     containerEle?.removeEventListener("wheel", onWheel);
  //   };
  // }, []);
  return (
    <>
      <div className="relative flex dark:bg-gray-900" ref={container}>
        {/* <div className="z-1 absolute  h-full cursor-pointer bg-gradient-to-r from-gray-100 p-2 py-6  text-white dark:from-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={18}
            height={12}
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 298 511.93"
            className="fill-gray-900 dark:fill-white"
          >
            <path
              fillRule="nonzero"
              d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
            />
          </svg>
        </div> */}
        <div
          ref={carousel}
          className="no-scrollbar flex cursor-grab overflow-x-scroll overscroll-contain px-2 py-4 text-2xl"
          onPointerDown={startDrag}
        >
          <motion.div
            ref={capsuleContainer}
            drag="x"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            className=" flex  select-none items-center space-x-3  whitespace-nowrap"
          >
            {categories.map((cat, i) => (
              <a
                ref={(ele: HTMLAnchorElement) => {
                  const ref = capsule.current;
                  if (ref) {
                    ref[i] = ele;
                  }
                }}
                key={i}
                // className={
                //   (i === 0
                //     ? "border-gray-800 bg-gray-700 text-gray-200 dark:bg-gray-200 dark:text-gray-900"
                //     : "bg-gray-100 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700") +
                //   " cursor-pointer rounded-full border border-gray-300    px-2 py-1 text-base transition-all"
                // }
                className={
                  "cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-base  text-gray-800 transition-all first:border-gray-800 first:bg-gray-700 first:text-gray-200 hover:bg-gray-200 first:hover:bg-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 first:dark:bg-gray-200 first:dark:text-gray-900 dark:hover:bg-gray-700 first:dark:hover:bg-white"
                }
              >
                {cat.label}
              </a>
            ))}
          </motion.div>

          <div className="no-scrollbar m-0    flex w-full  items-center space-x-4 overflow-y-scroll">
            {/* <button className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800">
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Purple to blue
          </span>
        </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CapsuleSlider;

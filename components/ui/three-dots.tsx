import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const ThreeDots = () => {
    const { scrollYProgress } = useScroll();

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.7,0.8, 0.9] : [1.05,5, 1];
      };
    const ball1TranslateX = useTransform(scrollYProgress, [0,0.05,0.8, 1], [0,1000,1000,500]);
    const ball2TranslateX = useTransform(scrollYProgress, [0,0.05,0.8, 1], [0,1200,1200,500]);

    const ball1TranslateY = useTransform(scrollYProgress, [0,0.05,0.8, 1], [0,100,100,880]);
    const ball2TranslateY = useTransform(scrollYProgress, [0,0.05,0.8, 1], [0,100,100,880]);
    const scale = useTransform(scrollYProgress, [0,0.5, 1], scaleDimensions());


  return (
    <>
        <motion.div 
        style={{
            translateX:ball1TranslateX,
            translateY:ball1TranslateY,
            scale
        }}
         className="sticky top-0 left-0  bg-red-500 w-5 h-5  rounded-full z-50"></motion.div>
        <motion.div 
        style={{
            translateX:ball2TranslateX,
            translateY:ball2TranslateY,
            scale
        }}
         className="sticky top-0 left-0 bg-blue-500 w-5 h-5  rounded-full z-50"></motion.div>
    </>
  )
}

export default ThreeDots
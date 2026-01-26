import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useSound } from "../audio/SoundContext";

const PageTransition = ({ children }: { children: ReactNode }) => {
    const { asPath } = useRouter();
    const { playSFX } = useSound();

    // Warp Effect Variants
    // Initial: Zoomed out slightly, invisible
    // Animate: Normal scale, visible
    // Exit: Zoomed in huge (flying through), fades out
    const variants = {
        initial: {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
        },
        enter: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1], // Ease-out-expo ish
            },
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 1, 1], // Accelerate out
            },
        },
    };

    useEffect(() => {
        // Play whoosh on route change
        // We define a handler for route change start/complete if needed, 
        // but effect on key change is simpler
        playSFX("whoosh");
    }, [asPath, playSFX]);

    return (
        <AnimatePresence
            mode="wait"
            initial={false} // Don't animate initial load if not desired, or true
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            <motion.div
                key={asPath}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;

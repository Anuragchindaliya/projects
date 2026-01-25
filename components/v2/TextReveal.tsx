import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export const TextReveal = ({
    text,
    className,
    delay = 0,
    duration = 0.5
}: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {text.split(" ").map((word, index) => (
                <motion.span variants={child} key={index} style={{ marginRight: "0.25em" }}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

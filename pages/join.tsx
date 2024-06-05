import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
const students = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=250&w=250"
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=250"
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?q=80&w=250"
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1488254491307-10ca8fa174c8?q=80&w=250"
    },
]

const ulVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};
const liVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const Join = () => {
    // const scope = useMenuAnimation(true);
    // const [shareScreen, setShareScreen] = useState(false)
    // const [isOpen, toggleOpen] = useCycle(false, true);
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen((b) => !b)
    }

    return (
        <div className="w-full  h-[calc(100vh-70px)] overflow-hidden flex justify-center"
        >
            <motion.img

                animate={isOpen ? "visible" : "hidden"}
                transition={{ type: "keyframes" }}
                initial={{
                    opacity: 0,
                    filter: "blur(5px)",
                }}
                variants={{
                    visible: {
                        width: 384,
                        height: "auto",
                        x: 0,
                        right: 0,
                        y: 20,
                        opacity: 1,
                        filter: "blur(0)",
                    },
                    hidden: {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        right: 0,
                        width: "98%",
                        height: "89%",
                        filter: "blur(0)",
                    }
                }}
                className="z-0 absolute w-[98%]  h-[89%]  right-0  rounded-2xl block  m-4 "
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2970&fit=crop"
            />
            { 
            // <div className="p-2 overflow-hidden">
                <img
                src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=3008&auto=format&fit=crop"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '68%' }} // optional
                className="relative -z-10 rounded-2xl m-4 object-cover"
                // layout="responsive"
            />
            // </div>
            }
            <div className="ml-auto z-0 absolute right-10 top-2/4">
                <button
                    onClick={() => toggleOpen()}
                    className="bg-[#5d6c4e] z-0  right-7 p-4 rounded-full">
                    {isOpen ? <FaVideo className="w-5 h-5" /> :
                        <FaVideoSlash className="w-5 h-5" />}

                </button>
            </div>
            <motion.ul
                className="flex absolute bottom-0 bg-gradient-to-t from-black justify-center w-full gap-8 overflow-hidden mt-5 h-[300px] items-center"
            // variants={ulVariants}


            >
                <motion.div
                className="flex"
                animate={!isOpen ? "visible" : "hidden"}
            transition={{duration:1,type:"spring"}}
                // variants={{
                //    hidden:{
                //     scale:.5
                //    },
                //    visible:{
                //     scale:1
                //    }
                // }}
                >
                    {students.map(({ id, img }) => {
                        return <motion.li
                            key={id}
                            initial={{
                                opacity: 0, x: 0,
                                y: "120%",
                            }}
                            animate={isOpen ? "visible" : "hidden"}
                            // whileInView="visible"
                            // viewport={{ once: true }}
                            transition={{ duration: id * 0.3, type: "spring",delayChildren:5,staggerChildren:5 }}
                            variants={{
                                visible: {
                                    opacity: 1, x: 0, y: 50,
                                    // animationDuration:"5s",
                                    // scale:.5,
                                    // width:150,
                                    // height:100
                                    scale:1,
                                    margin:5,
                                    startOffset:id*5,
                                },
                                hidden: {
                                    opacity: 1, x: 0, y: 0,
                                    scale:1.2,
                                    margin:30
                                    // width:250,
                                    // height:200
                                }
                            }}

                            className="w-[200px] h-[150px] border-white border-4  rounded-xl overflow-hidden">
                            <Image
                                width={250}
                                height={250}
                                src={img}
                                layout="fixed"
                                className="h-full w-full object-cover object-center object"
                            />
                        </motion.li>
                    })}
                </motion.div>



            </motion.ul>
        </div>
    )
}

export default Join
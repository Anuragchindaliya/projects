import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
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
    const [isOpen,setIsOpen]=useState(false)
    const toggleOpen = ()=>{
        setIsOpen((b)=>!b)
    }

    return (
        <div className="w-full  h-[calc(100vh-70px)] overflow-hidden flex " 
        >
            <motion.div
                animate={isOpen ? "visible" : "hidden"}
                variants={{
                    visible: {
                        opacity: 1, x: 0, y: 0
                    },
                    hidden: {
                        opacity: 0, x: 0,
                        y: "120%",
                    }
                }}
            >
                {/* <Image
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    // width={0}
                    // height={0}
                    // sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    // className="relative"
                    layout="fill"
                /> */}
            </motion.div>
            <motion.img
                // animate={isOpen ? "visible" : "hidden"}
                // transition={{ type: "keyframes" }}
                // variants={{
                //     visible: {
                //         width: 100,
                //         height: 100,
                //         x: "100%",
                //         y: 0
                //     },
                //     hidden: {
                //         width: "100%",
                //         height: "100%",
                //         x: 0,
                //         y: 0

                //     }
                // }}
                className="-z-10 absolute w-full h-full"
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2970&fit=crop"
            />
            {/* <motion.img
                animate={isOpen ? "visible" : "hidden"}
                transition={{type:"keyframes"}}
                variants={{
                    visible: {
                        width:100,
                        height:100,
                        x:"100%",
                        y:0  
                    },
                    hidden: {
                        width:"100%",
                        height:"100%",
                        x:0,
                        y:0

                    }
                }}
                className="-z-5 absolute w-full h-full"
                src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=3008&auto=format&fit=crop"
            /> */}
            {/* <Image
                src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=3008&auto=format&fit=crop"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} // optional
                className="relative"
                layout="fill"
            /> */}
            <div className="ml-auto z-0 absolute right-10 top-2/4">
                <button
                    onClick={() => toggleOpen()}
                    className="bg-[#5d6c4e] z-0  right-7 p-4 rounded-full">
                    {isOpen ? <FaUsers className="w-5 h-5" /> :
                        <FaUsersSlash className="w-5 h-5" />}

                </button>
            </div>
            <motion.ul
                className="flex absolute bottom-0 bg-gradient-to-t from-black justify-center w-full gap-8 overflow-hidden mt-5 h-[300px] items-center"
            // variants={ulVariants}
            >

                {students.map(({ id, img }) => {
                    return <motion.li
                        key={id}
                        initial="hidden"
                        animate={isOpen ? "visible" : "hidden"}
                        // whileInView="visible"
                        // viewport={{ once: true }}
                        transition={{ duration: id * 0.3, type: "spring" }}
                        variants={{
                            visible: {
                                opacity: 1, x: 0, y: 0
                            },
                            hidden: {
                                opacity: 0, x: 0,
                                y: "120%",
                                // y:""
                            }
                        }}

                        className="w-[250px] h-[250px] border-white border-4  rounded-xl overflow-hidden">
                        <Image
                            width={250}
                            height={250}
                            src={img}
                            layout="fixed"
                            className="h-full w-full object-cover "
                        />
                    </motion.li>
                })}



            </motion.ul>
        </div>
    )
}

export default Join
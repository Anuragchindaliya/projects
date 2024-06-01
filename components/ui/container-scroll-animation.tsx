"use client";
import linearImg from "assets/images/linear.webp";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
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
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};

export function HeroScrollDemo() {
    return (
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={linearImg}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    );
  }
   
  export const users = [
    {
      name: "Manu Arora",
      designation: "Founder, Algochurn",
      image: "https://picsum.photos/id/10/300/300",
      badge: "Mentor",
    },
    {
      name: "Sarah Singh",
      designation: "Founder, Sarah's Kitchen",
      image: "https://picsum.photos/id/11/300/300",
      badge: "Mentor",
    },
    {
      name: "John Doe",
      designation: "Software Engineer, Tech Corp",
      image: "https://picsum.photos/id/12/300/300",
      badge: "Mentor",
    },
    {
      name: "Jane Smith",
      designation: "Product Manager, Innovate Inc",
      image: "https://picsum.photos/id/13/300/300",
      badge: "Mentor",
    },
    {
      name: "Robert Johnson",
      designation: "Data Scientist, DataWorks",
      image: "https://picsum.photos/id/14/300/300",
      badge: "Mentor",
    },
    {
      name: "Emily Davis",
      designation: "UX Designer, DesignHub",
      image: "https://picsum.photos/id/15/300/300",
      badge: "Mentor",
    },
    {
      name: "Michael Miller",
      designation: "CTO, FutureTech",
      image: "https://picsum.photos/id/16/300/300",
      badge: "Mentor",
    },
    {
      name: "Sarah Brown",
      designation: "CEO, StartUp",
      image: "https://picsum.photos/id/17/300/300",
    },
    {
      name: "James Wilson",
      designation: "DevOps Engineer, CloudNet",
      image: "https://picsum.photos/id/18/300/300",
      badge: "Something",
    },
    {
      name: "Patricia Moore",
      designation: "Marketing Manager, MarketGrowth",
      image: "https://picsum.photos/id/19/300/300",
      badge: "Mentor",
    },
    {
      name: "Richard Taylor",
      designation: "Frontend Developer, WebSolutions",
      image: "https://picsum.photos/id/20/300/300",
    },
    {
      name: "Linda Anderson",
      designation: "Backend Developer, ServerSecure",
      image: "https://picsum.photos/id/21/300/300",
    },
    {
      name: "William Thomas",
      designation: "Full Stack Developer, FullStack",
      image: "https://picsum.photos/id/22/300/300",
      badge: "Badger",
    },
    {
      name: "Elizabeth Jackson",
      designation: "Project Manager, ProManage",
      image: "https://picsum.photos/id/23/300/300",
      badge: "Mentor",
    },
    {
      name: "David White",
      designation: "Database Administrator, DataSafe",
      image: "https://picsum.photos/id/24/300/300",
      badge: "Advocate",
    },
    {
      name: "Jennifer Harris",
      designation: "Network Engineer, NetConnect",
      image: "https://picsum.photos/id/25/300/300",
    },
    {
      name: "Charles Clark",
      designation: "Security Analyst, SecureIT",
      image: "https://picsum.photos/id/26/300/300",
    },
    {
      name: "Susan Lewis",
      designation: "Systems Analyst, SysAnalyse",
      image: "https://picsum.photos/id/27/300/300",
    },
    {
      name: "Joseph Young",
      designation: "Mobile Developer, AppDev",
      image: "https://picsum.photos/id/28/300/300",
      badge: "Mentor",
    },
    {
      name: "Margaret Hall",
      designation: "Quality Assurance, BugFree",
      image: "https://picsum.photos/id/29/300/300",
      badge: "Developer",
    },
  ];

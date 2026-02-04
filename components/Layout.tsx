// import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
// import { useRouter } from "next/router";
import { ReactNode } from "react";
import BottomNav from "./common/BottomNav";
import Header from "./common/Header";
import ProgressBar from "./common/ProgressBar";
import ClickSpark from "./ui/ClickSpark";

const Layout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter();

  return (
    <div className="cursor-default min-h-screen">
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Head>
          <title>Anurag chindaliya portfolio</title>
          <meta name="description" content="Software engineer from faridabad" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {/* <AnimatePresence 
      // exitBeforeEnter
      mode="wait"
      >
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.75,
          }}
          whileInView={{
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            animateState: {
              opacity: 1,
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            },
            exitState: {
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            },
          }}
        > */}

        {/* Your content here */}
        {children}
        {/* </motion.div>
      </AnimatePresence> */}
        {/* <Footer /> */}
        <BottomNav />
        {/* <div className="fixed bottom-4 left-0 right-0 z-[50] flex justify-center w-full">
        <FloatingDock items={
          [
            { title: "Home", icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/" },
            { title: "Project", icon: <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/project" },
            { title: "Skills", icon: <Code2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/skills" },
            { title: "User", icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/profile" },
            ]
            } />
            </div> */}
        <ProgressBar />
      </ClickSpark>
    </div>
  );
};

export default Layout;

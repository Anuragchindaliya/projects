import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { HeroScrollDemo } from "@/components/ui/container-scroll-animation";
import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect";
import GridBackgroundDemo from "@/components/ui/gridBg";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { BiLogoNodejs, BiLogoTypescript } from "react-icons/bi";
import { FaGithubSquare, FaGooglePlusSquare, FaLinkedin, FaReact } from 'react-icons/fa';
const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },
   
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },
   
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },
   
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
  ];
  const content = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/linear.webp"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Running out of content
        </div>
      ),
    },
  ];
const Edventure = () => {
  return (
    <>
    <HeroParallax products={products} />
    <div className="overflow-hidden dark:bg-black bg-white w-full">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        // badge={
        //   <Link href="https://peerlist.io/manuarora">
        //     <Badge className="h-10 w-10 transform -rotate-12" />
        //   </Link>
        // }
        src={`/linear.webp`}
        showGradient={false}
        
      />
    </div>
    <StickyScroll content={content} />
    <GoogleGeminiEffectDemo />
    <AnimatedTooltipPreview />
    <HeroScrollDemo />
    <GridBackgroundDemo>
        
      <section className="flex flex-col justify-center app-h-screen relative ">
        <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] -z-10"></div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
<div className="relative">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Hi, I'm
            <br />Anurag Chindaliya
            
          </h1>
          <div className="absolute inset-x-20 bottom-0 -z-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 bottom-0 -z-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 bottom-0 -z-10 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 bottom-0 -z-10 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
          {/* <SearchInput /> */}

          {/* <p className="mb-8 text-xl font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-2xl xl:px-48">
          A software engineer with 3 year of experience in web development with expertise in Frontend and intermdiate in backend .
          <br /> */}
          <TextGenerateEffect className="mb-8 text-xl font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-2xl xl:px-48" words="A software engineer with 3 year of experience in web development with expertise in Frontend and intermdiate in backend." />
          {/* </p> */}

          <div className='flex justify-center space-x-5 md:mb-14'>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="link" className="p-0"><FaReact className='text-4xl text-gray-800 dark:text-white' /></Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex justify-between space-x-4">
                  <FaReact className='text-4xl text-gray-800 dark:text-white' />
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-semibold">@reactjs</h4>
                    <p className="text-sm">
                      React is a JavaScript library for creating user interfaces.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="w-4 h-4 mr-2 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Release : 29 May 2013
                      </span>
                    </div>
                  </div>
                </div>

              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="link" className="p-0">
                  <BiLogoTypescript className='p-0 text-4xl text-gray-800  dark:text-white' />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex justify-between space-x-4">
                  <BiLogoTypescript className='text-4xl text-gray-800 dark:text-white' />
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-semibold">@typescript</h4>
                    <p className="text-sm">
                      TypeScript is a language for application scale JavaScript development.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="w-4 h-4 mr-2 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Release : 1 October 2012
                      </span>
                    </div>
                  </div>
                </div>

              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="link" className="p-0">
                  <BiLogoNodejs className='text-4xl text-gray-800 dark:text-white' />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex justify-between space-x-4">
                  <BiLogoNodejs className='text-4xl text-gray-800 dark:text-white' />
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-semibold">@nodejs</h4>
                    <p className="text-sm">
                      Node.js is an open source server environment
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="w-4 h-4 mr-2 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Release : 27 May 2009
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>





          </div>

          <div className="px-4 mx-auto mb-12 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36 md:mb-20">
            {/* <span className="font-semibold text-gray-400 uppercase">
            FEATURED IN
          </span> */}
            <div className="relative z-10 flex flex-wrap items-center justify-center mt-8 text-gray-500 sm:justify-between">
              <a
                href="https://www.linkedin.com/in/anurag-chindaliya/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center mb-5 mr-5 space-x-3 text-base hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0"
              >
                <FaLinkedin className="w-8 h-8" />
                <span>@anurag-chindaliya
                </span>
              </a>
              <a
                href="https://github.com/Anuragchindaliya/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center mb-5 mr-5 space-x-3 text-base hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0"
              >
                <FaGithubSquare className="w-8 h-8" />
                <span>@Anuragchindaliya
                </span>
              </a>
              <a
                href="mailto:anuragwebpoint@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center mb-5 mr-5 space-x-3 text-base hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0"
              >
                {/* <FaEnvelopeSquare className="w-8 h-8" /> */}
                <FaGooglePlusSquare className="w-8 h-8" />
                <span>anuragwebpoint
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </GridBackgroundDemo>
    </>

  )
}

export default Edventure
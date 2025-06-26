import { Button } from "@/components/ui/button";
import GridBackgroundDemo from "@/components/ui/gridBg";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LinkPreview } from "@/components/ui/link-preview";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CalendarIcon } from "lucide-react";
import { BiLogoNodejs, BiLogoTypescript } from "react-icons/bi";
import { FaGithubSquare, FaGooglePlusSquare, FaLinkedin, FaReact } from 'react-icons/fa';
import { experienceString } from "utils";


const Profile = () => {
  return (
    <GridBackgroundDemo>
      <section className="flex flex-col justify-center app-h-screen relative ">
        <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] -z-10"></div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
          <div className="relative">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  md:text-5xl lg:text-6xl  
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-gray-900 via-gray-500 to-gray-900
            dark:from-white dark:via-white dark:to-gray-500
            animate-text">
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
          <TextGenerateEffect className="mb-8 text-xl font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-2xl xl:px-48" words={`A software engineer ${experienceString} specializing in Frontend technologies and intermediate in backend.`} />
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
                className="group flex items-center mb-5 mr-5 space-x-3 text-base hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0"
              >
                <FaLinkedin className="w-8 h-8 text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-700" />
                <span className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-700">@anurag-chindaliya
                </span>
              </a>
              <LinkPreview
                url="https://github.com/Anuragchindaliya/"
                // target="_blank"
                // rel="noreferrer"

                className="group flex items-center mb-5 mr-5 space-x-3 text-base hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0 group"
              >
                <FaGithubSquare className="w-8 h-8 text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-700" />
                <span className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-100 group-hover:text-gray-700">@Anuragchindaliya
                </span>
              </LinkPreview>
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
  )
}

export default Profile
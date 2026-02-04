import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ROUTES } from "../../utils";
const Skills = {
  Fill: (props: React.SVGProps<SVGSVGElement>) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      stroke="currentColor"
      viewBox="0 -960 960 960"
      {...props}>
      <path
        d="M479.825-80Q467-80 458.5-88.625T450-110v-58q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-168v58q0 12.75-8.675 21.375Q492.649-80 479.825-80ZM110-450q-12.75 0-21.375-8.675Q80-467.351 80-480.175 80-493 88.625-501.5T110-510h58q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T168-450h-58Zm682 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T792-510h58q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T850-450h-58Zm-74 250-40-39q-9-9-9-21t10-22q8.311-8 21.156-8Q713-290 722-282l39 40q9 9 9 21t-9 21q-8.556 9-21.778 9T718-200Zm-518 0q-9-8.311-9-21.156Q191-234 200-243l39-39q9-9 21.218-9t21.382 9.263q8.4 8.491 8.4 21.614Q290-247 282-239l-40 40q-9 9-21 9t-21-10Zm280-98q-75 0-128.5-53.5T298-480q0-49 21-88t59-64v-148q0-24.75 17.625-42.375T438-840h84q24.75 0 42.375 17.625T582-780v148q38 25 59 64t21 88q0 75-53.5 128.5T480-298Zm-42-355q10.5-3 21-4.5t21-1.5q10.5 0 21 1.5t21 4.5v-127h-84v127Z" />
    </svg>
  },
  Outline: (props: React.SVGProps<SVGSVGElement>) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      stroke="currentColor"
      viewBox="0 -960 960 960"
      {...props}>
      <path
        d="M479.825-80Q467-80 458.5-88.625T450-110v-58q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-168v58q0 12.75-8.675 21.375Q492.649-80 479.825-80ZM110-450q-12.75 0-21.375-8.675Q80-467.351 80-480.175 80-493 88.625-501.5T110-510h58q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T168-450h-58Zm682 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T792-510h58q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T850-450h-58Zm-74 250-40-39q-8-8-8.5-21t8.5-22q9-9 21.5-9t21.5 9l40 40q8 8 8.5 20.5T761-200q-9 9-21.5 9t-21.5-9Zm-518 0q-9-9-9-21.5t9-21.5l39-39q8-8 21-8.5t22 8.5q9 9 9 21.5t-9 21.5l-40 40q-8.442 8-20.721 8T200-200Zm280-98q-75 0-128.5-53.5T298-480q0-49 21-88t59-64v-148q0-24.75 17.625-42.375T438-840h84q24.75 0 42.375 17.625T582-780v148q38 25 59 64t21 88q0 75-53.5 128.5T480-298Zm-42-355q10.5-3 21-4.5t21-1.5q10.5 0 21 1.5t21 4.5v-127h-84v127Zm42.118 295Q531-358 566.5-393.618q35.5-35.617 35.5-86.5Q602-531 566.382-566.5q-35.617-35.5-86.5-35.5Q429-602 393.5-566.382q-35.5 35.617-35.5 86.5Q358-429 393.618-393.5q35.617 35.5 86.5 35.5ZM480-480Z" />
    </svg>
  }
}
const ProfileOutline = (props: React.SVGProps<SVGSVGElement>) => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    // viewBox="0 0 24 24"
    stroke="currentColor"
    // height="48"
    viewBox="0 -960 960 960"
    // width="48"
    {...props}>
    <path
      d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm260 321H220q-24.75 0-42.375-17.625T160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v34q0 24.75-17.625 42.375T740-160Zm-520-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
  </svg>
}
const ProfileFill = (props: React.SVGProps<SVGSVGElement>) => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    stroke="currentColor"
    viewBox="0 -960 960 960"
    {...props}>
    <path
      d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM220-160q-25 0-42.5-17.5T160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v34q0 25-17.5 42.5T740-160H220Z" />
  </svg>
}
const ProjectOutline = (props: React.SVGProps<SVGSVGElement>) => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    // viewBox="0 0 24 24"
    stroke="currentColor"
    // height="48"
    viewBox="0 -960 960 960"
    // width="48"
    {...props}>
    <path
      d="M140-120q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h180v-100q0-24 18-42t42-18h200q24 0 42 18t18 42v100h180q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680v-480H140v480Zm240-540h200v-100H380v100ZM140-180v-480 480Zm376-240L412-316q-6 6-6 14t6 14q6 6 14 6t14-6l111-111q9-9 9-21t-9-21L439-553q-6-6-14-6t-14 6q-6 6-6 14t6 14l105 105Z" />
  </svg>
}
const ProjectFill = (props: React.SVGProps<SVGSVGElement>) => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    stroke="currentColor"
    viewBox="0 -960 960 960"
    {...props}>
    <path
      d="M140-120q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h180v-100q0-24 18-42t42-18h200q24 0 42 18t18 42v100h180q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm240-600h200v-100H380v100Zm136 300L412-316q-6 6-6 14t6 14q6 6 14 6t14-6l111-111q9-9 9-21t-9-21L439-553q-6-6-14-6t-14 6q-6 6-6 14t6 14l105 105Z" />
  </svg>
}
const HomeOutlineComp = (props: React.SVGProps<SVGSVGElement>) => {
  return <svg xmlns="http://www.w3.org/2000/svg"
    fill="none"
    // viewBox="0 0 24 24"
    stroke="currentColor"
    // height="48"
    viewBox="0 -960 960 960"
    // width="48"
    {...props}
  >
    <path
      d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm0 60q-24.75 0-42.375-17.625T160-180v-390q0-14.25 6.375-27T184-618l260-195q8.295-6 17.344-9 9.049-3 18.853-3 9.803 0 18.717 3 8.915 3 17.086 9l260 195q11.25 8.25 17.625 21T800-570v390q0 24.75-17.625 42.375T740-120H530v-250H430v250H220Zm260-353Z" />
  </svg>
}
const HomeFillComp = (props: React.SVGProps<SVGSVGElement>) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    // height="48" 
    stroke="currentColor"

    viewBox="0 -960 960 960"
    //  width="48"
    {...props}
  >
    <path
      d="M220-120q-24.75 0-42.375-17.625T160-180v-390q0-14.25 6.375-27T184-618l260-195q8.295-6 17.344-9 9.049-3 18.853-3 9.803 0 18.717 3 8.915 3 17.086 9l260 195q11.25 8.25 17.625 21T800-570v390q0 24.75-17.625 42.375T740-120H560v-280H400v280H220Z" />
  </svg>
}
const ExtenstionIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
      ></path>
    </svg>
  );
};
const SearchIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};
const SaveIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};

const UserIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
};
const PhoneIcon = (props: any) => {
  const { style, ...prop } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      // className="w-6 h-6"
      {...prop}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>

    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   xmlnsXlink="http://www.w3.org/1999/xlink"
    //   version="1.1"
    //   x="0px"
    //   y="0px"
    //   {...prop}
    //   viewBox="0 0 473.806 473.806"
    //   // style={{ enableBackground: "new 0 0 473.806 473.806" }}
    //   xmlSpace="preserve"
    // >
    //   <g {...prop}>
    //     <path d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4    c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8    c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6    c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5    c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26    c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9    c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806    C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20    c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6    c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1    c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3    c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5    c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8    c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9    l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1    C420.456,377.706,420.456,388.206,410.256,398.806z" />
    //     <path d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2    c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11    S248.656,111.506,256.056,112.706z" />
    //     <path d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11    c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2    c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z" />
    //   </g>
    // </svg>
  );
};
const navList = [
  {
    id: "1",
    title: "Home",
    icon: HomeOutlineComp,
    activeIcon: HomeFillComp,
    path: ROUTES.HOME,
  },
  {
    id: "2",
    title: "Project",
    icon: ProjectOutline,
    activeIcon: ProjectFill,
    path: ROUTES.PROJECT,
  },
  {
    id: "3",
    title: "Case Studies",
    icon: (props: React.SVGProps<SVGSVGElement>) => <BookOpen {...props} strokeWidth={1.5} fill="none" className="fill-none" />,
    activeIcon: (props: React.SVGProps<SVGSVGElement>) => <BookOpen {...props} fill="none" />,
    path: ROUTES.CASESTUDY,
  },
  // {
  //   id: "3",
  //   title: "Skills",
  //   icon: Skills.Outline,
  //   activeIcon: Skills.Fill,
  //   path: ROUTES.SKILLS,
  // },
  // {
  //   id: "4",
  //   title: "User",
  //   icon: ProfileOutline,
  //   activeIcon: ProfileFill,
  //   path: ROUTES.PROFILE,
  // },
];
const BottomNav = () => {
  const [lastYPos, setLastYPos] = React.useState(0);
  const [shouldShowActions, setShouldShowActions] = React.useState(true);
  const { pathname } = useRouter();
  const basePath = pathname === "/" ? pathname : "/" + pathname.split("/")[1];

  React.useEffect(() => {
    function handleScroll() {
      // if (window.screenY) {
      //   setShouldShowActions(true);
      //   return;
      // }
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      setShouldShowActions(isScrollingUp);
      setLastYPos(yPos);
    }

    window.addEventListener("scroll", handleScroll, false);

    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, [lastYPos]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShowActions ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
      className="fixed bottom-0 z-10 flex justify-center w-full px-2 py-1 "
    >
      <div
        className="relative flex items-center justify-between w-full text-gray-400 border border-gray-300 shadow bg-gray-50/30 dark:border-gray-600 dark:text-gray-500 rounded-2xl dark:bg-neutral-950/80 backdrop-blur-sm lg:hidden"
      // [&>a]:first:rounded-l-xl [&>a]:last:rounded-r-xl [&>a]:last:rounded-r-0
      >
        {navList.map(({ path, icon: Icon, activeIcon: ActiveIcon }, i) => (
          <Link key={i} href={path}>
            <a
              className={
                (basePath === path
                  ? "text-gray-800 dark:text-white "
                  : "hover:bg-gray-200/75 fill-gray-400  hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300") +
                "  m-1  flex flex-1 flex-col items-center rounded-xl p-2 transition duration-200 ease-in"
                // first:rounded-l-xl last:rounded-r-xl last:rounded-r-0
              }
            >

              {basePath === path ? <ActiveIcon className="z-20 w-6 h-6 fill-current" /> : <Icon className="z-20 w-6 h-6 fill-current" />}
              {/* <Icon
                {...(basePath === path
                  ? {
                    className: "stroke-current fill-current h-6 w-6 z-20",
                  }
                  : { className: "stroke-current  h-6 w-6 " })}
              /> */}
              {basePath === path && (
                <motion.div
                  layoutId="activeMobileNav"
                  // className="flex flex-col items-center hover:text-blue-400 "
                  transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                  className=" absolute top-0 bottom-0  m-1 rounded-xl bg-gray-200 hover:bg-gray-300/10 dark:hover:bg-gray-700 dark:bg-gray-600 p-4 px-[11vw] "
                // className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-2 text-3xl text-center text-white transition duration-200 ease-in bg-gray-500 border-2 border-gray-900 rounded-full shadow-2xl sm:px-11 -z-10 h-11 w-11 dark:border-gray-50 hover:border-blue-500 "
                >
                  {/* <PhoneIcon />
          <span className="absolute inline-flex w-full h-full border-4 rounded-full opacity-50 animate-ping" /> */}
                </motion.div>
              )}
            </a>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default BottomNav;

import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import darkLogo from "../../assets/images/anu-tex-black-logo.png";
import lightLogo from "../../assets/images/anu-tex-white-logo.png";
import { ROUTES } from "../../utils";
import useBoolean from "../Hooks/useBoolean";
import NavLink from "./NavLink";
import ThemeBtn from "./ThemeBtn";
const menuList = [
  {
    name: "Home",
    link: ROUTES.HOME,
  },
  // {
  //   name: "Experience",
  //   link: "/experience",
  // },
  {
    name: "Projects",
    link: ROUTES.PROJECT,
  },
  {
    name: "Skills",
    link: ROUTES.SKILLS,
  },
  {
    name: "Profile",
    link: ROUTES.PROFILE,
  },
  {
    name: "Edventure",
    link: ROUTES.EDVENTURE,
  },
  // {
  //   name: "Contact",
  //   link: "/contact",
  // },

];

const Navbar = () => {
  // const [isMenuOpen, setMenuOpen] = useState(false);
  const {
    value: isMenuOpen,
    setValue: setMenuOpen,
    toggle: handleMenuOpen,
  } = useBoolean(false);

  const { pathname } = useRouter();
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const basePath = pathname === "/" ? pathname : "/" + pathname.split("/")[1];

  return (
    <>
      <div className="flex items-center lg:order-2">
        {/* <a
              href="#"
              className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
            >
              Log in
            </a> */}
        <ThemeBtn />
        {/* <a
              href="#"
              className="mr-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5"
            >
              Get started
            </a> */}
        <button
          onClick={handleMenuOpen}
          data-collapse-toggle="mobile-menu-2"
          type="button"
          className="items-center hidden p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <MoreVertical />
          {/* <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg> */}
        </button>

      </div>
      <div
        onClick={() => {
          setMenuOpen(false);
        }}
        className={`${isMenuOpen ? "top-16 " : "-top-full"
          } absolute left-0  z-10 h-full w-full items-center justify-between   shadow-primary-900/40 transition-all lg:static lg:order-1  lg:flex lg:w-auto `}
      >
        <MenuList basePath={basePath} />
      </div>
    </>
  );
};

const MenuList = ({ basePath }: { basePath: string }) => {
  return (
    <ul
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col mt-4 font-medium bg-white divide-y shadow-2xl divide-slate-200 dark:divide-slate-700 dark:bg-gray-800 md:shadow-none dark:md:bg-gray-900 lg:mt-0 lg:flex-row lg:divide-y-0"
    >
      {menuList.map((menu, i) => {
        return <Menu menu={menu} basePath={basePath} key={i} />;
      })}
      {/*<li>
        <a
          href="#"
          className="block py-2 pl-3 pr-4 text-white rounded bg-primary-700 dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700"
          aria-current="page"
        >
          Home
        </a>
      </li>
       <li>
        <a
          href="#"
          className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
        >
          Company
        </a>
      </li> */}
    </ul>
  );
};
const Menu = ({
  menu: { name, link },
  basePath,
}: {
  menu: { name: string; link: string };
  basePath: string;
}) => {
  const [isHover, setHover] = useState(false);

  return (
    <li
      // px-3 py-1
      className="relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <NavLink
        href={link}
        className={`border-5 relative z-10 block  border-gray-100  py-3  pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:group-hover:text-white lg:border-0 lg:px-4 lg:py-1 lg:hover:bg-transparent lg:group-hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white`}
        activeClassName="block lg:px-4 lg:py-1 relative rounded bg-primary-700 py-2 pr-4 pl-3 dark:text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700 z-10"
      >
        <span className="relative z-50">
          {name}

          {/* active underline */}
          {basePath === link && (
            <motion.div
              layoutId="md:underline"
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              className="relative -bottom-1 z-10 hidden h-0.5 w-full bg-primary-600 bg-gray-800 dark:bg-white md:block"
            />
          )}
        </span>
      </NavLink>
      {isHover && (
        <motion.div
          layoutId="md:activeMenu"
          // initial={{ scale: 0.3 }}
          // animate={{  }}
          // exit={{ scale: 0.3 }}
          transition={{ type: "spring" }}
          className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded -z-0 dark:bg-gray-700 dark:text-gray-400"
        />
      )}
    </li>
  );
};

const Header = () => {
  return (
    <header>
      <nav className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-900 lg:px-6">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <Link href="/">
            <a className="flex items-center">
              <img
                // src="./images/anu-logo.png"
                src={darkLogo.src}
                className="h-6 mr-3 sm:h-9 dark:hidden"
                alt="Anurag chindaliya logo"
              />
              <img
                // src="./images/anu-logo.png"
                src={lightLogo.src}
                className="hidden h-6 mr-3 sm:h-9 dark:block"
                alt="Anurag chindaliya logo"
              />
              <span className="self-center text-xl font-semibold sr-only whitespace-nowrap dark:text-white">
                Anurag
              </span>
            </a>
          </Link>

          <Navbar />
        </div>
      </nav>
    </header>
  );
};

export default Header;

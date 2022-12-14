import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useBoolean from "../Hooks/useBoolean";
import NavLink from "./NavLink";
import ThemeBtn from "./ThemeBtn";
const menuList = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Works",
    link: "/works",
  },
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Experience",
    link: "/experience",
  },
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
          className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
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
            className="hidden h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        onClick={() => {
          setMenuOpen(false);
        }}
        className={`${
          isMenuOpen ? "top-16 " : "-top-full"
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
      className="mt-4 flex flex-col divide-y divide-slate-200 bg-white font-medium shadow-2xl dark:divide-slate-700 dark:bg-gray-800 md:shadow-none  dark:md:bg-gray-900 lg:mt-0 lg:flex-row  lg:divide-y-0"
    >
      {menuList.map((menu, i) => {
        return <Menu menu={menu} basePath={basePath} key={i} />;
      })}
      {/*<li>
        <a
          href="#"
          className="block rounded bg-primary-700 py-2 pr-4 pl-3 text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700"
          aria-current="page"
        >
          Home
        </a>
      </li>
       <li>
        <a
          href="#"
          className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
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
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <NavLink
        href={link}
        className={`border-5 relative z-10 block  border-gray-100  py-3  pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:group-hover:text-white lg:border-0 lg:px-4 lg:py-1 lg:hover:bg-transparent lg:group-hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white`}
        activeClassName="block lg:px-4 lg:py-1 relative rounded bg-primary-700 py-2 pr-4 pl-3 text-white dark:text-white lg:bg-transparent lg:p-0 lg:text-primary-700 z-10"
      >
        <span className="relative z-50">
          {name}

          {/* active underline */}
          {basePath === link && (
            <motion.div
              layoutId="md:underline"
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              className="relative -bottom-1 z-10 hidden h-0.5 w-full bg-primary-600 dark:bg-white md:block"
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
          className="absolute left-0 top-0 -z-0  h-full w-full rounded bg-primary-100 dark:bg-gray-700 dark:text-gray-400"
        />
      )}
    </li>
  );
};

const Header = () => {
  return (
    <header>
      <nav className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-900 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link href="/">
            <a className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Anurag Chindaliya
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

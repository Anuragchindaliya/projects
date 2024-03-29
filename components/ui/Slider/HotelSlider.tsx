const CapsuleSliderRef = () => {
  return (
    <>
      <h4 className="font-semibold">Recomented Hotels</h4>
      <div className="m-0 flex  grid  w-full grid-cols-2 items-center justify-center space-x-4 overflow-y-scroll ">
        <div
          className="relative my-2 flex h-64   w-full cursor-pointer flex-col  justify-between overflow-hidden  rounded-3xl rounded-lg bg-white bg-cover object-cover object-center text-gray-800 shadow-md shadow-md"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80")',
          }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-t  from-green-400 to-blue-400 opacity-50" />
          <div className="relative flex h-72 w-full  flex-row items-end ">
            <div className="absolute right-0 top-0 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 rounded-full p-2 text-gray-200 transition duration-200 ease-in hover:bg-white hover:text-blue-400 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <div className="z-10 flex  w-full flex-col rounded-lg p-6 ">
              <h4 className="mt-1 truncate text-xl font-semibold  leading-tight text-white">
                Loremipsum..
              </h4>
              <div className="flex items-center justify-between ">
                <div className="flex flex-col">
                  <h2 className="flex items-center text-sm font-normal text-gray-300">
                    Dubai
                  </h2>
                </div>
              </div>
              <div className="flex pt-4  text-sm text-gray-300">
                <div className="mr-auto flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className="font-normal">4.5</p>
                </div>
                <div className="flex items-center font-medium text-white ">
                  $1800
                  <span className="text-sm font-normal text-gray-300">
                    {" "}
                    /wk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative my-2 flex h-64   w-full cursor-pointer  flex-col  justify-between overflow-hidden  rounded-3xl rounded-lg bg-white bg-cover object-cover object-center text-gray-800 shadow-md shadow-md"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80")',
          }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-t  from-blue-500 to-yellow-400 opacity-50" />
          <div className="relative flex h-72 w-full  flex-row items-end ">
            <div className="absolute right-0 top-0 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 rounded-full p-2 text-gray-200 transition duration-200 ease-in hover:bg-white hover:text-blue-400 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <div className="z-10 flex  w-full flex-col rounded-lg p-5 ">
              <h4 className="mt-1 truncate text-xl font-semibold  leading-tight text-white">
                Loremipsum..
              </h4>
              <div className="flex items-center justify-between ">
                <div className="flex flex-col">
                  <h2 className="flex items-center text-sm font-normal text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    India
                  </h2>
                </div>
              </div>
              <div className="flex pt-4  text-sm text-gray-300">
                <div className="mr-auto flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className="font-normal">4.5</p>
                </div>
                <div className="flex items-center font-medium text-white ">
                  $1800
                  <span className="text-sm font-normal text-gray-300">
                    {" "}
                    /wk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CapsuleSliderRef;

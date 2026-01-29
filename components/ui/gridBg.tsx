"use client"
import { ReactNode } from "react";

// export function GridBackgroundDemo({children}:{chindren:ReactNode}) {
//   return (
//     <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
//       {/* Radial gradient for the container to give a faded look */}
//       <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
//       <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
//         {children}
//       </p>
//     </div>
//   );
// }

const GridBackgroundDemo = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full dark:bg-neutral-900 bg-white   dark:bg-grid-white/[0.08] bg-grid-black/[0.08] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-neutral-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_60%)]"></div>
      <div className="mt-32 text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        {children}
      </div>
    </div>
  )
}

export default GridBackgroundDemo

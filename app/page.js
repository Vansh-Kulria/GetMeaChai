import React from 'react';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-1 justify-center h-52 items-center   text-white">
        <div className='font-bold text-3xl '>Buy Me a Chai</div>
        <p className='text-gray-300'>A crowdfunding Platform for creators. Get funded by your fans and followers. <span className="text-lg font-bold text-white" >Start Now</span></p>
        <div className='flex gap-2 mt-4'>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
            focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
            transition-all duration-300"
          >
            Start Now
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
            focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
            transition-all duration-300"
          >
            Read More! 
          </button>
        </div>
      </div>
      
      <div className='h-[1px] w-full bg-gray-800/70'>
      </div>
    </>
  );
}

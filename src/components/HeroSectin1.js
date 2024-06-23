// app/HeroSection1.jsx
'use client';

import Image from 'next/image';

const HeroSection1 = () => {
  return (
    <div className="relative z-10 container mx-auto px-4">
      <div className="flex flex-wrap justify-center items-center pt-32">
        <div className="w-auto">
          <h1 className="mb-4 font-heading text-center text-white text-8xl md:text-10xl font-bold">
            Grow SaaS business fast
          </h1>
          <p className="mb-9 font-medium text-lg text-center text-white">
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat
          </p>
          <div className="flex flex-wrap justify-center items-center mb-7 -m-1.5">
            <div className="w-full lg:w-72 p-1.5">
              <input
                className="text-gray-500 px-5 py-4 w-full placeholder-gray-500 outline-none focus:ring-4 focus:ring-indigo-400 rounded"
                type="text"
                placeholder="Enter email to get started"
              />
            </div>
            <div className="w-full lg:w-auto p-1.5">
              <button className="group relative font-heading px-6 py-5 w-full lg:w-auto uppercase text-white text-xs font-semibold tracking-px bg-gray-900 hover:bg-gray-800 overflow-hidden rounded-md">
                <div className="absolute top-0 left-0 transform -translate-x-full group-hover:-translate-x-0 h-full w-full transition ease-in-out duration-500 bg-gradient-indigo"></div>
                <p className="relative z-10">Start free trial</p>
              </button>
            </div>
          </div>
          <p className="mb-7 text-white text-sm text-center">Start with 14 days free trial. No credit card required</p>
          <div className="mb-24 flex items-center mx-auto p-2.5 bg-white bg-opacity-20 max-w-max rounded-full">
            <svg className="mr-2.5" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Add SVG paths here */}
            </svg>
            <div className="flex items-center">
              <svg className="mr-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add SVG paths here */}
              </svg>
              <svg className="mr-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add SVG paths here */}
              </svg>
              <svg className="mr-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Add SVG paths here */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection1;
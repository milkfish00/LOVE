import React from "react";

const About = () => {
  return (
    <div className="bg-[#81AA8E] min-h-screen flex items-center justify-center p-4">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 w-full">
        <div className="relative isolate overflow-hidden bg-white px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Praesent dui arcu, mattis vel tortor sit amet, ornare ultrices
              massa. In rutrum, ligula eu lacinia fermentum, ex ligula vulputate
              ante, eu facilisis nunc tortor vel sapien.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center px-8 py-4   rounded-full font-semibold text-lg text-black bg-[#FAB391] hover:opacity-90 transition-opacity duration-300">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative h-80">
            <img
              alt="App screenshot"
              src="https://images.pexels.com/photos/4871785/pexels-photo-4871785.jpeg"
              className="absolute left-0 top-0 w-full h-full object-cover md:w-[57rem] md:h-auto md:max-w-none md:object-fill bg-white/5 ring-1 ring-white/10 py-8 md:pt-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

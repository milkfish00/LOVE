import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute top-0 right-0 z-30 w-38 md:w-64 lg:w-80">
        <img
          src="/svg/flower3.svg"
          alt="Decorative flowers"
          className="w-full h-auto hover:rotate-180"
        />
      </div>

      <div className="absolute bottom-0 left-0 z-30 w-48 md:w-64 lg:w-80">
        <img
          src="/svg/flower2.svg"
          alt="Decorative flowers"
          className="w-full h-auto hover:rotate-45"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <img
        src="/hero.jpeg"
        alt="Children playing"
        className="w-full h-full object-cover absolute inset-0"
      />

      <div className="absolute inset-0 flex items-center justify-center text-center z-20">
        <div className="max-w-4xl px-6  ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Etiam elementum non nibh sit amet accumsan.
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <a
            href="/programs"
            className="bg-white cursor-pointer text-[#000000] px-8 py-4 rounded-full font-semibold text-lg hover:  transition-colors">
            Explore Our Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

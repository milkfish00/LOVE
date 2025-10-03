import React from "react";

const Features = () => {
  return (
    <section className="py-20   ">
      <div className="max-w-6xl mx-auto px-6 bg-white md:rounded-2xl py-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. massa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-[#a493c9] text-black rounded-2xl          ">
            <h3 className="text-xl font-bold text-black mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-black leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="text-center p-6 bg-[#FFD58B] rounded-2xl          ">
            <h3 className="text-xl font-bold text-black mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-black leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="text-center p-6 bg-[#7da9c7] text-black rounded-2xl          ">
            <h3 className="text-xl font-bold text-black mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-black leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

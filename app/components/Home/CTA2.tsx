import React from 'react'

const CTA2 = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="lg:flex items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lorem ipsum dolor sit amet.
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Praesent dui arcu, mattis vel tortor sit amet, ornare ultrices
                massa. In rutrum, ligula eu lacinia fermentum, ex ligula
                vulputate ante, eu facilisis nunc tortor vel sapien.
              </p>

              <a
                href="/resources/gallery"
                className="inline-flex items-center px-8 py-4   rounded-full font-semibold text-lg text-white bg-[#F48573] hover:opacity-90 transition-opacity duration-300">
                View Our Gallery
              </a>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4982453/pexels-photo-4982453.jpeg"
                  alt="Children playing and learning"
                  className="w-full h-[500px] object-cover rounded-2xl   "
                />
                {/* Flower decoration */}
                <div className="absolute -top-6 -right-6 w-28 h-28">
                  <img
                    src="/svg/flower5.svg"
                    alt="Decorative flower"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA2
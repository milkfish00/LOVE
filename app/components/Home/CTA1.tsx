import React from 'react'
import Image from 'next/image'

const CTA1 = () => {
  return (
    <section className="py-20 bg-white ">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="lg:flex items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="relative h-[300px] w-full md:rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg"
                    alt="Students learning in classroom"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Flower decoration */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32">
                  <img src="/svg/flower4.svg" alt="" loading="lazy" decoding="async" className="w-full h-auto" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <h2 className="text-4xl md:text-5xl font-bold   mb-6">
                Lorem ipsum dolor sit amet.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Praesent dui arcu, mattis vel tortor sit amet, ornare ultrices
                massa. In rutrum, ligula eu lacinia fermentum, ex ligula
                vulputate ante, eu facilisis nunc tortor vel sapien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA1
import React from 'react'

const CTA3 = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold   mb-6">
          Ready to Start Your Child's Journey?
        </h2>
        <p className="text-xl  /90 mb-8 max-w-2xl mx-auto">
          Join our community of families and give your child the foundation they
          need for a bright future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/enrollment"
            className="inline-flex items-center px-8 py-4 bg-white text-[#FFB5A7] rounded-full font-semibold text-lg hover:  transition-colors duration-300">
            Schedule a Tour
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 border-2 border-white   rounded-full font-semibold text-lg hover:bg-white hover:text-[#FFB5A7] transition-all duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA3
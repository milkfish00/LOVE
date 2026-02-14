"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Testimonials, TestimonialItem } from "@/app/lib/interface";

interface TestimonialsSliderProps {
  testimonials?: Testimonials[];
}

const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials = [],
}) => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Flatten all testimonial items from all testimonial docs
  const testimonialItems: TestimonialItem[] = testimonials.flatMap(
    (t) => t.testimonialsSections || [],
  );

  if (!testimonialItems || testimonialItems.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: testimonialItems.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  return (
    <section className="py-12 md:py-16" aria-label="testimonials-section">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          {testimonials[0]?.title || "What Our Parents Say"}
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Container with arrows on the sides */}
        <div className="relative w-full flex items-center gap-4 md:gap-6">
          {/* Left Navigation Arrow */}
          {testimonialItems.length > 1 && (
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="hidden md:flex p-4 cursor-pointer bg-[#86af61] hover:bg-[#6B9578] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#86af61] focus:ring-offset-2 shrink-0"
              aria-label="Previous testimonial">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Main Container */}
          <div className="relative overflow-hidden rounded-2xl w-full bg-[#5a80ae] flex-1 py-10 ">
            {/* Huge SVG flower bottom right */}

            {/* Huge SVG flower top left */}
            <img
              src="/svg/flower6.svg"
              alt="Decorative flower"
              className="pointer-events-none select-none absolute -top-20 -left-40 w-[320px] h-80 md:w-120 md:h-120  lg:w-150 lg:h-150 object-contain opacity-10 z-0 rotate-180"
              aria-hidden="true"
            />

            <div className="relative z-10 p-0 ">
              <Slider ref={sliderRef} {...settings}>
                {testimonialItems.map((testimonial) => (
                  <div key={testimonial._key}>
                    <div className="flex flex-col items-center text-center min-h-105 md:min-h-95 h-full grow justify-center px-4 py-0 flex-1">
                      {/* Star Rating */}
                      <div
                        className="flex gap-1 mb-8"
                        aria-label={`${testimonial.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? "fill-[#ffd58b] text-[#ffd58b]"
                                : "fill-white/30 text-white/30"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text and Author Info */}
                      <div className="flex flex-col items-center justify-center w-full">
                        <blockquote className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mb-8">
                          "{testimonial.testimonial}"
                        </blockquote>
                        <div className="pt-6 border-t border-white/20 w-full max-w-md">
                          <div className="font-bold text-xl md:text-2xl text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm md:text-base text-white/70 mt-1">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>

                      {/* Pagination Dots (mobile only, placeholder for spacing) */}
                      {testimonialItems.length > 1 && <div className=" " />}
                    </div>
                  </div>
                ))}
              </Slider>

              {/* Pagination Dots - Fixed position */}
              {testimonialItems.length > 1 && (
                <div className="hidden md:flex gap-2 m-0 md:my-3 justify-center">
                  {testimonialItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => sliderRef.current?.slickGoTo(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-white w-8"
                          : "bg-white/40 hover:bg-white/60 w-2"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-current={currentSlide === index ? "true" : "false"}
                    />
                  ))}
                </div>
              )}

              {/* Mobile Navigation Arrows */}
              {testimonialItems.length > 1 && (
                <div className="flex md:hidden gap-4 mt-5 justify-center">
                  <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="p-3 bg-[#86af61] hover:bg-[#6B9578] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#86af61] focus:ring-offset-2"
                    aria-label="Previous testimonial">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => sliderRef.current?.slickNext()}
                    className="p-3 bg-[#86af61] hover:bg-[#6B9578] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#86af61] focus:ring-offset-2"
                    aria-label="Next testimonial">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          {testimonialItems.length > 1 && (
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="hidden md:flex p-4 cursor-pointer bg-[#86af61] hover:bg-[#6B9578] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#86af61] focus:ring-offset-2 shrink-0"
              aria-label="Next testimonial">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;

"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeQuery } from "@/app/lib/queries";
import { homeInterface } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  speed: 600,
  arrows: false,
  cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "20px",
        dots: false,
      },
    },
  ],
};

interface TestimonialsSliderProps {
  data: homeInterface;
}

const TestimonialsSlider = ({ data }: TestimonialsSliderProps) => {
  const sliderRef = useRef<Slider>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Get testimonials data with fallback
  const testimonialsSection = data?.testimonialsSections?.[0];
  const testimonials = testimonialsSection?.testimonials || [];

  // If no testimonials, show fallback
  if (!testimonialsSection || testimonials.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Parents Say
            </h2>
            <p className="text-lg text-gray-600">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Adjust slider settings based on number of testimonials
  const dynamicSettings = {
    ...settings,
    infinite: testimonials.length > 3,
    slidesToShow: Math.min(3, testimonials.length),
    responsive: settings.responsive.map((breakpoint) => ({
      ...breakpoint,
      settings: {
        ...breakpoint.settings,
        slidesToShow: Math.min(
          breakpoint.settings.slidesToShow || 1,
          testimonials.length
        ),
        infinite: testimonials.length > (breakpoint.settings.slidesToShow || 1),
      },
    })),
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {testimonialsSection.title || "What Parents Say"}
          </h2>
      
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation for larger screens */}
          {!isMobile && testimonials.length > 1 && (
            <>
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Previous testimonial">
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-[#3A5F8A] transition-colors" />
              </button>

              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Next testimonial">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-[#3A5F8A] transition-colors" />
              </button>
            </>
          )}

          <div className="slider-container px-2 md:px-0">
            {testimonials.length === 1 ? (
              // Single testimonial - no slider needed
              <div className="flex justify-center">
                <div className="px-2 sm:px-3 max-w-md">
                  <TestimonialCard testimonial={testimonials[0]} />
                </div>
              </div>
            ) : (
              // Multiple testimonials - use slider
              <Slider {...dynamicSettings} ref={sliderRef}>
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._key}
                    className="px-2 sm:px-3 focus:outline-none">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          {/* Navigation for mobile */}
          {isMobile && testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-6 md:mt-8">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow flex items-center justify-center transition-all duration-300 group"
                aria-label="Previous testimonial">
                <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-[#3A5F8A] transition-colors" />
              </button>

              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow flex items-center justify-center transition-all duration-300 group"
                aria-label="Next testimonial">
                <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-[#3A5F8A] transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard: React.FC<{
  testimonial: homeInterface["testimonialsSections"][0]["testimonials"][0];
}> = ({ testimonial }) => {
  return (
    <div className="bg-gradient-to-br from-[#3A5F8A] to-[#2A4A6B] rounded-2xl p-6 md:p-8 h-auto min-h-[320px] relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>

        <blockquote className="text-sm sm:text-base md:text-lg leading-relaxed font-normal text-white flex-grow mb-4 md:mb-6">
          "{testimonial.quote}"
        </blockquote>

        <div className="pt-4 md:pt-6 border-t border-white/20 mt-auto">
          <div className="font-bold text-base md:text-lg text-white mb-1">
            {testimonial.author}
          </div>
          <div className="text-xs md:text-sm text-blue-200 font-medium">
            {testimonial.role && testimonial.childProgram
              ? `${testimonial.role} • ${testimonial.childProgram}`
              : testimonial.role || testimonial.childProgram || "Parent"}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-2 right-2 w-16 h-16 opacity-10">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>
    </div>
  );
};

// Server component wrapper to fetch data
export async function TestimonialsSliderWrapper() {
  const query = homeQuery;
  const data: homeInterface = await sanityClient.fetch(query);

  return <TestimonialsSlider data={data} />;
}

export default TestimonialsSlider;

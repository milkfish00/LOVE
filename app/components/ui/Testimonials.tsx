"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Testimonial {
  _id: string;
  _type: "testimonials";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  rating: number;
  role: string;
  testimonial: string;
}

interface TestimonialsSliderProps {
  testimonials?: Testimonial[];
  backgroundImage?: string;
}

const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials = [],
  backgroundImage = "https://images.pexels.com/photos/5278801/pexels-photo-5278801.jpeg",
}) => {
  const sliderRef = useRef<Slider>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle window resize to determine background attachment
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If no testimonials, don't render the component
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: testimonials.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <div
      className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundAttachment: isLargeScreen ? "fixed" : "scroll",
      }}>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id}>
              <div className="flex justify-center lg:justify-start items-center">
                {/* Testimonial Card */}
                <div className="bg-[#5a80ae] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 w-full max-w-3xl min-h-75 flex flex-col justify-between border-2 sm:border-4 border-[#5a80ae] relative overflow-hidden">
                  {/* Flower Image - Bottom Right */}
                  <img
                    src="/svg/flower6.svg"
                    alt="Decorative flower"
                    className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain opacity-10"
                  />

                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    {/* Star Rating */}
                    <div
                      className="flex gap-1"
                      aria-label={`${testimonial.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            i < testimonial.rating
                              ? "fill-[#ffd58b] text-[#ffd58b]"
                              : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-xl text-white leading-relaxed line-clamp-6 pb-4 font-medium">
                      "{testimonial.testimonial}"
                    </blockquote>
                  </div>

                  <div className="relative z-10">
                    {/* Author Info */}
                    <div className="pt-6 sm:pt-8 border-t-2 border-[#ffffff32]">
                      <div className="font-bold text-2xl md:text-3xl text-[#ffffff]">
                        {testimonial.name}
                      </div>
                      <div className="text-base md:text-lg font-semibold text-[#ffffff9a] mt-1">
                        {testimonial.role}
                      </div>
                    </div>

                    {/* Navigation Arrows - Only show if more than 1 testimonial */}
                    {testimonials.length > 1 && (
                      <div className="flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6">
                        <button
                          onClick={() => sliderRef.current?.slickPrev()}
                          className="p-2 sm:p-3 cursor-pointer bg-[#86af61] hover:bg-[#6B9578] active:bg-[#5a8f6a] rounded-full transition-all duration-300 focus:outline-none   transform hover:scale-105 active:scale-95  "
                          aria-label="Previous testimonial">
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                        <button
                          onClick={() => sliderRef.current?.slickNext()}
                          className="p-2 sm:p-3 cursor-pointer bg-[#86af61] hover:bg-[#6B9578] active:bg-[#5a8f6a] rounded-full transition-all duration-300 focus:outline-none   transform hover:scale-105 active:scale-95  "
                          aria-label="Next testimonial">
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialsSlider;

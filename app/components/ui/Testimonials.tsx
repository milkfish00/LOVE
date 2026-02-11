"use client";
import React, { useRef } from "react";
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
      className="w-full py-20 sm:py-32 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id}>
              <div className="flex justify-center lg:justify-start items-center">
                {/* Text Content - Fixed Width */}
                <div
                  className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-3xl min-h-75 flex flex-col justify-between"
                  style={{ backgroundColor: "#ffffff" }}>
                  <div className="space-y-6">
                    {/* Star Rating */}
                    <div
                      className="flex gap-1"
                      aria-label={`${testimonial.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            i < testimonial.rating
                              ? "fill-[#edc35c] text-[#edc35c]"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-xl text-gray-600 leading-relaxed line-clamp-6 pb-4">
                      "{testimonial.testimonial}"
                    </blockquote>
                  </div>

                  <div>
                    <div className="pt-8 border-t border-gray-200">
                      <div className="font-bold text-2xl md:text-3xl text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-base md:text-lg font-semibold text-gray-600 mt-1">
                        {testimonial.role}
                      </div>
                    </div>

                    {/* Navigation Arrows - Only show if more than 1 testimonial */}
                    {testimonials.length > 1 && (
                      <div className="flex items-center gap-4 pt-6">
                        <button
                          onClick={() => sliderRef.current?.slickPrev()}
                          className="p-2 sm:p-3 cursor-pointer bg-[#F48573] hover:bg-[#e7725f] rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#81AA8E]"
                          aria-label="Previous testimonial">
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                          onClick={() => sliderRef.current?.slickNext()}
                          className="p-2 sm:p-3 cursor-pointer bg-[#F48573] hover:bg-[#e7725f] rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F48573]"
                          aria-label="Next testimonial">
                          <ChevronRight className="w-6 h-6 text-white" />
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

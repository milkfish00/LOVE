import React, { useState, useRef, useEffect } from "react";
import { Quote } from "lucide-react";

const TestimonialsMarquee = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "Lorem Ipsum",
      title: "Parent, Two's Program",
    },
    {
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "Consectetur Elit",
      title: "Parent, Toddler Program",
    },
    {
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      name: "Adipiscing Amet",
      title: "Parent, Infant Program",
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "Lorem Ipsum",
      title: "Parent, Two's Program",
    },
    {
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "Consectetur Elit",
      title: "Parent, Toddler Program",
    },
    {
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      name: "Adipiscing Amet",
      title: "Parent, Infant Program",
    },
  ];

  const startAnimation = () => {
    const animate = () => {
      if (!isDragging && !isHovered && containerRef.current) {
        containerRef.current.scrollLeft += 0.5;
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    startAnimation();
    return stopAnimation;
  }, [isDragging, isHovered]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setStartX(touch.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full py-16 overflow-hidden bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Lorem ipsum dolor sit amet.
        </h2>
      </div>

      <div className="relative px-6 md:px-0">
        <div
          ref={containerRef}
          className="flex space-x-6 overflow-x-hidden cursor-grab active:cursor-grabbing select-none "
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-x",
          }}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl p-4 sm:p-6 lg:p-8 flex-shrink-0 w-72 sm:w-80 lg:w-96 xl:w-[420px] h-auto min-h-[200px] relative "
              style={{ backgroundColor: "#3A5F8A" }}>
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <blockquote className="text-base sm:text-lg lg:text-xl leading-relaxed font-normal text-white">
                  "{testimonial.quote}"
                </blockquote>

                <div className="pt-3 sm:pt-4 border-t border-white/30 border-opacity-20">
                  <div className="font-bold text-base sm:text-lg lg:text-xl text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm sm:text-base mt-1 text-blue-200">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsMarquee;

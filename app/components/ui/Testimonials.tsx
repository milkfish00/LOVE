"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Testimonials, TestimonialItem } from "@/app/lib/interface";

const LOGO = {
  amber: "#FDBB46",
  blue: "#4e7299",
  blueDark: "#264f71",
  green: "#86AF61",
};

const WORD_LIMIT = 30;
const COLLAPSED_HEIGHT = 360;

function truncate(text: string, limit: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return { short: text, isTruncated: false };
  return { short: words.slice(0, limit).join(" "), isTruncated: true };
}

function TestimonialSlide({
  testimonial,
  onHeightChange,
}: {
  testimonial: TestimonialItem;
  onHeightChange: (expanded: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { short, isTruncated } = truncate(testimonial.testimonial, WORD_LIMIT);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    onHeightChange(next);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-full px-8 md:px-14 py-10">
      {/* Stars */}
      <div
        className="flex items-center justify-center gap-1.5 mb-6"
        aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5"
            style={{
              fill:
                i < testimonial.rating ? LOGO.amber : "rgba(255,255,255,0.2)",
              color:
                i < testimonial.rating ? LOGO.amber : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
        &ldquo;{expanded ? testimonial.testimonial : short}
        {isTruncated && !expanded && <span className="text-white/30">…</span>}
        &rdquo;
      </blockquote>

      {/* Read more toggle */}
      {isTruncated && (
        <button
          onClick={toggle}
          className="mt-3 text-sm font-semibold transition-opacity hover:opacity-70 focus:outline-none"
          style={{ color: LOGO.amber }}>
          {expanded ? "Read less" : "Read more"}
        </button>
      )}

      {/* Divider */}
      <div
        className="w-12 h-px my-6"
        style={{ background: "rgba(255,255,255,0.2)" }}
        aria-hidden="true"
      />

      {/* Author */}
      <div className="font-bold text-white text-lg md:text-xl leading-tight">
        {testimonial.name}
      </div>
      <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
        {testimonial.role}
      </div>
    </div>
  );
}

const TestimonialsSlider: React.FC<{ testimonials?: Testimonials[] }> = ({
  testimonials = [],
}) => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<number | string>(COLLAPSED_HEIGHT);
  const testimonialItems: TestimonialItem[] = testimonials.flatMap(
    (t) => t.testimonialsSections || [],
  );

  if (!testimonialItems.length) return null;

  // Smooth height transition
  React.useEffect(() => {
    const el = document.querySelector(
      ".testimonials-section .slick-slider",
    ) as HTMLElement | null;
    if (el) {
      el.style.transition = "height 0.4s cubic-bezier(0.4,0,0.2,1)";
    }
  }, [isExpanded, height]);

  const settings = {
    dots: false,
    infinite: testimonialItems.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    adaptiveHeight: isExpanded,
    beforeChange: (_: number, next: number) => {
      setCurrentSlide(next);
      setIsExpanded(false);
      setHeight(COLLAPSED_HEIGHT);
    },
  };

  // Callback for TestimonialSlide to update height and expanded state
  const handleHeightChange = (expanded: boolean) => {
    setIsExpanded(expanded);
    setHeight(expanded ? "auto" : COLLAPSED_HEIGHT);
  };

  return (
    <section
      className="w-full flex flex-col items-center testimonials-section"
      aria-label="testimonials-section">
      <style>{`
        .testimonials-section .slick-slider,
        .testimonials-section .slick-list,
        .testimonials-section .slick-track {
          width: 100%;
          height: ${typeof height === "string" ? height : `${height}px`} !important;
          transition: height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .testimonials-section .slick-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          height: ${typeof height === "string" ? height : `${height}px`} !important;
          transition: height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .testimonials-section .slick-slide > div {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .testimonials-section .slick-slide > div > div {
          width: 100%;
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          {testimonials[0]?.title || "What Our Parents Say"}
        </h2>
        <div
          className="mt-4 h-1 w-12 rounded-full"
          style={{ background: LOGO.blueDark }}
          aria-hidden="true"
        />
      </div>

      {/* Slider row */}
      <div className="w-full flex items-center justify-center gap-4 md:gap-8">
        {/* Left arrow */}
        {testimonialItems.length > 1 && (
          <button
            onClick={() => {
              setIsExpanded(false);
              setHeight(COLLAPSED_HEIGHT);
              sliderRef.current?.slickPrev();
            }}
            className="hidden md:flex shrink-0 p-4 rounded-full cursor-pointer transition-opacity hover:opacity-80 focus:outline-none"
            style={{ background: LOGO.green }}
            aria-label="Previous testimonial">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Card */}
        <div
          className="flex-1 max-w-3xl rounded-3xl overflow-hidden transition-all duration-400"
          style={{ background: LOGO.blue }}>
          <Slider ref={sliderRef} {...settings}>
            {testimonialItems.map((testimonial) => (
              <div key={testimonial._key}>
                <TestimonialSlide
                  testimonial={testimonial}
                  onHeightChange={handleHeightChange}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right arrow */}
        {testimonialItems.length > 1 && (
          <button
            onClick={() => {
              setIsExpanded(false);
              setHeight(COLLAPSED_HEIGHT);
              sliderRef.current?.slickNext();
            }}
            className="hidden md:flex shrink-0 p-4 rounded-full cursor-pointer transition-opacity hover:opacity-80 focus:outline-none"
            style={{ background: LOGO.green }}
            aria-label="Next testimonial">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Mobile arrows */}
      {testimonialItems.length > 1 && (
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={() => {
              setIsExpanded(false);
              setHeight(COLLAPSED_HEIGHT);
              sliderRef.current?.slickPrev();
            }}
            className="p-3 rounded-full hover:opacity-80 transition-opacity focus:outline-none"
            style={{ background: LOGO.green }}
            aria-label="Previous testimonial">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => {
              setIsExpanded(false);
              setHeight(COLLAPSED_HEIGHT);
              sliderRef.current?.slickNext();
            }}
            className="p-3 rounded-full hover:opacity-80 transition-opacity focus:outline-none"
            style={{ background: LOGO.green }}
            aria-label="Next testimonial">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSlider;

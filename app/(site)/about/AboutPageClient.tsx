"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";
import { About } from "@/app/lib/interface";
import { PortableText } from "next-sanity";

interface AboutPageClientProps {
  data: About;
}

export default function AboutPageClient({ data }: AboutPageClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [ownerImageLoaded, setOwnerImageLoaded] = useState(false);
  const [staffImagesLoaded, setStaffImagesLoaded] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStaffImageLoad = (memberId: string) => {
    setStaffImagesLoaded((prev) => ({ ...prev, [memberId]: true }));
  };

  const scatteredStyles = [
    "rotate-1 -translate-y-2",
    "-rotate-2 translate-y-4",
    "rotate-3 -translate-y-3",
    "-rotate-1 translate-y-2",
    "rotate-2 -translate-y-1",
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Hero Section - Full Width with Overlay */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {!heroImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-[#81AA8E] rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-[#FAB391] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}></div>
                <div
                  className="w-3 h-3 bg-[#80739C] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          )}

          {data?.heroSections?.[0]?.backgroundImage?.asset?._ref ? (
            (() => {
              const heroSrc = urlFor(data.heroSections[0].backgroundImage)
                .width(2000)
                .quality(85)
                .url();
              const blurSrc = urlFor(data.heroSections[0].backgroundImage)
                .width(24)
                .quality(20)
                .url();
              return (
                <Image
                  src={heroSrc}
                  alt="Love & Learning Child Care Center"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={blurSrc}
                  onLoad={() => setHeroImageLoaded(true)}
                  className={`object-cover transition-all duration-700 ease-out ${
                    heroImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="100vw"
                />
              );
            })()
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Text Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {data?.heroSections?.[0]?.headline || "About Us"}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed font-light">
                {data?.heroSections?.[0]?.subtitle || ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owners Section - Split Screen */}
      <section className="relative min-h-screen flex items-center mt-16 md:m-24">
        <div className="w-full grid md:grid-cols-2">
          {/* Owner Image Side */}
          <div className="relative h-[50vh] md:h-screen">
            {!ownerImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#81AA8E] rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-[#FAB391] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}></div>
                  <div
                    className="w-3 h-3 bg-[#80739C] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            )}

            {data?.owners?.[0]?.image?.asset?._ref ? (
              (() => {
                const ownerSrc = urlFor(data.owners[0].image)
                  .width(1200)
                  .quality(85)
                  .url();
                const ownerBlur = urlFor(data.owners[0].image)
                  .width(24)
                  .quality(20)
                  .url();
                return (
                  <Image
                    src={ownerSrc}
                    alt={data.owners[0].name}
                    fill
                    placeholder="blur"
                    blurDataURL={ownerBlur}
                    onLoad={() => setOwnerImageLoaded(true)}
                    className={`object-cover transition-all duration-700 ease-out rounded-md ${
                      ownerImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="50vw"
                  />
                );
              })()
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#81AA8E]/20 to-[#FAB391]/20 flex items-center justify-center">
                <span className="text-gray-400 text-xl">Owner Image</span>
              </div>
            )}
          </div>

          {/* Owner Bio Side */}
          <div className=" flex items-center py-16 md:py-24">
            <div className="px-6 md:px-12 lg:px-16 max-w-2xl">
              <div className="space-y-8">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">
                    Meet the Owners
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                    {data?.owners?.[0]?.name}
                  </h2>
                  <p className="text-xl text-gray-600 font-medium">
                    {data?.owners?.[0]?.role}
                  </p>
                </div>

                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none">
                  {data?.owners?.[0]?.bio ? (
                    <PortableText value={data.owners[0].bio} />
                  ) : (
                    <p>
                      Owner biography is currently being updated. Please check
                      back soon!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-[#ffd48b7e] py-20 md:py-28 lg:py-32 px-6 mt-12 md:mt-16 lg:mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">
              Meet Our Team
            </h2>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
          </div>

          {data?.staffSections && data.staffSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start justify-center">
              {data.staffSections.map((member, index) => (
                <div
                  key={member._key}
                  className={`text-center group transition-all duration-300 ease-out ${scatteredStyles[index % scatteredStyles.length]}`}
                  style={{ willChange: "transform" }}>
                  <div className="relative overflow-hidden mb-8 transition-transform duration-300 ease-out group-hover:scale-105">
                    {!staffImagesLoaded[member._key] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full h-[30rem]">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-[#81AA8E] rounded-full animate-bounce"></div>
                          <div
                            className="w-3 h-3 bg-[#FAB391] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}></div>
                          <div
                            className="w-3 h-3 bg-[#80739C] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    )}

                    {member.image?.asset?._ref ? (
                      (() => {
                        const staffSrc = urlFor(member.image)
                          .width(800)
                          .quality(80)
                          .url();
                        const staffBlur = urlFor(member.image)
                          .width(24)
                          .quality(20)
                          .url();
                        return (
                          <Image
                            src={staffSrc}
                            alt={member.name}
                            width={800}
                            height={800}
                            placeholder="blur"
                            blurDataURL={staffBlur}
                            onLoad={() => handleStaffImageLoad(member._key)}
                            className={`w-full h-[30rem] object-contain transition-all duration-500 group-hover:opacity-90 ${
                              staffImagesLoaded[member._key]
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading="lazy"
                          />
                        );
                      })()
                    ) : (
                      <div className="w-full h-[30rem] bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">
                          {member.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-gray-700 font-medium text-lg">
                      {member.role}
                    </p>

                    {member.bio &&
                      (expanded === member._key ? (
                        <>
                          <p className="text-gray-800 leading-relaxed text-base max-w-sm mx-auto">
                            {member.bio}
                          </p>
                          <button
                            onClick={() => setExpanded(null)}
                            className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 underline decoration-2 underline-offset-4">
                            Show less
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setExpanded(member._key)}
                          className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 underline decoration-2 underline-offset-4">
                          Read more
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Staff information is currently being updated. Please check back
                soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

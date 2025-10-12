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
                  className={`object-cover transition-all duration-700 ease-out object-top ${
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {data?.heroSections?.[0]?.headline || "About Us"}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed font-light">
                {data?.heroSections?.[0]?.subtitle || ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owners Section - Split Screen */}
      <section className="relative w-full py-20 lg:py-32 bg-white">
        <div className="px-6 sm:px-8 lg:px-16 max-w-[1600px] mx-auto">
          <div className="w-full flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
            {/* Owner Image Side - Left on desktop, below on mobile */}
            <div className="relative w-full lg:w-[45%] h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[70vh] min-h-[500px] max-h-[700px] order-2 lg:order-1 rounded-sm overflow-hidden shadow-sm">
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
                <Image
                  src={urlFor(data.owners[0].image).url()}
                  alt={data.owners[0].name}
                  fill
                  placeholder="blur"
                  blurDataURL={urlFor(data.owners[0].image)
                    .width(24)
                    .height(24)
                    .quality(20)
                    .url()}
                  onLoad={() => setOwnerImageLoaded(true)}
                  className={`object-cover transition-all duration-700 ease-out ${
                    ownerImageLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#81AA8E]/20 to-[#FAB391]/20 flex items-center justify-center">
                  <span className="text-gray-400 text-lg md:text-xl">
                    Owner Image
                  </span>
                </div>
              )}
            </div>

            {/* Owner Bio Side - Right on desktop, above on mobile */}
            <div className="flex items-center order-1 lg:order-2 lg:w-[55%]">
              <div className="w-full max-w-2xl mx-auto lg:mx-0">
                <div className="space-y-10 lg:space-y-12">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-light">
                      Meet the Owner
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-5 tracking-tight">
                      {data?.owners?.[0]?.name}
                    </h2>
                    <p className="text-xl sm:text-2xl text-gray-500 font-light">
                      {data?.owners?.[0]?.role}
                    </p>
                  </div>

                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-headings:text-gray-900 prose-headings:font-light">
                    {data?.owners?.[0]?.bio ? (
                      <PortableText value={data.owners[0].bio} />
                    ) : (
                      <p className="text-gray-400">
                        Biography is currently being updated. Please check back
                        soon!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-[#ffd48b7e] py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8" id="staff">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              Meet Our Team
            </h2>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
          </div>

          {data?.staffSections && data.staffSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-start justify-center">
              {data.staffSections.map((member, index) => (
                <div
                  key={member._key}
                  className={`text-center group transition-all duration-300 ease-out ${scatteredStyles[index % scatteredStyles.length]}`}
                  style={{ willChange: "transform" }}>
                  <div className="relative overflow-hidden mb-6 md:mb-8 transition-transform duration-300 ease-out group-hover:scale-105">
                    {!staffImagesLoaded[member._key] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full h-[25rem] sm:h-[28rem] md:h-[30rem]">
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
                      <div className="relative w-full h-[25rem] sm:h-[28rem] md:h-[30rem]">
                        <Image
                          src={urlFor(member.image).url()}
                          alt={member.name}
                          fill
                          placeholder="blur"
                          blurDataURL={urlFor(member.image)
                            .width(24)
                            .height(24)
                            .quality(20)
                            .url()}
                          onLoad={() => handleStaffImageLoad(member._key)}
                          className={`object-contain transition-all duration-500 group-hover:opacity-90 ${
                            staffImagesLoaded[member._key]
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-[25rem] sm:h-[28rem] md:h-[30rem] bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">
                          {member.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 md:space-y-4 px-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-gray-700 font-medium text-base sm:text-lg md:text-xl">
                      {member.role}
                    </p>

                    {member.bio &&
                      (expanded === member._key ? (
                        <>
                          <p className="text-gray-800 leading-relaxed text-sm sm:text-base max-w-sm mx-auto">
                            {member.bio}
                          </p>
                          <button
                            onClick={() => setExpanded(null)}
                            className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 underline decoration-2 underline-offset-4 text-sm sm:text-base">
                            Show less
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setExpanded(member._key)}
                          className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 underline decoration-2 underline-offset-4 text-sm sm:text-base">
                          Read more
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg sm:texts-xl">
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

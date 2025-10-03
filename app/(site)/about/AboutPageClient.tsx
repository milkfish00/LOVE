"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";
import { About } from "@/app/lib/interface";

interface AboutPageClientProps {
  data: About;
}

export default function AboutPageClient({ data }: AboutPageClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [staffImagesLoaded, setStaffImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStaffImageLoad = (memberId: string) => {
    setStaffImagesLoaded((prev) => ({ ...prev, [memberId]: true }));
  };

  const convertRichTextToString = (richText: any[]): string => {
    if (!richText || !Array.isArray(richText)) return "";
    return richText
      .map((block) => {
        if (block._type === "block" && block.children) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .join(" ");
  };

  const scatteredStyles = [
    "rotate-1 -translate-y-2",
    "-rotate-2 translate-y-4",
    "rotate-3 -translate-y-3",
    "-rotate-1 translate-y-2",
    "rotate-2 -translate-y-1",
  ];
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {data?.heroSections?.[0]?.headline || "About Us"}
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
              {data?.heroSections?.[0]?.subtitle || ""}
            </p>
          </div>

          <div className="mb-16 flex justify-center relative px-4">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#81AA8E] rounded-tl-2xl opacity-60 z-10"></div>
              <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-[#FAB391] rounded-tr-2xl opacity-60 z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-[#80739C] rounded-bl-2xl opacity-60 z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#81AA8E] rounded-br-2xl opacity-60 z-10"></div>

              <div className="relative max-w-5xl w-full">
                {!heroImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl min-h-[400px]">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-[#81AA8E] rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-[#FAB391] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-3 h-3 bg-[#80739C] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {data?.heroSections?.[0]?.backgroundImage?.asset?._ref ? (
                  (() => {
                    const heroSrc = urlFor(data.heroSections[0].backgroundImage)
                      .width(1600)
                      .quality(80)
                      .url();
                    const blurSrc = urlFor(data.heroSections[0].backgroundImage)
                      .width(24)
                      .quality(20)
                      .url();
                    return (
                      <Image
                        src={heroSrc}
                        alt="Love & Learning Child Care Center team and facility"
                        width={1600}
                        height={900}
                        priority
                        placeholder="blur"
                        blurDataURL={blurSrc}
                        onLoad={() => setHeroImageLoaded(true)}
                        className={`w-full rounded-2xl transition-all duration-700 ease-out ${
                          heroImageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                    );
                  })()
                ) : (
                  <div className="w-full h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}

                <div className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <div className="text-lg md:text-xl leading-relaxed text-gray-700 space-y-6">
                {data?.heroSections?.[0]?.description && (
                  <div>
                    {convertRichTextToString(data.heroSections[0].description)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ffd48b7e] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
          </div>

          {data?.staffSections && data.staffSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start justify-center">
              {data.staffSections.map((member) => (
                <div
                  key={member._key}
                  className={`text-center group md:hover:rotate-0 md:hover:translate-y-0 ${scatteredStyles[Math.floor(
                    Math.random() * scatteredStyles.length
                  )]}`}
                >
                  <div className="relative overflow-hidden mb-8">
                    {!staffImagesLoaded[member._key] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full h-[30rem]">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-[#81AA8E] rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-[#FAB391] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-3 h-3 bg-[#80739C] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    )}

                    {member.image?.asset?._ref ? (
                      (() => {
                        const staffSrc = urlFor(member.image).width(800).quality(80).url();
                        const staffBlur = urlFor(member.image).width(24).quality(20).url();
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
                              staffImagesLoaded[member._key] ? "opacity-100" : "opacity-0"
                            }`}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                          />
                        );
                      })()
                    ) : (
                      <div className="w-full h-[30rem] bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">{member.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-700 font-medium text-lg">{member.role}</p>

                    {expanded === member._key ? (
                      <>
                        <p className="text-gray-800 leading-relaxed text-base max-w-sm mx-auto">{member.bio}</p>
                        <button onClick={() => setExpanded(null)} className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 underline decoration-2 underline-offset-4">
                          Show less
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setExpanded(member._key)} className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 underline decoration-2 underline-offset-4">
                        Read more
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Staff information is currently being updated. Please check back soon!
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}



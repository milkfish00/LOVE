"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";
import { About } from "@/app/lib/interface";

type StaffMember = About["staffSections"][number];

interface StaffListProps {
  members: StaffMember[];
}

export default function StaffList({ members }: StaffListProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [staffImagesLoaded, setStaffImagesLoaded] = useState<Record<string, boolean>>({});

  const handleStaffImageLoad = (memberId: string) => {
    setStaffImagesLoaded((prev) => ({ ...prev, [memberId]: true }));
  };

  if (!members || members.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-600 text-lg">
          Staff information is currently being updated. Please check back soon!
        </p>
      </div>
    );
  }

  const scatteredStyles = [
    "rotate-1 -translate-y-2",
    "-rotate-2 translate-y-4",
    "rotate-3 -translate-y-3",
    "-rotate-1 translate-y-2",
    "rotate-2 -translate-y-1",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start justify-center">
      {members.map((member) => (
        <div
          key={member._key}
          className={`text-center group hover:rotate-0 hover:translate-y-0 ${scatteredStyles[Math.floor(
            Math.random() * scatteredStyles.length
          )]}`}
        >
          <div className="relative overflow-hidden mb-8">
            {!staffImagesLoaded[member._key] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full h-96">
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
                    className={`w-full h-96 object-contain transition-all duration-500 group-hover:opacity-90 ${
                      staffImagesLoaded[member._key] ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                );
              })()
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
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
            )}
          </div>
        </div>
      ))}
    </div>
  );
}



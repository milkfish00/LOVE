import React from "react";
import { sanityClient } from "@/app/lib/sanity";
import { aboutQuery } from "@/app/lib/queries";
import { About } from "@/app/lib/interface";
import StaffList from "./StaffList";



export default async function StaffSection() {
  const data: About = await sanityClient.fetch(aboutQuery);

  
  return (
    <section className="bg-[#ffd48b7e] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
        </div>
        <StaffList members={data?.staffSections || []} />
      </div>
    </section>
  );
}

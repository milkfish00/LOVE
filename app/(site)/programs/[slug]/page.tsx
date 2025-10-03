import React from "react";
import { ArrowLeft } from "lucide-react";
import { programBySlugQuery, allProgramSlugsQuery } from "@/app/lib/queries";
import { Programs } from "@/app/lib/interface";
import { sanityClient, urlFor } from "@/app/lib/sanity";
import { getProgramColors, extractTextFromRichText } from "@/app/lib/program-utils";


// Generate static paths for all programs
export async function generateStaticParams() {
  try {
    const data: Programs = await sanityClient.fetch(allProgramSlugsQuery);
    console.log('generateStaticParams data:', data);
    
    const params = data.programSections?.map((program) => ({
      slug: program.slug.current,
    })) || [];
    
    console.log('generateStaticParams returning:', params);
    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

const IndividualProgramPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  
  // Fetch program data by slug
  const data = await sanityClient.fetch(programBySlugQuery, { slug });
  console.log('IndividualProgramPage data:', data);

  // Support both shapes: object (from slug query) or array (from full doc)
  const rawProgramSections = data?.programSections;
  const currentProgram = Array.isArray(rawProgramSections)
    ? rawProgramSections.find((p: any) => p?.slug?.current === slug)
    : rawProgramSections;
  console.log('IndividualProgramPage currentProgram:', currentProgram);

  

  // Handle case where program is not found
  if (!currentProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Program Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The program you're looking for doesn't exist.
          </p>
          <a
            href="/programs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Programs
          </a>
        </div>
      </div>
    );
  }

  const colors = getProgramColors(currentProgram.slug.current);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className={`${colors.color} ${colors.textColor} py-10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <a
            href="/programs"
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to All Programs
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-center lg:text-left">
                {currentProgram.programTitle}
              </h1>
              <p className="text-white/90 mb-4 sm:mb-5 text-center lg:text-left text-lg sm:text-xl">
                Ages: {currentProgram.ageRange}
              </p>
              <div className="text-white/80 leading-relaxed text-center lg:text-left text-base sm:text-lg">
                {extractTextFromRichText(currentProgram.description) ||
                  `Our comprehensive program designed specifically for children ages ${currentProgram.ageRange}. 
            We provide a nurturing environment that promotes growth, learning, and development.`}
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
                {currentProgram.image?.asset?._ref ? (
                  <img
                    src={urlFor(currentProgram.image).url()}
                    alt={currentProgram.programTitle}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center text-white text-lg sm:text-xl font-semibold text-center">
                    {currentProgram.programTitle}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Details */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-500">Staff-Child Ratio</div>
                <div className="text-xl font-semibold text-gray-800 mt-1">
                  {currentProgram.classSize}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Schedule</div>
                <div className="text-xl font-semibold text-gray-800 mt-1">
                  {currentProgram.schedule}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Age Range</div>
                <div className="text-xl font-semibold text-gray-800 mt-1">
                  {currentProgram.ageRange}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-14 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Daily Schedule
          </h2>
          {Array.isArray(currentProgram?.dailyActivities) &&
          currentProgram.dailyActivities.length > 0 ? (
            <div className="divide-y divide-gray-200 rounded-xl bg-white shadow-sm border border-gray-100">
              {currentProgram.dailyActivities.map((activity: any) => (
                <div
                  key={
                    activity?._key ?? `${activity?.time}-${activity?.activity}`
                  }
                  className="p-5">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {activity?.activity || "Activity"}
                      </div>
                      {activity?.description ? (
                        <div className="text-sm text-gray-600 mt-1">
                          {activity?.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {activity?.time || "Time TBD"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Daily schedule coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-16 ${colors.color} ${colors.textColor}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enroll in Our {currentProgram.programTitle} Program?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a tour or reach out for enrollment details. We’re here to
            help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
            </a>
            <a
              href="/tuition"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              View Tuition & Enrollment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualProgramPage;

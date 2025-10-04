// /app/components/ProgramsSectionWrapper.tsx
import { programsQuery } from "@/app/lib/queries";
import ProgramsSection from "@/app/components/Home/Tabs";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 60;

interface ProgramsSectionWrapperProps {
  fallbackTitle?: string;
  className?: string;
}

export default async function ProgramsSectionWrapper({ 
  fallbackTitle = "Our Programs",
  className = "" 
}: ProgramsSectionWrapperProps) {
  try {
    const { data } = await sanityFetch({
      query: programsQuery,
    });

    return <ProgramsSection data={data} />;
  } catch (error) {
    console.error('Error fetching programs data:', error);
    
    return (
      <section className={`py-16 px-6 ${className}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {fallbackTitle}
          </h2>
          <p className="text-gray-600">
            We're having trouble loading our programs. Please try again later.
          </p>
        </div>
      </section>
    );
  }
}
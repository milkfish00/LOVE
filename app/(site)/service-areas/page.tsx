import type { Metadata } from "next";

export const revalidate = 60;

const baseUrl = "https://www.loveandlearning.net";

const serviceAreas = [
  {
    county: "Henderson County, NC",
    color: "#B1D1B8",
    locations: [
      { name: "Hendersonville", type: "City", population: 15879 },
      { name: "Fletcher", type: "Town", population: 8320 },
      { name: "Mills River", type: "Town", population: 7495 },
      { name: "Flat Rock", type: "Village", population: 3631 },
      { name: "Laurel Park", type: "Town", population: 2337 },
    ],
  },
  {
    county: "Buncombe County, NC",
    color: "#D4B8D1",
    locations: [
      { name: "Asheville", type: "City", population: 95311 },
      { name: "Black Mountain", type: "Town", population: 8604 },
      { name: "Woodfin", type: "Town", population: 8203 },
      { name: "Weaverville", type: "Town", population: 4852 },
      { name: "Fairview", type: "Town", population: 3850 },
      { name: "Biltmore Forest", type: "Town", population: 1477 },
      { name: "Montreat", type: "Town", population: 1047 },
      { name: "Chimney Rock Village", type: "Village", population: 138 },
    ],
  },
  {
    county: "Transylvania County, NC",
    color: "#B8C8D1",
    locations: [
      { name: "Brevard", type: "City", population: 8050 },
      { name: "Rosman", type: "Town", population: 761 },
    ],
  },
  {
    county: "Polk County, NC",
    color: "#D1C4B8",
    locations: [
      { name: "Tryon", type: "Town", population: 1640 },
      { name: "Columbus", type: "Town", population: 1064 },
      { name: "Saluda", type: "City", population: 664 },
      { name: "Ruth", type: "Town", population: 364 },
    ],
  },
  {
    county: "Rutherford County, NC",
    color: "#D1B8B8",
    locations: [
      { name: "Forest City", type: "Town", population: 7412 },
      { name: "Spindale", type: "Town", population: 4207 },
      { name: "Rutherfordton", type: "Town", population: 3746 },
      { name: "Lake Lure", type: "Town", population: 1401 },
      { name: "Ellenboro", type: "Town", population: 744 },
      { name: "Bostic", type: "Town", population: 363 },
    ],
  },
  {
    county: "Haywood County, NC",
    color: "#C8D1B8",
    locations: [
      { name: "Waynesville", type: "Town", population: 10941 },
      { name: "Canton", type: "Town", population: 4421 },
      { name: "Maggie Valley", type: "Town", population: 1753 },
      { name: "Clyde", type: "Town", population: 1382 },
    ],
  },
] as const;

const allLocationNames = serviceAreas.flatMap((county) =>
  county.locations.map((location) => location.name),
);

export const metadata: Metadata = {
  title:
    "Service Areas | Child Care Near Henderson, Buncombe, Transylvania, Polk, Rutherford, and Haywood Counties",
  description:
    "Love & Learning Child Care Center serves families in Fletcher, Hendersonville, Asheville, Brevard, Tryon, Forest City, Waynesville, and nearby communities across Western North Carolina.",
  alternates: {
    canonical: `${baseUrl}/service-areas`,
  },
  openGraph: {
    title:
      "Service Areas | Child Care Near Henderson, Buncombe, Transylvania, Polk, Rutherford, and Haywood Counties",
    description:
      "See all Western North Carolina communities served by Love & Learning Child Care Center.",
    url: `${baseUrl}/service-areas`,
    type: "website",
  },
};

function FlowerIcon({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="26"
      viewBox="0 0 1047 945"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M726.401 585.71C894.344 723.611 823.391 941.561 671.888 928.447C520.386 915.33 484.733 745.65 484.733 745.65C484.733 745.65 460.649 950.143 289.06 944.487C117.471 938.834 37.4202 732.016 237.066 567.184C237.066 567.184 -20.4934 591.094 1.31014 390.012C15.8838 255.61 216.676 177.355 373.926 303.454C373.926 303.454 309.715 60.7911 505.391 7.00723C692.094 -44.3102 767.847 198.933 660.341 323.232C660.341 323.232 825.233 120.057 976.593 251.503C1102.85 361.164 1035.89 479.285 942.65 542.303C849.413 605.321 726.401 585.71 726.401 585.71Z"
        fill={color}
      />
    </svg>
  );
}

export default function ServiceAreasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: "Love & Learning Child Care Center",
    url: baseUrl,
    areaServed: serviceAreas.flatMap((county) =>
      county.locations.map((location) => ({
        "@type": "City",
        name: `${location.name}, North Carolina`,
      })),
    ),
  };

  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto max-w-3xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-12 text-center">
            Service Areas
          </h1>

          <p className="mb-4 text-gray-700">
            Love & Learning Child Care Center in Fletcher, NC serves families
            across Western North Carolina. Many families commute from nearby
            cities and towns for trusted child care, preschool readiness, and
            early learning support.
          </p>

          <p className="mb-4 text-gray-700">
            We welcome families from {allLocationNames.join(", ")}, and
            surrounding communities.
          </p>

          <section
            className="mt-12 divide-y divide-gray-100"
            aria-label="Service area list">
            {serviceAreas.map((county) => (
              <article
                key={county.county}
                className="py-8 first:pt-0 last:pb-0">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                  <FlowerIcon color={county.color} />
                  {county.county}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                  {county.locations.map((location) => (
                    <li
                      key={`${county.county}-${location.name}`}
                      className="text-gray-700">
                      {location.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

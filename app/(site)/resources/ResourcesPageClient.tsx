"use client";
import React, { useMemo, useState } from "react";
import {
  Download,
  FileText,
  Shield,
  DollarSign,
  CheckSquare,
  Heart,
  Users,
  BookOpen,
  Palette,
  Star,
  Baby,
} from "lucide-react";

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  type?: string;
  iconName?: string;
  color: string;
  bgColor: string;
  detailHref?: string;
  downloadHref?: string;
};

type Hero = {
  title?: string;
  description?: string;
  backgroundImageUrl?: string;
};

type Props = {
  hero?: Hero;
  resources: ResourceItem[];
  tabs: string[];
};

const iconComponentMap: Record<
  string,
  React.ComponentType<{ size?: number }>
> = {
  FileText,
  Shield,
  DollarSign,
  CheckSquare,
  Heart,
  Users,
  BookOpen,
  Palette,
  Star,
  Baby,
};

const ResourcesPageClient: React.FC<Props> = ({ hero, resources, tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || "Parents");
  const [searchQuery, setSearchQuery] = useState<string>("");

const filteredResources = useMemo(() => {
  if (!resources || resources.length === 0) return [];

  const clean = (str: string) =>
    str
      ?.toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E\u2060-\u206F\u00A0]/g, "") // strip invisible Unicode
      .trim();

  const normalized = clean(activeTab);

  const byTab =
    activeTab === "All"
      ? resources
      : resources.filter((r) =>
          (r.tags || []).some((t) => clean(t) === normalized)
        );

  const query = clean(searchQuery);
  const byQuery = !query
    ? byTab
    : byTab.filter((r) => {
        const title = clean(r.title || "");
        const description = clean(r.description || "");
        return title.includes(query) || description.includes(query);
      });

  const order: Record<string, number> = { checklist: 0, guide: 1, file: 2 };
  return [...byQuery].sort(
    (a, b) => (order[a.type || ""] ?? 1) - (order[b.type || ""] ?? 1)
  );
}, [resources, activeTab, searchQuery]);


  const checklists = useMemo(
    () => filteredResources.filter((r) => r.type === "checklist"),
    [filteredResources]
  );
  const guides = useMemo(
    () => filteredResources.filter((r) => r.type === "guide"),
    [filteredResources]
  );
  const forms = useMemo(
    () => filteredResources.filter((r) => r.type === "file"),
    [filteredResources]
  );

  const prettyLabel = (value: string) => {
    if (value === "All") return "All";
    if (value.toLowerCase() === "health-safety") return "Health & Safety";
    return value
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {hero?.title || (
                  <>
                    Love & Learning <span className="">Resources</span>
                  </>
                )}
              </h1>
              {(hero?.description || !hero) && (
                <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed ">
                  {hero?.description ||
                    "Explore helpful guides, forms, and checklists for families and staff"}
                </p>
              )}
            </div>
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {hero?.backgroundImageUrl ? (
                  <img
                    src={hero.backgroundImageUrl}
                    alt="Resources hero"
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <img
                    src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
                    alt="Happy children learning and playing"
                    className="w-full h-80 object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center     animate-bounce">
                <img src="/svg/flower1.svg" alt="" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12  rounded-full flex items-center justify-center     animate-pulse">
                <img src="/svg/flower4.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs + Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tabs && tabs.length > 0 && (
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform  ${
                    activeTab === tab
                      ? "bg-[#FFD58B] text-black border-[#FFD58B] border"
                      : "border-[#FFD58B] border  text-gray-700 "
                  }`}>
                  {prettyLabel(tab)}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()} resources...`}
                className="w-full max-w-xl px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFD58B] focus:border-[#FFD58B] text-sm"
              />
            </div>
          </div>
        )}

        {/* Resources Sections */}
        {/* Checklists */}
        {checklists.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Checklists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {checklists.map((resource, index) => {
                const Icon =
                  resource.iconName && iconComponentMap[resource.iconName]
                    ? iconComponentMap[resource.iconName]
                    : FileText;
                const isFile = resource.type === "file";
                return (
                  <div
                    key={resource.id}
                    className={`${isFile ? "bg-[#6A9478]/10" : resource.bgColor} rounded-3xl ${isFile ? "p-5" : "p-8"} transition-all duration-500 transform   cursor-pointer ${isFile ? "border border-[#6A9478]/20" : "border border-white/50 backdrop-blur-sm"} group`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`${isFile ? "bg-[#6A9478]" : resource.color} ${isFile ? "p-2.5" : "p-4"} rounded-2xl text-white      transition-transform duration-300`}>
                        <Icon size={isFile ? 22 : 28} />
                      </div>
                      {resource.downloadHref && (
                        <a
                          href={resource.downloadHref}
                          className="bg-white/80 p-2 rounded-full   duration-300"
                          target="_blank"
                          rel="noreferrer"
                          download>
                          <Download
                            size={20}
                            className="text-gray-600 hover:text-gray-800"
                          />
                        </a>
                      )}
                    </div>
                    <h3
                      className={`${isFile ? "text-lg" : "text-xl"} font-bold text-gray-800 mb-2 group-hover:text-gray-900`}>
                      {resource.title}
                    </h3>
                    {!isFile && resource.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {resource.description}
                      </p>
                    )}
                    {resource.detailHref && (
                      <div className="flex items-center gap-4">
                        <a
                          href={resource.detailHref}
                          className="text-gray-700 text-sm underline underline-offset-4">
                          Learn More
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Guides */}
        {guides.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {guides.map((resource, index) => {
                const Icon =
                  resource.iconName && iconComponentMap[resource.iconName]
                    ? iconComponentMap[resource.iconName]
                    : FileText;
                const isFile = resource.type === "file";
                return (
                  <div
                    key={resource.id}
                    className={`${isFile ? "bg-[#6A9478]/10" : resource.bgColor} rounded-3xl ${isFile ? "p-5" : "p-8"} transition-all duration-500 transform   cursor-pointer ${isFile ? "border border-[#6A9478]/20" : "border border-white/50 backdrop-blur-sm"} group`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`${isFile ? "bg-[#6A9478]" : resource.color} ${isFile ? "p-2.5" : "p-4"} rounded-2xl text-white      transition-transform duration-300`}>
                        <Icon size={isFile ? 22 : 28} />
                      </div>
                      {resource.downloadHref && (
                        <a
                          href={resource.downloadHref}
                          className="bg-white/80 p-2 rounded-full   duration-300"
                          target="_blank"
                          rel="noreferrer"
                          download>
                          <Download
                            size={20}
                            className="text-gray-600 hover:text-gray-800"
                          />
                        </a>
                      )}
                    </div>
                    <h3
                      className={`${isFile ? "text-lg" : "text-xl"} font-bold text-gray-800 mb-2 group-hover:text-gray-900`}>
                      {resource.title}
                    </h3>
                    {!isFile && resource.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {resource.description}
                      </p>
                    )}
                    {resource.detailHref && (
                      <div className="flex items-center gap-4">
                        <a
                          href={resource.detailHref}
                          className="text-gray-700 text-sm underline underline-offset-4">
                          Learn More
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Forms */}
        {forms.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Forms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {forms.map((resource, index) => {
                const Icon =
                  resource.iconName && iconComponentMap[resource.iconName]
                    ? iconComponentMap[resource.iconName]
                    : FileText;
                const isFile = resource.type === "file";
                return (
                  <div
                    key={resource.id}
                    className={`${isFile ? "bg-[#6A9478]/10" : resource.bgColor} rounded-3xl ${isFile ? "p-5" : "p-8"} transition-all duration-500 transform   cursor-pointer ${isFile ? "border border-[#6A9478]/20" : "border border-white/50 backdrop-blur-sm"} group`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`${isFile ? "bg-[#6A9478]" : resource.color} ${isFile ? "p-2.5" : "p-4"} rounded-2xl text-white      transition-transform duration-300`}>
                        <Icon size={isFile ? 22 : 28} />
                      </div>
                      {resource.downloadHref && (
                        <a
                          href={resource.downloadHref}
                          className="bg-white/80 p-2 rounded-full   duration-300"
                          target="_blank"
                          rel="noreferrer"
                          download>
                          <Download
                            size={20}
                            className="text-gray-600 hover:text-gray-800"
                          />
                        </a>
                      )}
                    </div>
                    <h3
                      className={`${isFile ? "text-lg" : "text-xl"} font-bold text-gray-800 mb-2 group-hover:text-gray-900`}>
                      {resource.title}
                    </h3>
                    {!isFile && resource.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {resource.description}
                      </p>
                    )}
                    {resource.detailHref && (
                      <div className="flex items-center gap-4">
                        <a
                          href={resource.detailHref}
                          className="text-gray-700 text-sm underline underline-offset-4">
                          Learn More
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {filteredResources.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No resources found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPageClient;

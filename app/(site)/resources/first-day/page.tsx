import React from "react";
import {
  CheckSquare,
  FileText,
  Download,
  DollarSign,
  Clock,
  HelpCircle,
  Mail,
  Users,
} from "lucide-react";

const FinancialAssistancePage = () => {
  const relatedResources = [
    {
      id: 1,
      title: "Financial Assistance Guide",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.",
      category: "Enrollment",
      icon: DollarSign,
      color: "bg-[#86AF61]",
      link: "/resources/financial",
      bgColor: "bg-[#86AF61]/10",
    },
    {
      id: 2,
      title: "First Day Checklist",
      description:
        "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula.",
      category: "Enrollment",
      icon: CheckSquare,
      color: "bg-[#E3AC4A]",
      link: "/resources/first-day-checklist",

      bgColor: "bg-[#E3AC4A]/10",
    },
    {
      id: 8,
      title: "Parent Handbook",
      description:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat.",
      category: "Forms",
      icon: Users,
      color: "bg-[#80739C]",
      link: "/resources/handbook",
      bgColor: "bg-[#80739C]/10",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#F5856F]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <CheckSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            First Day Checklist
          </h1>

          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
            Download the checklist to make sure you have everything ready for a
            successful first day.
          </p>

          <div className="flex items-center justify-center mt-8 text-sm text-white/80">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last updated August 17, 2025</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-xl  ">
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 bg-[#F5856F]/10 rounded-xl flex items-center justify-center mr-4">
                <CheckSquare className="w-6 h-6 text-[#F5856F]" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Essential Items Checklist
              </h2>
            </div>

            <div className="space-y-4 mb-12">
              {[
                "Application for Enrollment",
                "Emergency Medical Care Information/Medical Action Plan (if applicable)",
                "Documentation of Receipt: Discipline Policy",
                "Infant Feeding Plan (for children less than 15 months old)",
                "Infant Sleep Position Waivers (if applicable)",
                "Documentation of Receipt: Safe Sleep Policy (if applicable)",
                "Authorization for Transportation (if applicable)",
                "Documentation of Receipt: Center Operational Policies",
                "Documentation of Receipt: Summary of Child Care Law",
                "Emergency Medical Care Authorization",
                "Permission to Transport/participate in off premise activities (if applicable)",
                "Documentation of Receipt: Prevention of Shaken Baby Syndrome and Abusive Head Trauma Policies",
                "Permission for aquatic activities (if applicable)",
                "Notification of Smoking and Tobacco Restriction",
                "Documentation of Discussion: Parent Participation Plan",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-6 h-6 border-2 border-[#F5856F] rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#F5856F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            {/* 
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-[#5A80AE]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Documents to Bring
              </h3>
            </div>

            <div className="space-y-4 mb-12">
              {[
                "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem",
                "Vivamus suscipit tortor eget felis porttitor volutpat",
                "Sed porttitor lectus nibh. Vestibulum ante ipsum primis",
                "Faucibus orci luctus et ultrices posuere cubilia Curae",
                "Donec velit neque, auctor sit amet aliquam vel, ullamcorper",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 hover:   rounded-lg transition-colors">
                  <div className="w-6 h-6 border-2 border-[#5A80AE] rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
         
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-[#fdbc46]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Important Reminders
              </h3>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-amber-800 leading-relaxed">
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam,
                feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                libero sit amet quam egestas semper.
              </p>
            </div>
*/}
            <div className="bg-[#F5856F] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-8 h-8" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-xl mb-3">Need Help?</h4>
                  <p className="text-white/90 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Download our checklist to get started.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {/* Download Checklist */}
                    <a
                      href="/File_Checklist_Children_Center.pdf"
                      download
                      className="inline-flex items-center justify-center gap-2 bg-white text-[#892e1c] px-5 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                      Download Checklist
                      <Download className="w-4 h-4" />
                    </a>

                    {/* Contact Us */}
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              RELATED RESOURCES
            </h2>
            <button className="text-[#86AF61] font-semibold hover:text-[#769A51] transition-colors">
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <div
                  key={resource.id}
                  className={`${resource.bgColor} rounded-3xl p-8 transition-all duration-500 transform cursor-pointer border border-white/50 backdrop-blur-sm group`}>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`${resource.color} p-4 rounded-2xl text-white transition-transform duration-300`}>
                      <Icon size={28} />
                    </div>
                    <div className="bg-white/80 p-2 rounded-full duration-300">
                      <Download
                        size={20}
                        className="text-gray-600 hover:text-gray-800"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    className="text-gray-600 text-sm leading-relaxed mb-6 underline underline-offset-4">
                    Learn More
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialAssistancePage;

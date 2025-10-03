"use client";
import React from "react";
import {
  DollarSign,
  CheckSquare,
  FileText,
  Users,
  Download,
  Star,
  Heart,
  Clock,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Shield,
  HelpCircle,
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

  const processSteps = [
    {
      step: 1,
      title: "Step 1",
      description:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. ",
      icon: FileText,
    },
    {
      step: 2,
      title: "Step 2",
      description:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. ",
      icon: Shield,
    },
    {
      step: 3,
      title: "Step 3",
      description:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
      icon: Mail,
    },
    {
      step: 4,
      title: "Step 4",
      description:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="min-h-screen  ">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#81AA8E] to-[#6A9478]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Financial Assistance
          </h1>

          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Making
            quality education accessible to every family.
          </p>

          <div className="flex items-center justify-center mt-8 text-sm text-white/80">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last updated August 17, 2025</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl  ">
            <div className="flex items-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-900">
                Our Philosophy
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus luctus eros aliquet convallis ultricies.
              Mauris augue massa, ultricies non ligula. Suspendisse in orci
              enim. Praesent sed lacinia mauris.
            </p>

            <div className="flex items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Sliding Scale Tuition
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed mb-12">
              Etiam ipsum arcu, eleifend vel dapibus ac, tempus non enim.
              Praesent sed lacinia mauris. Nulla congue nibh magna, ac aliquam
              diam dignissim quis. Donec velit neque, auctor sit amet aliquam
              vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id
              imperdiet et.
            </p>

            <div className="flex items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Application Process
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed mb-10">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
              Vivamus suscipit tortor eget felis porttitor volutpat. Sed
              porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae.
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="  rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-[#81AA8E] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Box */}
            <div className="bg-[#6A9478] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-xl mb-3">Ready to apply?</h4>
                  <p className="text-white/90 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Download our application form to get started.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button className="inline-flex items-center justify-center gap-2 bg-white text-[#2a3d30] px-5 py-3 rounded-full text-sm font-medium hover:  transition-colors cursor-pointer">
                      Download Application Form
                      <Download className="w-4 h-4" />
                    </button>
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
          <div className="flex items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 ">
              RELATED RESOURCES
            </h2>
        
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

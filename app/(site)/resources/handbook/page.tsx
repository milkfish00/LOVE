"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Download,
  Clock,
  ArrowRight,
  FileText,
  
  Users,
  DollarSign,
  CheckSquare,
} from "lucide-react";

const FamilyHandbookPage = () => {
  const [activeSection, setActiveSection] = useState(1);

  const handbookSections = [
    {
      id: 1,
      title: "Introduction",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-8">Our Values</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Sed do eiusmod tempor incididunt</li>
            <li>Ut labore et dolore magna</li>
            <li>Aliqua ut enim ad minim</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: "Program Information",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Program 
          </h3>
          <div className="  p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Infant Program
            </h4>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="  p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Toddler Program
            </h4>
            <p className="text-gray-700">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="  p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Two's Program
            </h4>
            <p className="text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="  p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Threes's Program
            </h4>
            <p className="text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="  p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Four's & Five's Program
            </h4>
            <p className="text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="  p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Sixes Program
            </h4>
            <p className="text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-8">
            Daily Schedule
          </h3>
          <div className="border-l-4 border-[#80739C] pl-4">
            <div className="mb-4">
              <p className="font-semibold text-gray-800">
                7:00-8:30 AM: Morning Arrival
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-800">
                8:30-9:00 AM: Morning Activities
              </p>
              <p className="text-gray-600">
                Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-800">
                12:00-2:00 PM: Rest Time
              </p>
              <p className="text-gray-600">
                Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                4:00-6:00 PM: Afternoon Departure
              </p>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Health & Safety Policies",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Health & Safety</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6">
            Illness Policy
          </h4>
          <p className="text-gray-700">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6">
            Emergency Procedures
          </h4>
          <p className="text-gray-700">
            Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
            ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Nutrition Guidelines",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Healthy Eating</h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6">
            Meal Service
          </h4>
          <p className="text-gray-700">
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit.
          </p>

          <div className="  p-5 rounded-lg mt-4">
            <h5 className="font-semibold text-gray-800 mb-2">Sample Menu</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">
                  Breakfast: Lorem ipsum dolor sit amet
                </p>
                <p className="font-medium text-gray-700">
                  Lunch: Consectetur adipiscing elit
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  AM Snack: Sed do eiusmod tempor
                </p>
                <p className="font-medium text-gray-700">
                  PM Snack: Incididunt ut labore
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Enrollment Procedures",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Enrollment Process
          </h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6">
            Enrollment Steps
          </h4>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#86AF61] flex items-center justify-center text-white font-bold mr-4">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-800">Initial Inquiry</p>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#86AF61] flex items-center justify-center text-white font-bold mr-4">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-800">Application</p>
                <p className="text-gray-600">
                  Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#86AF61] flex items-center justify-center text-white font-bold mr-4">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-800">Documentation</p>
                <p className="text-gray-600">
                  Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Parent Involvement",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: Users,
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Family Partnership
          </h3>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6">
            Communication
          </h4>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="  p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                Regular Updates
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="  p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Meetings</p>
              <p className="text-gray-600">
                Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
  ];

  const currentSection = handbookSections.find(
    (section) => section.id === activeSection
  );

  return (
    <div className="min-h-screen  ">
      {/* Header Section */}
      <section className="bg-[#5a80ae]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Family Handbook
          </h1>

          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex items-center justify-center mt-6 text-sm text-white/80">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated September 12, 2023</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Handbook Contents
              </h2>
              <nav className="space-y-2">
                {handbookSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-4 rounded-lg transition-colors flex items-start gap-3 ${
                        activeSection === section.id
                          ? "bg-[#80739C] text-white"
                          : "  text-gray-700 hover:bg-gray-200"
                      }`}>
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full bg-[#86AF61] hover:bg-[#769A51] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-5 h-5" />
                  Download Full Handbook
                </button>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  PDF Version (2.3 MB)
                </p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {currentSection && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#80739C] rounded-lg text-white">
                      {React.createElement(currentSection.icon, {
                        className: "w-6 h-6",
                      })}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {currentSection.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg mb-8">
                    {currentSection.description}
                  </p>

                  <div className="prose max-w-none">
                    {currentSection.content}
                  </div>
                </>
              )}
            </div>

            {/* Related Resources */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Resources
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyHandbookPage;

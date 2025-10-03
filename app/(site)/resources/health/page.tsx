"use client";
import React, { useState } from "react";
import {
  Heart,
  Shield,
  AlertTriangle,

  Users,
  Phone,
  Clock,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  MapPin,
  Mail,
  ArrowRight,
  Star,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

const HealthAndSafetyPage = () => {
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [activeTab, setActiveTab] = useState("policies");

  const togglePolicy = (policyId : any) => {
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
  };

  const safetyPolicies = [
    {
      id: 1,
      title: "Illness Prevention Protocol",
      description:
        "Procedures for preventing the spread of illnesses in our facility",
      icon: Shield,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Etiam ipsum arcu, eleifend vel dapibus ac, tempus non enim.",
    },
    {
      id: 2,
      title: "Emergency Response Plan",
      description: "Steps taken during various emergency situations",
      icon: AlertTriangle,
      content:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, ac aliquam diam dignissim quis. Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
    },

    {
      id: 4,
      title: "Health Screening Policy",
      description: "Daily health checks and screening procedures",
      icon: Users,
      content:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Medication Authorization Form",
      description:
        "Required for administration of any medication during school hours",
      icon: FileText,
      category: "Forms",
      date: "2025-08-15",
    },
    {
      id: 2,
      title: "Immunization Requirements",
      description: "State-mandated vaccination schedule and documentation",
      icon: FileText,
      category: "Guidelines",
      date: "2025-07-20",
    },
    {
      id: 3,
      title: "Allergy Action Plan",
      description:
        "Template for creating a personalized allergy management plan",
      icon: FileText,
      category: "Templates",
      date: "2025-08-01",
    },
  ];

  const emergencyContacts = [
    {
      id: 1,
      name: "School Nurse",
      phone: "(555) 123-4567",
      extension: "Ext. 112",
      available: "Mon-Fri, 8:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Health & Safety Director",
      phone: "(555) 123-4567",
      extension: "Ext. 108",
      available: "Mon-Fri, 9:00 AM - 5:00 PM",
    },
    {
      id: 3,
      name: "Emergency Line",
      phone: "(555) 911-HELP",
      extension: "24/7",
      available: "Available at all times",
    },
  ];

  return (
    <div className="min-h-screen  ">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#a684a3] to-[#8c6c89]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Health & Safety
          </h1>

          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our
            commitment to ensuring a safe and healthy environment for all
            students and staff.
          </p>

          <div className="flex items-center justify-center mt-8 text-sm text-white/80">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last updated August 17, 2025</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl   p-8 md:p-10 mb-12">
            <div className="flex items-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-900">
                Our Commitment
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus luctus eros aliquet convallis ultricies.
              Mauris augue massa, ultricies non ligula. Suspendisse in orci
              enim. Praesent sed lacinia mauris. Nulla congue nibh magna, ac
              aliquam diam dignissim quis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-[#a684a3]/10 rounded-xl">
                <div className="w-12 h-12 bg-[#a684a3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Prevention First
                </h3>
                <p className="text-gray-600 text-sm">
                  Proactive measures to maintain a healthy environment
                </p>
              </div>

              <div className="text-center p-6 bg-[#a684a3]/10 rounded-xl">
                <div className="w-12 h-12 bg-[#a684a3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Emergency Preparedness
                </h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive plans for various scenarios
                </p>
              </div>

              <div className="text-center p-6 bg-[#a684a3]/10 rounded-xl">
              
                <h3 className="font-semibold text-gray-900 mb-2">
                  Trained Staff
                </h3>
                <p className="text-gray-600 text-sm">
                  Certified professionals ready to respond
                </p>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Health Screening Procedures
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed mb-10">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
              Vivamus suscipit tortor eget felis porttitor volutpat. Sed
              porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae.
            </p>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-2xl   overflow-hidden mb-12">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("policies")}
                  className={`py-4 px-6 text-center font-medium text-sm flex-1 flex items-center justify-center gap-2 ${
                    activeTab === "policies"
                      ? "text-[#a684a3] border-b-2 border-[#a684a3]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}>
                  <Shield className="w-4 h-4" />
                  Safety Policies
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`py-4 px-6 text-center font-medium text-sm flex-1 flex items-center justify-center gap-2 ${
                    activeTab === "resources"
                      ? "text-[#a684a3] border-b-2 border-[#a684a3]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}>
                  <FileText className="w-4 h-4" />
                  Resources
                </button>
                <button
                  onClick={() => setActiveTab("contacts")}
                  className={`py-4 px-6 text-center font-medium text-sm flex-1 flex items-center justify-center gap-2 ${
                    activeTab === "contacts"
                      ? "text-[#a684a3] border-b-2 border-[#a684a3]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}>
                  <Phone className="w-4 h-4" />
                  Emergency Contacts
                </button>
              </nav>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === "policies" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Health & Safety Policies
                  </h3>
                  {safetyPolicies.map((policy) => {
                    const Icon = policy.icon;
                    return (
                      <div
                        key={policy.id}
                        className="  rounded-xl overflow-hidden">
                        <button
                          className="w-full flex items-center justify-between p-6 text-left"
                          onClick={() => togglePolicy(policy.id)}>
                          <div className="flex items-center">
                            <div className="bg-[#a684a3] p-3 rounded-xl mr-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {policy.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {policy.description}
                              </p>
                            </div>
                          </div>
                          {expandedPolicy === policy.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        {expandedPolicy === policy.id && (
                          <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                            <p className="text-gray-700">{policy.content}</p>
                            <button className="inline-flex items-center mt-4 text-[#a684a3] font-medium text-sm">
                              Download Full Policy
                              <Download className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "resources" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Health Resources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource) => {
                      const Icon = resource.icon;
                      return (
                        <div
                          key={resource.id}
                          className="  rounded-xl p-6 border border-gray-200 transition-all duration-300 hover: ">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-[#a684a3] rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <button className="text-gray-400 hover:text-[#a684a3]">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                              {resource.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {resource.date}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "contacts" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Emergency Contacts
                  </h3>
                  <div className="space-y-6">
                    {emergencyContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-start p-4   rounded-xl border border-gray-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#a684a3] rounded-full flex items-center justify-center mr-4">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {contact.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <span className="flex items-center text-gray-700">
                              <Phone className="w-4 h-4 mr-1" />
                              {contact.phone}{" "}
                              {contact.extension && `(${contact.extension})`}
                            </span>
                            <span className="flex items-center text-gray-600 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {contact.available}
                            </span>
                          </div>
                        </div>
                        <button className="bg-[#a684a3] hover:bg-[#937592] text-white p-2 rounded-lg">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-[#a684a3] to-[#8c6c89] rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-bold text-xl mb-3">
                  Questions about our health policies?
                </h4>
                <p className="text-white/90 text-sm mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our
                  health coordinator is available to answer any questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="inline-flex items-center justify-center gap-2 bg-white text-[#a684a3] px-5 py-3 rounded-lg text-sm font-medium hover:  transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" />
                    Email Health Coordinator
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">
                    <Phone className="w-4 h-4" />
                    Call Office
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16  ">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Health & Safety FAQs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find
              answers to common questions about our health policies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                question: "What should I do if my child is sick?",
                answer:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula.",
              },
              {
                question: "How do you handle allergy concerns?",
                answer:
                  "Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Etiam ipsum arcu, eleifend vel dapibus ac, tempus non enim.",
              },
              {
                question: "What safety certifications do staff members have?",
                answer:
                  "Praesent sed lacinia mauris. Nulla congue nibh magna, ac aliquam diam dignissim quis. Donec velit neque, auctor sit amet aliquam vel.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthAndSafetyPage;

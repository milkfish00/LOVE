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

const StaffChecklistPage = () => {
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

  const checklistItems = [
    {
      name: "Employment Application (includes DOB, education, training, and experience)",
      dueDate: "Day 1",
    },
    { name: "Medical Report*", dueDate: "Prior to employment" },
    { name: "TB Screening or Screening*", dueDate: "Prior to employment" },
    { name: "Health Questionnaire*", dueDate: "Day 1 & annually" },
    {
      name: "Emergency Information Form",
      dueDate: "Day 1 & as changes occur & annually",
    },
    { name: "CBC Qualification Letter", dueDate: "Day 1 & every 5 years" },
    {
      name: "Documentation of Orientation",
      dueDate: "Within 2 weeks/6 weeks of employment",
    },
    {
      name: "Documentation of Health and Safety Training",
      dueDate: "Within 1 year & every 5 years thereafter",
    },
    {
      name: "Documentation of On-Going Training",
      dueDate: "After the first year of employment & annually thereafter",
    },
    {
      name: "Documentation of CPR/First Aid Certification",
      dueDate: "Within 90 days of employment Renew before expiration date",
    },
    {
      name: "Documentation of Playground Safety Training (if applicable)",
      dueDate: "Within 6 months of employment",
    },
    {
      name: "Documentation of BSAC training (if applicable)",
      dueDate: "Within 3 months of employment",
    },
    {
      name: "Documentation of ITS-SIDS Safe Sleep Training (if applicable) Administrators must complete within 90 days",
      dueDate: "Within 2 months of infant room work & every 3 years",
    },
    {
      name: "Documentation of Emergency Medical Care Plan (EMC) review",
      dueDate: "Review annually & whenever plan is revised",
    },
    {
      name: "Documentation of EPR Plan Review",
      dueDate: "Orientation & annually",
    },
    {
      name: "Documentation of EPR in Child Care Training (if applicable)",
      dueDate:
        "Within 1 year of licensure & within 4 months of trained staff's departure date",
    },
    {
      name: "Documentation of Recognizing and Responding to Suspicious of Child Maltreatment training",
      dueDate: "Within 90 days of employment",
    },
    {
      name: "Documentation of receipt of prevention of shaken baby syndrome and abusive head trauma policy",
      dueDate: "Day 1 & 14 days prior to new policy implementation",
    },
    {
      name: "WORKS Qualification Information: Notification from the DCDEE WORKS regarding submitted education/training for position qualification information",
      dueDate: "Within 6 months of assuming duties",
    },
    {
      name: "Documentation of Enrollment in Coursework (if applicable)",
      dueDate: "",
    },
    {
      name: "Professional Development Plan",
      dueDate: "Within 1 year & annually",
    },
    { name: "Documentation of Staff Evaluation", dueDate: "Annually" },
    {
      name: "Documentation of Job Description Receipt",
      dueDate: "When applicable",
    },
    {
      name: "Documentation of Operational and Personnel Policy Receipt",
      dueDate: "Day 1 & when changes occur",
    },
    {
      name: "Documentation of receipt of Aquatic Activities Policy, guidelines provided by the pool operator or off-site aquatic facility/aquatic rules (if applicable)",
      dueDate: "Day 1 & annually",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#7FB3B8]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <CheckSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl  font-bold text-white mb-6">
            Staff File Checklist
          </h1>

          <p className="text-lg text-white/90 max-w-lg mx-auto leading-relaxed">
            Ensure all required documentation is complete and up-to-date for
            each staff member.
          </p>

          <div className="flex items-center justify-center mt-8 text-sm text-white/80">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last updated August 17, 2025</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-xl">
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 bg-[#7FB3B8]/10 rounded-xl flex items-center justify-center mr-4">
                <CheckSquare className="w-6 h-6 text-[#7FB3B8]" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Staff File Documentation Requirements
              </h2>
            </div>

            <div className="mb-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                      Documentation
                    </th>
                    <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700 w-1/4">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {checklistItems.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {item.name}
                      </td>
                      <td className="p-3 border-b border-gray-200 text-gray-700">
                        {item.dueDate}
                      </td>
                      <td className="p-3 border-b border-gray-200">
                        <div className="h-8 border-b border-dashed border-gray-300"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-sm text-gray-500">
                <p>
                  * These items must be kept confidential and in a separate
                  individual medical file.
                </p>
              </div>
            </div>

            <div className="bg-[#7FB3B8] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-8 h-8" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-xl mb-3">Need Help?</h4>
                  <p className="text-white/90 text-sm mb-6">
                    Contact our HR department for assistance with staff
                    documentation requirements.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {/* Download Checklist */}
                    <a
                      href="/File_Checklist-Staff-center.pdf"
                      download
                      className="inline-flex items-center justify-center gap-2 bg-white text-[#2E6066] px-5 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
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

export default StaffChecklistPage;

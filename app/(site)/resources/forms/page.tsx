"use client"
import React, { useState } from "react";
import {
  FileText,
  Download,
  User,
  BookOpen,
  DollarSign,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const FormsAndDocumentsPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId: any) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const documentCategories = [
    {
      id: 1,
      title: "Enrollment Forms",
      icon: User,
      color: "bg-blue-500",
      documents: [
        {
          id: 101,
          title: "Student Application",
          fileType: "PDF",
          fileSize: "2.4 MB",
        },
        {
          id: 102,
          title: "Emergency Contact Form",
          fileType: "PDF",
          fileSize: "1.1 MB",
        },
        {
          id: 103,
          title: "Health Records",
          fileType: "DOCX",
          fileSize: "3.2 MB",
        },
      ],
    },
    {
      id: 2,
      title: "Financial Documents",
      icon: DollarSign,
      color: "bg-green-500",
      documents: [
        {
          id: 201,
          title: "Financial Aid Application",
          fileType: "PDF",
          fileSize: "4.7 MB",
        },
        {
          id: 202,
          title: "Payment Plan Agreement",
          fileType: "PDF",
          fileSize: "1.8 MB",
        },
      ],
    },
    {
      id: 3,
      title: "Academic Resources",
      icon: BookOpen,
      color: "bg-orange-500",
      documents: [
        {
          id: 301,
          title: "Academic Calendar",
          fileType: "PDF",
          fileSize: "0.8 MB",
        },
        {
          id: 302,
          title: "Course Catalog",
          fileType: "PDF",
          fileSize: "5.3 MB",
        },
      ],
    },
    {
      id: 4,
      title: "Health & Safety",
      icon: Shield,
      color: "bg-red-500",
      documents: [
        {
          id: 401,
          title: "Medication Form",
          fileType: "PDF",
          fileSize: "1.5 MB",
        },
        {
          id: 402,
          title: "Permission Slip",
          fileType: "PDF",
          fileSize: "1.0 MB",
        },
      ],
    },
  ];

  const handleDownload = (document: any) => {
    alert(`Downloading: ${document.title}`);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <section className="">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Forms & Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {documentCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover: "
                    onClick={() => toggleCategory(category.id)}>
                    <div className="flex items-center">
                      <div className={`${category.color} p-2 rounded-lg mr-4`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {category.title}
                      </h3>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedCategory === category.id && (
                    <div className="border-t border-gray-100 px-6 py-4">
                      <div className="space-y-3">
                        {category.documents.map((document) => (
                          <div
                            key={document.id}
                            className="flex items-center justify-between py-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {document.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {document.fileType} • {document.fileSize}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDownload(document)}
                              className="ml-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormsAndDocumentsPage;

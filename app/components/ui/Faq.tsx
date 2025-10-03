"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { homeQuery } from "@/app/lib/queries";
import { homeInterface } from "@/app/lib/interface";
import { client } from "@/sanity/lib/client";

// Define the FAQ item type
interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  data: homeInterface;
}

export default function FAQAccordion({ data }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  // Get FAQs from the data, with fallback
  const faqSection = data?.faqSections?.[0];
  const faqs = faqSection?.faqs || [];

  if (!faqSection || faqs.length === 0) {
    return (
      <div className="w-full h-full bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600">No FAQs available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {faqSection.title || "Frequently Asked Questions"}
          </h1>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item: FAQItem, index: number) => {
            const isOpen = openItems.has(item._key);

            return (
              <div
                key={item._key}
                className="group bg-white rounded-2xl shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}>
                <button
                  onClick={() => toggleItem(item._key)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#fbfffd] transition-colors duration-200"
                  aria-expanded={isOpen}>
                  <span className="text-lg font-semibold text-gray-800 pr-6 group-hover:text-[#81aa8e] transition-colors duration-200">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#86AF61] flex items-center justify-center group-hover:bg-[#aed788] transition-colors duration-200">
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}>
                  <div className="px-8 pb-8">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Server component wrapper to fetch data
export async function FAQAccordionWrapper() {
  const query = homeQuery;
  const data: homeInterface = await client.fetch(query);
  
  return <FAQAccordion data={data} />;
}
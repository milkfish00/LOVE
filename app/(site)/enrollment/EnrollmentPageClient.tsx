"use client";
import React from "react";
import { Tuition , Programs} from "@/app/lib/interface";
import { ArrowRight } from "lucide-react";
import { buttonClasses } from "@/app/components/ui/buttonStyles";
import { text } from "@/app/components/ui/textStyles";
import TuitionRatesSection from "@/app/components/Home/Tuition";

type Props = {
  data: Tuition;
  programsData?: Programs; 
};

const EnrollmentPageClient: React.FC<Props> = ({ data, programsData }) => {
  const cta = data.ctaSection?.[0];
  const tuitionParagraph = data.tuitionPayments
    ?.map((item) => item.description)
    .filter(Boolean)
    .join(" ");

  const tuitionButtons =
    data.tuitionPayments
      ?.map((t) => ({
        key: t._key,
        text: t.button?.text,
        url: t.button?.url,
      }))
      .filter(
        (b): b is { key: string; text: string; url: string | undefined } =>
          !!b.text
      ) || [];

  return (
    <div className="min-h-screen bg-[#fff3df]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
          <img
            src="/svg/flower1.svg"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
        <div className="absolute top-32 left-20 w-20 h-20 opacity-15">
          <img
            src="/svg/flower3.svg"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
        <div className="absolute bottom-20 right-32 w-24 h-24 opacity-10">
          <img
            src="/svg/flower5.svg"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className={`${text.h1} mb-6`}>
            {data.title || "Enrollment & Tuition"}
          </h1>
          {data.description && (
            <p className={`${text.lead} mb-8 max-w-2xl mx-auto`}>
              {data.description}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enrollment Process */}
          <section id="enrollment" className="lg:col-span-2">
            <h2 className={`${text.h2} mb-6`}>Enrollment Process</h2>
            <div className="relative">
              <div className="hidden sm:block absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-6">
                {data.enrollmentProcess?.map((step) => (
                  <div key={step._key} className="relative pl-12">
                    <div className="hidden sm:flex absolute -translate-x-1/2 left-4 top-0 mt-0.5 h-8 w-8 rounded-full bg-gray-900 text-white items-center justify-center text-sm font-semibold">
                      {step.stepNumber}
                    </div>
                    <div className="sm:ml-0">
                      <h3 className={`${text.h3} mb-1`}>{step.title}</h3>
                      <p className={text.body}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Tuition Card */}
            <section
              id="tuition"
              className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
              <div className="pointer-events-none absolute -right-6 -top-6 w-24 opacity-10">
                <img
                  src="/svg/flower1.svg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
              <div className="pointer-events-none absolute -left-8 -bottom-8 w-20 opacity-10">
                <img
                  src="/svg/flower3.svg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-[#FFD58B]/40 via-transparent to-transparent" />
              <h2 className={`${text.h3} mb-3 relative`}>Tuition & Payments</h2>
              <p className={`${text.body} relative`}>
                {tuitionParagraph ||
                  "We offer clear, flexible tuition and payment options. Contact us for details."}
              </p>

              {tuitionButtons.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {tuitionButtons.map((b) => (
                    <a
                      key={b.key}
                      href={b.url || "#"}
                      className={buttonClasses("link", "sm", "lg")}>
                      {b.text}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  ))}
                </div>
              )}
            </section>

            {/* Financial Aid Cards */}
            <section id="financial-aid" className="space-y-6">
              {data.financialAid?.map((fa) => (
                <div
                  key={fa._key}
                  className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
                  <div className="pointer-events-none absolute -right-6 -top-6 w-24 opacity-10">
                    <img
                      src="/svg/flower1.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="pointer-events-none absolute -left-8 -bottom-8 w-20 opacity-10">
                    <img
                      src="/svg/flower3.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-[#FFD58B]/40 via-transparent to-transparent" />
                  <h2 className={`${text.h3} mb-3 relative`}>{fa.title}</h2>
                  <p className={`${text.body} mb-4 relative`}>
                    {fa.description}
                  </p>
                  {fa.button?.text && (
                    <a
                      href={fa.button.url || "#"}
                      className={buttonClasses("link", "sm", "lg")}>
                      {fa.button.text}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  )}
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
      {programsData && <TuitionRatesSection data={programsData} />}


      {/* CTA Section */}
      {cta && (
        <section className="py-20 bg-[#86AF61]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">{cta.title}</h2>
            {cta.description && (
              <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
                {cta.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {cta.button?.text && (
                <a
                  href={cta.button.url || "#"}
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                  {cta.button.text}
                </a>
              )}
              {cta.secondButton?.text && (
                <a
                  href={cta.secondButton.url || "#"}
                  target="_blank"
                  className="bg-[#FFD58B] text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#ffc966] transition-colors">
                  {cta.secondButton.text}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EnrollmentPageClient;

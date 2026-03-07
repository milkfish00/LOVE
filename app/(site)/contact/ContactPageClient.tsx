"use client";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Contact } from "@/app/lib/interface";

interface ContactPageClientProps {
  data: Contact;
}

type ContactInformationItem = Contact["contactInformation"][number];
type ContactInfoCard = {
  key: string;
  icon: LucideIcon;
  title: string;
  details: string;
  color: string;
};

const ContactPageClient = ({ data: contactData }: ContactPageClientProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [expectingResponse, setExpectingResponse] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setSuccessMsg(null);
    setExpectingResponse(true);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      if (!expectingResponse) return;
      setSuccessMsg("Thanks! Your message has been sent.");
      setIsSubmitting(false);
      setExpectingResponse(false);
      formRef.current?.reset();
    };

    iframe.addEventListener("load", handleLoad);
    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [expectingResponse]);

  const getIconForItem = (item: ContactInformationItem): LucideIcon => {
    const key = (item?.type || item?.title || "").toLowerCase();
    if (item?.number || key.includes("phone")) return Phone;
    if (key.includes("email")) return Mail;
    if (
      item?.street ||
      item?.address ||
      key.includes("address") ||
      key.includes("visit")
    )
      return MapPin;
    if (item?.hours || key.includes("hour")) return Clock;
    return Globe;
  };

  const getColorForItem = (item: ContactInformationItem): string => {
    const key = (item?.type || item?.title || "").toLowerCase();
    if (item?.number || key.includes("phone")) return "bg-[#80739C]";
    if (key.includes("email")) return "bg-[#86AF61]";
    if (
      item?.street ||
      item?.address ||
      key.includes("address") ||
      key.includes("visit")
    )
      return "bg-[#2E3192]";
    if (item?.hours || key.includes("hour")) return "bg-[#E3AC4A]";
    return "bg-[#80739C]";
  };

  const contactInfo: ContactInfoCard[] = (
    contactData?.contactInformation || []
  ).map((item) => {
    const Icon = getIconForItem(item);
    const details =
      item?.number ||
      [item?.street, item?.address].filter(Boolean).join(" ") ||
      item?.hours ||
      "";
    return {
      key: item._key,
      icon: Icon,
      title: item?.title || item?.type || "",
      details,
      color: getColorForItem(item),
    };
  });

  const cta = contactData?.ctaSection?.[0];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {contactData?.title || "Contact Us"}
          </h1>
          <p className="text-xl max-w-md mx-auto">
            {contactData?.description || ""}
          </p>
          <a
            href="https://calendly.com/loveandlearning-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-6 items-center justify-center rounded-full bg-[#81aa8e] px-6 py-3 text-white font-semibold hover:bg-[#476e53] transition-colors">
            Book a Tour
          </a>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className=" ">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-1 gap-12">
            {/* Contact Form */}
            <div className=" rounded-xl p-8">
              <form
                ref={formRef}
                action="https://www.form-to-email.com/api/s/pKQZmPVS6hkc"
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmit}
                className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg text-gray-400 border border-gray-300 focus:ring-2 focus:ring-[#80739C] focus:border-transparent"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#80739C] focus:border-transparent"
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className=" gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#80739C] focus:border-transparent"
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#80739C] focus:border-transparent resize-none h-32"
                    placeholder="Tell us more about your needs or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#80739C] py-4 px-8 rounded-lg font-bold text-white hover:bg-[#6b5f85] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {successMsg && (
                  <div className="text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
                    {successMsg}
                  </div>
                )}
              </form>
              <iframe
                ref={iframeRef}
                name="hidden_iframe"
                id="hidden_iframe"
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.length === 0 && (
              <div className="text-gray-600 text-center md:col-span-2 lg:col-span-4">
                Contact information coming soon.
              </div>
            )}
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.key}
                  className="rounded-xl p-6 flex flex-col items-center text-center">
                  <div
                    className={`${info.color} p-3 rounded-lg text-white w-fit mb-4 mx-auto`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-800 font-semibold mb-2">
                    {info.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-linear-to-br from-orange-50 to-white py-16 border-t border-orange-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {cta?.title || "Join Our Team"}
          </h2>
          <p className="text-xl  mb-10 max-w-2xl mx-auto">
            {cta?.description ||
              "Explore rewarding career opportunities with Love and Learning Child Care Center."}
          </p>
          <a
            href={cta?.button?.url || "#"}
            className=" bg-[#f48573]  px-8 py-4 cursor-pointer rounded-full font-semibold text-lg hover:bg-[#e37664]  text-white transition-colors">
            {" "}
            {cta?.button?.text || "View Open Positions"}
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPageClient;

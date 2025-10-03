import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Love & Learning Child Care Center. Ask about enrollment, programs, tours, and more.",
};

const ContactPage = async () => {
  return <ContactPageClient />;
};

export default ContactPage;

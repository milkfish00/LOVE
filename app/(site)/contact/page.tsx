import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { sanityFetch } from "@/sanity/lib/live";
import { contactQuery } from "@/app/lib/queries";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Love & Learning Child Care Center. Ask about enrollment, programs, tours, and more.",
};

const ContactPage = async () => {
  const { data } = await sanityFetch({
    query: contactQuery, 
    params: {},
  });

  return <ContactPageClient data={data} />;
};

export default ContactPage;
"use client";
import React from "react";

export function CopyEmailButton() {
  const [copied, setCopied] = React.useState(false);
  const email = "info@loveandlearning.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 ring-offset-white disabled:opacity-50 disabled:pointer-events-none bg-[#FFD58B] text-gray-900 hover:bg-[#f9d597] px-6 py-3 text-base rounded-full gap-2">
      <span>{email}</span>
      {copied && <span className="text-gray-700">Copied!</span>}
    </button>
  );
}

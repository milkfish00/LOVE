"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { buttonClasses } from "./buttonStyles";
import { NavSettings } from "../../lib/interface";

import { urlFor } from "@/sanity/lib/image";
interface NavbarProps {
  settings: NavSettings;
}



interface DropdownLink {
  name: string;
  href: string;
  description?: string;
}

interface DropdownSection {
  title: string;
  links: DropdownLink[];
}

interface DropdownContent {
  sections: DropdownSection[];
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
  dropdownContent?: DropdownContent;
}

interface NavbarProps {
  logoUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMobileDropdown(null);
    }
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const toggleMobileDropdown = (itemName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileDropdown(mobileDropdown === itemName ? null : itemName);
  };

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveDropdown(null);
        document.body.style.overflow = "unset";
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.body.style.overflow = "unset";
    };
  }, []);

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/home",
      hasDropdown: false,
    },
    {
      name: "About Us",
      href: "/about",
      hasDropdown: false,
    },
    {
      name: "Tuition & Enrollment",
      href: "/enrollment",
      hasDropdown: false,
    },
    {
      name: "Programs",
      href: "/programs",
      hasDropdown: true,
      dropdownContent: {
        sections: [
          {
            title: "AGE GROUPS",
            links: [
              {
                name: "Infants",
                href: "/programs/infants",
                description: "Ages 6 weeks - 12 months",
              },
              {
                name: "Toddlers",
                href: "/programs/toddlers",
                description: "Ages 12 - 24 months",
              },
              {
                name: "Twos",
                href: "/programs/twos",
                description: "Ages 2 - 3 years",
              },
              {
                name: "Threes",
                href: "/programs/threes",
                description: "Ages 3 - 4 years",
              },
              {
                name: "Fours & Fives",
                href: "/programs/fours-and-fives",
                description: "Ages 4 - 6 years",
              },
            ],
          },
        ],
      },
    },
    {
      name: "Resources",
      href: "/resources",
      hasDropdown: true,
      dropdownContent: {
        sections: [
          {
            title: "ENROLLMENT INFO",
            links: [
              {
                name: "First Day Checklist",
                href: "/resources/first-day-checklist",
              },
              {
                name: "Staff Checklist",
                href: "/resources/staff-file-checklist",
              },

              {
                name: "Photo Gallery",
                href: "/resources/gallery",
              },
            ],
          },
        ],
      },
    },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={"sticky top-0 z-[100] bg-white transition-all duration-300"}
        ref={navbarRef}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                {settings?.navLogo && (
                  <img
                    src={urlFor(settings.navLogo).url()}
                    alt="Love & Learning Child Care Center"
                    className="h-7 w-auto transition-transform duration-200"
                  />
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                      item.hasDropdown && handleMouseEnter(item.name)
                    }
                    onMouseLeave={handleMouseLeave}>
                    <Link
                      href={item.href}
                      className="relative text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1 rounded-lg group">
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Enhanced Dropdown Menu */}
                    {item.hasDropdown &&
                      activeDropdown === item.name &&
                      item.dropdownContent && (
                        <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
                          <div className="p-6">
                            <div className="space-y-6">
                              {item.dropdownContent.sections.map(
                                (section, sectionIndex) => (
                                  <div key={sectionIndex}>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                      {section.title}
                                    </h3>
                                    <ul className="space-y-3">
                                      {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                          <Link
                                            href={link.href}
                                            className="group flex flex-col p-3 rounded-lg  transition-all duration-200">
                                            <span className="text-sm font-medium text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">
                                              {link.name}
                                            </span>
                                            {link.description && (
                                              <span className="text-xs text-gray-500 mt-1">
                                                {link.description}
                                              </span>
                                            )}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="https://app.tryplayground.com/listings/qe0imFADRTv3liKpN88c"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("outline", "sm", "full")}>
                Log In
              </Link>
              <Link
                href="/contact"
                className={buttonClasses("primary", "sm", "full")}>
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none transition-all duration-200"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu">
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-40 top-20 overflow-y-auto">
            <div className="px-4 pt-6 pb-8 space-y-2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-center py-4">
                    <Link
                      href={item.href}
                      className="flex-1 text-base font-medium text-gray-900 hover:text-yellow-600 transition-colors duration-200"
                      onClick={() => {
                        setIsOpen(false);
                        document.body.style.overflow = "unset";
                      }}>
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={(e) => toggleMobileDropdown(item.name, e)}
                        className="ml-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
                        aria-label={`Toggle ${item.name} submenu`}>
                        {mobileDropdown === item.name ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown Content */}
                  {item.hasDropdown && mobileDropdown === item.name && (
                    <div className="pl-4 pb-4 space-y-4   rounded-lg">
                      {item.dropdownContent?.sections.map(
                        (section, sectionIndex) => (
                          <div key={sectionIndex} className="space-y-3">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              {section.title}
                            </h3>
                            <ul className="space-y-2">
                              {section.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link
                                    href={link.href}
                                    className="block py-2 px-3 text-sm text-gray-700 hover:text-yellow-600 hover:bg-white rounded-lg transition-all duration-200"
                                    onClick={() => {
                                      setIsOpen(false);
                                      document.body.style.overflow = "unset";
                                    }}>
                                    <div className="font-medium">
                                      {link.name}
                                    </div>
                                    {link.description && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {link.description}
                                      </div>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Action Buttons */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="flex flex-col space-y-3">
                  <Link
                    href="https://app.tryplayground.com/listings/qe0imFADRTv3liKpN88c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses("outline", "md", "full")}
                    onClick={() => {
                      setIsOpen(false);
                      document.body.style.overflow = "unset";
                    }}>
                    Log In
                  </Link>
                  <Link
                    href="/contact"
                    className={buttonClasses("primary", "md", "full")}
                    onClick={() => {
                      setIsOpen(false);
                      document.body.style.overflow = "unset";
                    }}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

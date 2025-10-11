// GROQ queries for Love & Learning Child Care Center

// Home page query
export const homeQuery = `
  *[_type == "home"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    heroSections[] {
      _key,
      backgroundImage {
        _type,
        asset {
          _ref,
          _type
        }
      },
      description,
      headline,
      Button {
        link,
        text
      }
    },
    aboutSections[] {
      _key,
      button {
        link,
        text
      },
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      subtitle,
      title
    },
    cta1Sections[] {
      _key,
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      subtitle,
      title,
           Button {
        link,
        text
      }
    },
    cta2Sections[] {
      _key,
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      subtitle,
      title,  
      Button {
        link,
        text
      }
    },
    faqSections[] {
      _key,
      title,
      faqs[] {
        _key,
        question,
        answer
      }
    },
    testimonialsSections[] {
      _key,
      title,
      description,
      subtitle,
      testimonials[] {
        _key,
        author,
        childProgram,
        quote,
        role
      }
    }
  }
`;

// About page query

export const aboutQuery = `
  *[_type == "about"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    heroSections[] {
      _key,
      backgroundImage {
        _type,
        asset {
          _ref,
          _type
        }
      },
      description[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        markDefs,
        style
      },
      headline,
      subtitle
    },
    owners[] {
      _key,
      bio[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        markDefs,
        style
      },
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      name,
      role
    },
    staffSections[] {
      _key,
      bio,
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      name,
      role
    }
  }
`;


// Programs query
export const programsQuery = `
  *[_type == "programs"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    description,
    programSections[] | order(order asc) {
      _key,
      ageRange,
      classSize,
      description[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        markDefs,
        style
      },
      dailyActivities[] {
        _key,
        activity,
        description,
        time
      },
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      order,
       tuitionRates,
      programTitle,
      schedule,
      slug {
        _type,
        current
      }
    }
  }
`;

// Individual program query by slug
export const programBySlugQuery = `
  *[_type == "programs"][0] {
    programSections[slug.current == $slug][0] {
      _key,
      ageRange,
      classSize,
      description[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        markDefs,
        style
      },
      dailyActivities[] {
        _key,
        activity,
        description,
        time
      },
      image {
        _type,
        asset {
          _ref,
          _type
        }
      },
      programTitle,
      tuitionRates,
      schedule,
      slug {
        _type,
        current
      }
    }
  }
`;

// Tuition page query
export const tuitionQuery = `
  *[_type == "tuition"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    description,
    enrollmentProcess[] | order(stepNumber asc) {
      _key,
      description,
      stepNumber,
      title
    },
    financialAid[] {
      _key,
      description,
      button {
        text,
        url
      },
      title
    },
    tuitionPayments[] {
      _key,
      description,
        button {
        text,
        url
      },
      title
    },
    ctaSection[] {
      _key,
      button {
        text,
        url
      },
      secondButton {
        text,
        url
      },
      description,
      title
    }
  }
`;

// Resources page query
export const resourcesQuery = `
  *[_type == "resources"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    resourcesHero[] {
      _key,
      backgroundImage {
        _type,
        asset {
          _ref,
          _type
        }
      },
      description,
      title
    },
    resources[] {
      _key,
      slug { current },
      type,
      description,
      tags,
      content[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        level,
        listItem,
        markDefs,
        style
      },
      downloadPdf {
        _type,
        asset {
          _ref,
          _type
        }
      },
      "title": resourceTitle
    }
  }
`;

// All resource slugs
export const allResourceSlugsQuery = `
  *[_type == "resources"][0] {
    resources[] {
      slug { current }
    }
  }
`;

// Individual resource by slug
export const resourceBySlugQuery = `
  *[_type == "resources"][0] {
    resources[slug.current == $slug][0] {
      _key,
      slug { current },
      type,
      "title": resourceTitle,
      description,
      tags,
      content[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        level,
        listItem,
        markDefs,
        style
      },
      checklistItems[] {
        _key,
        item,
        details
      },
      downloadPdf {
        _type,
        asset { _ref, _type }
      }
    }
  }
`;

// Careers page query
export const careersQuery = `
  *[_type == "careers"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    description,
    jobs[] {
      _key,
      description[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        level,
        listItem,
        markDefs,
        style
      },
      location,
      title
    }
  }
`;

// Gallery page query
export const galleryQuery = `
  *[_type == "gallery"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    description,
    gallery[] {
      _key
      // Add additional properties as needed based on gallery structure
    }
  }
`;

// Contact page query
export const contactQuery = `
  *[_type == "contact"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    description,
    contactInformation[] {
      _key,
      _type,
      type,
      title,
      subtitle,
      street,
      address,
      number,
      hours
    }, 
     ctaSection[] {
      _key,
       title, 
        description,
      button {
        text,
        url
      },
    }
  }
`;

// Settings query (site-wide settings)
export const settingsQuery = `
  *[_type == "settings"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _originalId,
    _rev,
    _system,
    title,
    description,
    favicon {
      _type,
      asset {
        _ref,
        _type
      }
    },
    navLogo {
      _type,
      asset {
        _ref,
        _type
      }
    },
    footerLogo {
      _type,
      asset {
        _ref,
        _type
      }
    },
    openGraphImage {
      _type,
      asset {
        _ref,
        _type
      }
    },
    seoKeywords,
    socialLinks[] {
      _key,
      platform,
      url
    },
    banner[] {
      _key,
      _type,
      text,
      subtitle,
      buttonText,
      link
    },
    legalDocuments[] {
      _key,
      _type,
      title,
      slug {
        _type,
        current
      },
      content[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        markDefs[] {
          _key,
          _type
        },
        style,
        level,
        listItem
      }
    }
  }
`;

// Navigation menu query (if you need menu items)
export const navigationQuery = `
  *[_type == "settings"][0] {
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`;

// All programs slugs (useful for static generation)
export const allProgramSlugsQuery = `
  *[_type == "programs"][0] {
    programSections[] {
      slug {
        current
      }
    }
  }
`;

// SEO data query
export const seoQuery = `
  *[_type == "settings"][0] {
    title,
    description,
    seoKeywords,
    openGraphImage {
      _type,
      asset {
        _ref,
        _type
      }
    }
  }
`;

// Footer data query
export const footerQuery = `
  *[_type == "settings"][0] {
    logo {
      _type,
      asset {
        _ref,
        _type
      }
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    legalDocuments[] {
      _key,
      title
    }
  }
`;

// Contact information for footer/header
export const contactInfoQuery = `
  *[_type == "contact"][0] {
    contactInformation[] {
      _key,
      type,
      title,
      street,
      address,
      number,
      hours
    }
  }
`;

// Home page query
export const getHomeData = `*[_type == "home"] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  heroSections[] {
    _key,
    backgroundImage {
      _type,
      asset {
        _ref,
        _type
      }
    },
    description,
    headline,
    Button {
      link,
      text
    }
  },
  aboutSections[] {
    _key,
    button {
      link,
      text
    },
    image {
      _type,
      asset {
        _ref,
        _type
      }
    },
    subtitle,
    title
  },
  cta1Sections[] {
    _key,
    image {
      _type,
      asset {
        _ref,
        _type
      }
    },
    subtitle,
    title
  },
  cta2Sections[] {
    _key,
    image {
      _type,
      asset {
        _ref,
        _type
      }
    },
    subtitle,
    title
  },
  faqSections[] {
    _key,
    title,
    faqs[] {
      _key,
      question,
      answer
    }
  },
  testimonialsSections[] {
    _key,
    title,
    testimonials[] {
      _key,
      author,
      childProgram,
      quote,
      role
    }
  }
}`;

//Settings
export const footerSettingsQuery = `
  *[_type == "settings"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    description,
    footerLogo {
      _type,
      asset {
        _ref,
        _type
      }
    },
       navLogo {
      _type,
      asset {
        _ref,
        _type
      }
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    legalDocuments[] {
      _key,
      _type,
      title,
      slug {
        _type,
        current
      }
    }
  }
`;

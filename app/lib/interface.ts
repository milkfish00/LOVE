import { Key } from "readline";

//home
export interface homeInterface {
  _createdAt: string;
  _id: string;
  _type: "home";
  _updatedAt: string;
  aboutSections: {
    _key: string;
    button: {
      link: string;
      text: string;
    };
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    subtitle: string;
    title: string;
  }[];
  cta1Sections: {
    _key: string;
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    subtitle: string;
    title: string;
    Button: {
      link: string;
      text: string;
    };
  }[];
  cta2Sections: {
    _key: string;
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    subtitle: string;
    title: string;
    Button: {
      link: string;
      text: string;
    };
  }[];
  faqSections: {
    _key: string;
    faqs: {
      _key: string;
      answer: string;
      question: string;
    }[];
    title: string;
  }[];
  heroSections: {
    Button: {
      link: string;
      text: string;
    };
    _key: string;
    backgroundImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    description: string;
    headline: string;
  }[];
  testimonialsSections: {
    _key: string;
    testimonials: {
      _key: string;
      author: string;
      childProgram: string;
      quote: string;
      role: string;
    }[];
    title: string;
    subtitle: string;
    description: string;
  }[];
}

//about
export interface About {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _type: "about";
  _updatedAt: string;
  heroSections: {
    _key: string;
    backgroundImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    description: {
      _key: string;
      _type: "block";
      children: {
        _key: string;
        _type: "span";
        marks: string[];
        text: string;
      }[];
      markDefs: any[];
      style: string;
    }[];
    headline: string;
    subtitle: string;
  }[];
  staffSections: {
    _key: string;
    bio: string;
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    name: string;
    role: string;
  }[];
}

//tuition & enrollment
export interface Tuition {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _type: "tuition";
  _updatedAt: string;
  ctaSection: {
    _key: string;
    button: {
      text: string;
      url: string;
    };
    secondButton: {
      text: string;
      url: string;
    };
    description: string;
    title: string;
  }[];
  description: string;
  enrollmentProcess: {
    _key: string;
    description: string;
    stepNumber: number;
    title: string;
  }[];
  financialAid: {
    _key: string;
    description: string;
    button: {
      text: string;
      url?: string;
    };
    title: string;
  }[];
  title: string;
  tuitionPayments: {
    _key: string;
    button: {
      text: string;
      url?: string;
    };
    description: string;
    title: string;
  }[];
}

//programs
export interface Programs {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _system: {
    base: {
      id: string;
      rev: string;
    };
  };
  _type: "programs";
  _updatedAt: string;
  description: string;
  programSections: {
    _id: Key | null | undefined;
    _key: string;
    ageRange: string;
    classSize: string;
    dailyActivities: {
      _key: string;
      activity: string;
      description: string;
      time: string;
    }[];
    description: any[];
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
        url?: string;
        alt?: string;
      };
    };
    order: number;
    tuitionRates: string;
    programTitle: string;
    schedule: string;
    slug: {
      _type: "slug";
      current: string;
    };
  }[];

  title: string;
}

//resources
export interface Resources {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _type: "resources";
  _updatedAt: string;
  resources: {
    _key: string;
    slug: { _type?: "slug"; current: string };
    type: "guide" | "checklist" | "file";
    description?: string;
    colorPalette?: string;
    tags?: string[];
    content: {
      _key: string;
      _type: "block";
      children: {
        _key: string;
        _type: "span";
        marks: string[];
        text: string;
      }[];
      level: number;
      listItem: string;
      markDefs: any[];
      style: string;
    }[];
    checklistItems?: {
      _key: string;
      item: string;
      details?: string;
    }[];
    downloadPdf: {
      _type: "file";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    title: string;
  }[];
  resourcesHero: {
    _key: string;
    backgroundImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    description: string;
    title: string;
  }[];
}

//gallery
export interface Gallery {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _system: {
    base: {
      id: string;
      rev: string;
    };
  };
  _type: "gallery";
  _updatedAt: string;
  description: string;
  gallery: {
    _key: string;
    image: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    alt?: string;
  }[];
  title: string;
}


//careers
export interface Careers {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _type: "careers";
  _updatedAt: string;
  description: string;
  jobs: {
    _key: string;
    description: {
      _key: string;
      _type: "block";
      children: {
        _key: string;
        _type: "span";
        marks: string[];
        text: string;
      }[];
      level?: number;
      listItem?: "bullet" | "number";
      markDefs: any[];
      style: string;
    }[];
    location: string;
    title: string;
  }[];
  title: string;
}

//contact

export interface Contact {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _system: {
    base: {
      id: string;
      rev: string;
    };
  };
  _type: "contact";
  _updatedAt: string;
  contactInformation: {
    _key: string;
    _type: "contactMethod";
    street?: string;
    subtitle: string;
    title: string;
    type: string;
    address?: string;
    number?: string;
    hours?: string;
  }[];
  description: string;
  title: string;
  ctaSection: {
    _key: string;
    button: {
      text: string;
      url: string;
    };
    description: string;
    title: string;
  }[];
}

//settings
export interface Settings {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _system: {
    base: {
      id: string;
      rev: string;
    };
  };
  _type: "settings";
  _updatedAt: string;
  title: string;
  description: string;
  favicon: {
    _type: "file";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  navLogo: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  footerLogo: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  openGraphImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  seoKeywords: string[];
  socialLinks: {
    _key: string;
    platform: string;
    url: string;
  }[];
  banner: {
    _key: string;
    _type: "banner";
    text: string;
    subtitle: string;
    buttonText: string;
    link: string;
  }[];
  legalDocuments: {
    _key: string;
    _type: "legalDocument";
    title: string;
    slug: {
      _type: "slug";
      current: string;
    };
    content: {
      _key: string;
      _type: "block";
      children: {
        _key: string;
        _type: "span";
        marks: string[];
        text: string;
      }[];
      markDefs: {
        _key?: string;
        _type?: string;
        [key: string]: any;
      }[];
      style: string;
      level?: number;
      listItem?: "bullet" | "number";
    }[];
  }[];
}

// Home page interfaces
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Program {
  id: string;
  title: string;
  link: string;
  description: string;
  image: string;
  color: string;
  textColor: string;
}


//settings 
export interface FooterSettings {
  _createdAt: string;
  _id: string;
  _type: "settings";
  _updatedAt: string;
  description: string;
  footerLogo: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  socialLinks: {
    _key: string;
    platform: string;
    url: string;
  }[];
  legalDocuments: {
    _key: string;
    _type: "legalDocument";
    title: string;
    slug: {
      _type: "slug";
      current: string;
    };
  }[];
}


//settings 
export interface NavSettings {
  _createdAt: string;
  _id: string;
  _type: "settings";
  _updatedAt: string;
  description: string;
  navLogo: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  socialLinks: {
    _key: string;
    platform: string;
    url: string;
  }[];
  legalDocuments: {
    _key: string;
    _type: "legalDocument";
    title: string;
    slug: {
      _type: "slug";
      current: string;
    };
  }[];
}

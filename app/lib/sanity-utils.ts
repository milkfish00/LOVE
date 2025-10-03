import { client } from "@/sanity/lib/client";
import { homeInterface } from "@/app/lib/interface";

// Cache configuration for different types of data
const CACHE_CONFIG = {
  // Static content that rarely changes
  static: {
    revalidate: 3600, // 1 hour
    tags: ['static']
  },
  // Dynamic content that changes more frequently
  dynamic: {
    revalidate: 300, // 5 minutes
    tags: ['dynamic']
  },
  // Real-time content that needs frequent updates
  realtime: {
    revalidate: 60, // 1 minute
    tags: ['realtime']
  }
};

// Enhanced fetch function with caching
export async function fetchWithCache<T>(
  query: string,
  params: Record<string, any> = {},
  cacheType: keyof typeof CACHE_CONFIG = 'dynamic'
): Promise<T> {
  const config = CACHE_CONFIG[cacheType];
  
  return client.fetch(query, params, {
    next: {
      revalidate: config.revalidate,
      tags: config.tags
    }
  });
}

// Specific fetch functions for different content types
export const fetchHomeData = (): Promise<homeInterface> => 
  fetchWithCache('*[_type == "home"][0]', {}, 'dynamic') as Promise<homeInterface>;

export const fetchAboutData = () => 
  fetchWithCache('*[_type == "about"][0]', {}, 'static');

export const fetchProgramsData = () => 
  fetchWithCache('*[_type == "programs"][0]', {}, 'static');

export const fetchContactData = () => 
  fetchWithCache('*[_type == "contact"][0]', {}, 'static');

export const fetchResourcesData = () => 
  fetchWithCache('*[_type == "resources"][0]', {}, 'static');

export const fetchCareersData = () => 
  fetchWithCache('*[_type == "careers"][0]', {}, 'dynamic');

export const fetchGalleryData = () => 
  fetchWithCache('*[_type == "gallery"][0]', {}, 'realtime');

export const fetchSettingsData = () => 
  fetchWithCache('*[_type == "settings"][0]', {}, 'static');

export const fetchTuitionData = () => 
  fetchWithCache('*[_type == "tuition"][0]', {}, 'static');

// Utility to revalidate specific content types
export const revalidateContentType = async (contentType: string) => {
  const { revalidateTag } = await import('next/cache');
  revalidateTag(contentType);
};

// Utility to revalidate all content
export const revalidateAll = async () => {
  const { revalidateTag } = await import('next/cache');
  const tags = ['static', 'dynamic', 'realtime'];
  tags.forEach(tag => revalidateTag(tag));
};

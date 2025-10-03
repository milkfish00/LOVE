'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { myTheme } from "./sanity/lib/theme";
import { Logo } from "./sanity/components/Logo";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
useCdn: false,
  title: "Love and Learning Child Care Center",
  appId: 'uivswvmi15vc4wli077kf7c5', 
  apiVersion: apiVersion,
  theme: myTheme,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  icon: Logo,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          (typeof window === 'undefined'
            ? process.env.NEXT_PUBLIC_SITE_URL
            : window.location.origin) || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

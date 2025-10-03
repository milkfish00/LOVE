import imageUrlBuilder from "@sanity/image-url";
import { client as sanityClient } from "@/sanity/lib/client";
import { projectId, dataset } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });
export function urlFor(source: any) {
  return builder.image(source);
}

export { sanityClient };

import React from 'react'
import DraggableGallery from '@/app/components/ui/GalleryDrag'
import MobilePhotoGallery from '@/app/components/ui/MobileGallery';
import { fetchGalleryData } from '@/app/lib/sanity-utils';
import { urlFor } from '@/app/lib/sanity';
import { Gallery } from '@/app/lib/interface';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse photos from our classrooms and community at Love & Learning.',
};

const page = async () => {
  const data = (await fetchGalleryData()) as Gallery | null;
  const images = (data?.gallery || [])
    .filter((g: any) => g?.image?.asset?._ref)
    .map((g: any) => ({
      src: urlFor(g.image).width(1600).height(1600).fit('max').url(),
      alt: g.alt || 'Gallery image',
    }));

  return (
    <div>
      <div className='hidden md:block'>
        <DraggableGallery images={images} />
      </div>
      <div className='block md:hidden'>
        <MobilePhotoGallery images={images} />
      </div>
    </div>
  );
}

export default page
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

interface Photo {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  isEnlarged: boolean;
  isDragging: boolean;
}

interface DragState {
  isDragging: boolean;
  photoId: string | null;
  offsetX: number;
  offsetY: number;
}

interface DraggableGalleryProps {
  images: { src: string; alt?: string }[];
}

const DraggableGallery: React.FC<DraggableGalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<Photo[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const dragState = useRef<DragState>({
    isDragging: false,
    photoId: null,
    offsetX: 0,
    offsetY: 0,
  });
  const maxZIndex = useRef<number>(10);
  const animationFrameRef = useRef<number>(0);

  // Update container dimensions on resize with debounce
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 100);
    };

    updateDimensions();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Initialize photos from props
  useEffect(() => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0)
      return;

    if (!images || images.length === 0) {
      setPhotos([]);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;
    const radius = isMobile ? 200 : 350;

    const initialPhotos: Photo[] = images.map((item, index) => {
      const photoSize = isMobile ? 200 : 400;

      let x =
        centerX + (Math.random() - 0.5) * radius * 2 - (isMobile ? 100 : 200);
      let y =
        centerY + (Math.random() - 0.5) * radius * 2 - (isMobile ? 100 : 200);

      // Ensure within bounds
      x = Math.max(0, Math.min(x, containerDimensions.width - photoSize));
      y = Math.max(0, Math.min(y, containerDimensions.height - photoSize));

      return {
        id: `photo-${index}`,
        src: item.src,
        alt: item.alt || `Photo ${index + 1}`,
        x,
        y,
        rotation: (Math.random() - 0.5) * 30,
        zIndex: index + 1,
        isEnlarged: false,
        isDragging: false,
      };
    });

    photosRef.current = initialPhotos;
    setPhotos(initialPhotos);
  }, [containerDimensions, images]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, photoId: string) => {
      e.preventDefault();
      const photo = photosRef.current.find((p) => p.id === photoId);
      if (!photo) return;

      maxZIndex.current += 1;

      const updatedPhotos = photosRef.current.map((p) =>
        p.id === photoId
          ? { ...p, zIndex: maxZIndex.current, isDragging: true }
          : p
      );

      photosRef.current = updatedPhotos;
      setPhotos(updatedPhotos);

      dragState.current = {
        isDragging: true,
        photoId,
        offsetX: e.clientX - photo.x,
        offsetY: e.clientY - photo.y,
      };
    },
    []
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, photoId: string) => {
      e.preventDefault();
      const touch = e.touches[0];
      const photo = photosRef.current.find((p) => p.id === photoId);
      if (!photo) return;

      maxZIndex.current += 1;

      const updatedPhotos = photosRef.current.map((p) =>
        p.id === photoId
          ? { ...p, zIndex: maxZIndex.current, isDragging: true }
          : p
      );

      photosRef.current = updatedPhotos;
      setPhotos(updatedPhotos);

      dragState.current = {
        isDragging: true,
        photoId,
        offsetX: touch.clientX - photo.x,
        offsetY: touch.clientY - photo.y,
      };
    },
    []
  );

  const updatePhotoPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragState.current.isDragging || !dragState.current.photoId) return;

      const newX = clientX - dragState.current.offsetX;
      const newY = clientY - dragState.current.offsetY;

      // Update ref immediately for smooth dragging
      photosRef.current = photosRef.current.map((photo) =>
        photo.id === dragState.current.photoId
          ? { ...photo, x: newX, y: newY }
          : photo
      );

      // Batch updates with requestAnimationFrame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setPhotos([...photosRef.current]);
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      updatePhotoPosition(e.clientX, e.clientY);
    },
    [updatePhotoPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      updatePhotoPosition(touch.clientX, touch.clientY);
    },
    [updatePhotoPosition]
  );

  const handleEndDrag = useCallback(() => {
    if (dragState.current.photoId) {
      const updatedPhotos = photosRef.current.map((p) =>
        p.id === dragState.current.photoId ? { ...p, isDragging: false } : p
      );
      photosRef.current = updatedPhotos;
      setPhotos(updatedPhotos);
    }

    dragState.current = {
      isDragging: false,
      photoId: null,
      offsetX: 0,
      offsetY: 0,
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const handlePhotoClick = useCallback((photoId: string) => {
    if (dragState.current.isDragging) return;

    const updatedPhotos = photosRef.current.map((photo) =>
      photo.id === photoId ? { ...photo, isEnlarged: !photo.isEnlarged } : photo
    );

    photosRef.current = updatedPhotos;
    setPhotos(updatedPhotos);
  }, []);

  const shufflePhotos = useCallback(() => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0)
      return;

    const isMobile = window.innerWidth < 768;
    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;
    const radius = isMobile ? 200 : 350;

    const shuffledPhotos = photosRef.current.map((photo) => {
      const photoSize = isMobile ? 200 : 400;

      let x =
        centerX + (Math.random() - 0.5) * radius * 2 - (isMobile ? 100 : 200);
      let y =
        centerY + (Math.random() - 0.5) * radius * 2 - (isMobile ? 100 : 200);

      x = Math.max(0, Math.min(x, containerDimensions.width - photoSize));
      y = Math.max(0, Math.min(y, containerDimensions.height - photoSize));

      return {
        ...photo,
        x,
        y,
        rotation: (Math.random() - 0.5) * 30,
        isEnlarged: false,
      };
    });

    photosRef.current = shuffledPhotos;
    setPhotos(shuffledPhotos);
  }, [containerDimensions]);

  const handleImageError = useCallback((photoId: string) => {
    console.warn(`Failed to load image for photo ${photoId}`);
    const updatedPhotos = photosRef.current.filter(
      (photo) => photo.id !== photoId
    );
    photosRef.current = updatedPhotos;
    setPhotos(updatedPhotos);
  }, []);

  // Clean up animation frame
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-white overflow-hidden relative">
      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-gray-100 text-6xl sm:text-8xl md:text-9xl font-light tracking-widest">
          <img
            src="/navlogo.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-20 md:h-60 w-auto opacity-40"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Decorative Flowers */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-32 md:w-52 opacity-20">
          <img src="/svg/flower3.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-0 left-0 w-40 md:w-60 opacity-20">
          <img src="/svg/flower2.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" />
        </div>
        <div className="absolute -top-2 left-6 w-16 md:w-24 opacity-20">
          <img src="/svg/flower1.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-6 right-10 w-20 md:w-28 opacity-20">
          <img src="/svg/flower5.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" />
        </div>
        <div className="absolute top-1/2 left-10 w-14 md:w-20 opacity-20">
          <img src="/svg/flower4.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" />
        </div>
      </div>

      {/* Shuffle button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={shufflePhotos}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors duration-200"
          disabled={photos.length === 0}>
          Shuffle
        </button>
      </div>

      {/* Photo Gallery */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseUp={handleEndDrag}
        onMouseLeave={handleEndDrag}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEndDrag}
        onTouchCancel={handleEndDrag}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="absolute select-none touch-none transform transition-transform duration-200 ease-out"
            style={{
              left: photo.x,
              top: photo.y,
              transform: `rotate(${photo.rotation}deg) ${
                photo.isEnlarged ? "scale(1.3)" : "scale(1)"
              }`,
              zIndex: photo.zIndex,
              cursor: photo.isDragging ? "grabbing" : "grab",
              transition: photo.isDragging ? "none" : "all 0.2s ease-out",
            }}
            onMouseDown={(e) => handleMouseDown(e, photo.id)}
            onTouchStart={(e) => handleTouchStart(e, photo.id)}
            onClick={() => handlePhotoClick(photo.id)}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={`object-cover rounded-lg pointer-events-none w-48 h-48 sm:w-56 sm:h-56 md:w-96 md:h-96`}
              draggable={false}
              loading="lazy"
              decoding="async"
              onError={() => handleImageError(photo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableGallery;

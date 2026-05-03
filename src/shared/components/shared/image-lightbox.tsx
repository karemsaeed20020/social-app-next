"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface ImageLightboxProps {
  images: string | string[];
  open: boolean;
  onClose: () => void;
  index?: number;
}

export function ImageLightbox({
  images,
  open,
  onClose,
  index = 0,
}: ImageLightboxProps) {
  if (!images || (Array.isArray(images) && images.length === 0)) return null;

  const slides = (Array.isArray(images) ? images : [images]).map((src) => ({
    src,
  }));
  return (
    <Lightbox
      index={index}
      open={open}
      close={onClose}
      slides={slides}
      plugins={[Zoom]}
      controller={{ closeOnBackdropClick: true }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
      }}
      render={{
        buttonPrev: slides.length <= 1 ? () => null : undefined,
        buttonNext: slides.length <= 1 ? () => null : undefined,
      }}
    />
  );
}

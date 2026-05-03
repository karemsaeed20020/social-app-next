"use client";

import { Button, ImageLightbox } from "@/shared";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useRemoveCover, useUpdateCover } from "../hooks";

interface CoverSectionProps {
  name?: string;
  coverUrl?: string;
  readOnly?: boolean;
}

export function CoverSection({
  name,
  coverUrl,
  readOnly = false,
}: CoverSectionProps) {
  const { mutate: updateCover, isPending: isUpdatingCover } = useUpdateCover();
  const { mutate: removeCover, isPending: isRemovingCover } = useRemoveCover();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("pages.profile");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Hook-form integration (optional)
  const formContext = useFormContext();
  const control = formContext?.control;
  const setValue = formContext?.setValue;
  const watch = formContext?.watch;

  const currentCover = (name && watch ? watch(name) : null) || coverUrl;

  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handleCoverChange = (file: File) => {
    if (name && setValue) {
      setValue(name, file, { shouldValidate: true });
    }
    updateCover(file);
  };

  const handleRemoveCover = () => {
    if (name && setValue) {
      setValue(name, null, { shouldValidate: true });
    }
    removeCover();
  };

  const isLoading = isUpdatingCover || isRemovingCover;

  const Content = (
    <>
      <div className="relative h-60 w-full rounded-lg overflow-hidden bg-linear-to-r from-pink-950 to-pink-800 shadow-lg">
        {coverUrl ? (
          <Image
            src={
              typeof currentCover === "string"
                ? currentCover
                : URL.createObjectURL(currentCover as unknown as MediaSource)
            }
            alt="cover"
            width={670}
            height={240}
            className="object-cover hover:brightness-80"
            priority
            onClick={() => setIsLightboxOpen(true)}
          />
        ) : null}

        {!readOnly && (
          <>
            <input
              type="file"
              ref={coverInputRef}
              className="hidden"
              accept=".jpg,.jpeg,.webp"
              onChange={(e) =>
                e.target.files?.[0] && handleCoverChange(e.target.files[0])
              }
            />

            <div className="absolute top-6 right-6 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={isLoading}
                onClick={handleCoverClick}
              >
                {isUpdatingCover ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  <Camera className="size-4" />
                )}
                {currentCover ? t("change_cover") : t("add_cover")}
              </Button>

              {currentCover && (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={isLoading}
                  onClick={handleRemoveCover}
                >
                  {isRemovingCover ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  {t("remove_cover")}
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      {currentCover && (
        <ImageLightbox
          images={currentCover}
          open={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );

  if (name && control) {
    return <Controller name={name} control={control} render={() => Content} />;
  }

  return Content;
}

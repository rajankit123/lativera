import Image from "next/image";
import { photoCredits } from "@/data/photo-credits";

type TravelImageProps = {
  src: string;
  alt: string;
  className?: string;
  preload?: boolean;
  loading?: "eager" | "lazy";
  sizes?: string;
};

export function TravelImage({
  src,
  alt,
  className,
  preload = false,
  loading,
  sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw",
}: TravelImageProps) {
  const credit = photoCredits[src];

  return (
    <>
      <Image
        alt={alt}
        className={className}
        fill
        loading={loading}
        preload={preload}
        sizes={sizes}
        src={src}
      />
      {credit && (
        <span
          className="image-attribution"
          title={`${credit.title} — ${credit.artist}, ${credit.license}`}
        >
          <a href={credit.sourceUrl} rel="noreferrer" target="_blank">
            {credit.title} · {credit.artist}
          </a>{" "}
          ·{" "}
          <a href={credit.licenseUrl} rel="noreferrer" target="_blank">
            {credit.license}
          </a>
        </span>
      )}
    </>
  );
}

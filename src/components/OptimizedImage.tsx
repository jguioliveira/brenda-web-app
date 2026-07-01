import type { ImgHTMLAttributes } from "react";
import { toWebpSrc } from "@/utils/imageSrc";

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export function OptimizedImage({ src, alt = "", ...props }: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={toWebpSrc(src)} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
}

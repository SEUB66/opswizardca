import { useState, type ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
  fallback?: string;
};

/**
 * <img> that swaps to a fallback once (and only once) on error, so a missing
 * asset never leaves a broken-image icon in the layout.
 */
export function SafeImage({ src, fallback = "/img/wizardops-mark.webp", alt = "", ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  const resolved = !src || failed ? fallback : src;
  return <img src={resolved} alt={alt} onError={() => setFailed(true)} {...rest} />;
}

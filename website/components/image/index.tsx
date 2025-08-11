import NextImage from "next/image";

interface ImageProps {
  variant: string;
}

export function Image(props: ImageProps) {
  const { variant } = props;

  return (
    <NextImage
      fill
      unoptimized
      loading="eager"
      src={`/images/${variant}.jpg`}
      alt={`Image of ${variant} example`}
      style={{ pointerEvents: "none", objectFit: "cover" }}
    />
  );
}

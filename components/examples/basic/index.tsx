"use client";

import NextImage from "next/image";
import type React from "react";
import * as Cambio from "@/components/cambio";
import styles from "./styles.module.css";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Basic(props: ImageProps) {
  const {
    src = "https://cdn.cosmos.so/a567baf1-c791-4d9e-8e3e-35db6f41d9b2?format=jpeg",
    alt = "",
  } = props;

  return (
    <Cambio.Root>
      <Cambio.Trigger className={styles.trigger}>
        <NextImage
          src={src}
          alt={alt}
          unoptimized
          fill
          style={{ objectFit: "cover" }}
        />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <NextImage
            src={src}
            alt={alt}
            unoptimized
            fill
            style={{ objectFit: "cover" }}
          />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

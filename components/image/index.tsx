"use client";

import NextImage from "next/image";
import React from "react";
import * as Cambio from "@/components/cambio";
import styles from "./styles.module.css";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export function Image(props: ImageProps) {
  const { src = "", alt = "" } = props;

  return (
    <React.Fragment>
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
      <span data-cambio-caption>{alt}</span>
    </React.Fragment>
  );
}

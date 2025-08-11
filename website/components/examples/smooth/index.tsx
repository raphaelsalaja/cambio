"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Smooth() {
  return (
    <Cambio.Root motion="smooth">
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="smooth" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="smooth" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

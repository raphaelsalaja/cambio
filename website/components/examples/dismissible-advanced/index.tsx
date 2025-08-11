"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function DismissableAdvanced() {
  return (
    <Cambio.Root dismissible={{ threshold: 80, velocity: 400 }}>
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="dismissible-advanced" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="dismissible-advanced" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

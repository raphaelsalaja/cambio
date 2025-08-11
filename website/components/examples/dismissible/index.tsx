"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Dismissible() {
  return (
    <Cambio.Root dismissible>
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="dismissible" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="dismissible" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

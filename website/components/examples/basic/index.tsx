"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Basic() {
  return (
    <Cambio.Root dismissible motion="bouncy">
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="basic" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="basic" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Bouncy() {
  return (
    <Cambio.Root motion="bouncy">
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="bouncy" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="bouncy" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

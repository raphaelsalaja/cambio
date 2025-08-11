"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Reduced() {
  return (
    <Cambio.Root reduceMotion={true}>
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="reduced" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="reduced" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

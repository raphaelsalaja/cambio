"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Snappy() {
  return (
    <Cambio.Root motion="snappy">
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="snappy" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="snappy" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

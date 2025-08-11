"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Variants() {
  return (
    <Cambio.Root
      motion={{ trigger: "snappy", popup: "bouncy", backdrop: "smooth" }}
    >
      <Cambio.Trigger className={styles.trigger}>
        <Image variant="variants" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image variant="variants" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

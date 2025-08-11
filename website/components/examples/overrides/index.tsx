"use client";

import { Cambio } from "cambio";
import { Image } from "@/components/image";

import styles from "../styles.module.css";

export function Overrides() {
  return (
    <Cambio.Root motion="smooth">
      <Cambio.Trigger motion="snappy" className={styles.trigger}>
        <Image variant="overrides" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop motion="reduced" />
        <Cambio.Popup motion="bouncy">
          <Image variant="overrides" />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

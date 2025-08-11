"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "../styles.module.css";

export function Dismissable() {
  return (
    <Cambio.Root dismissable motion="bouncy">
      <Cambio.Trigger className={styles.trigger}>
        <Image
          fill
          unoptimized
          loading="eager"
          alt={"Dismissable Example"}
          className={styles.image}
          src={"/dismissable.jpg"}
        />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image
            fill
            unoptimized
            loading="eager"
            alt={"Dismissable Example"}
            className={styles.image}
            src={"/dismissable.jpg"}
          />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

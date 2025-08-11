"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "../styles.module.css";

export function Bouncy() {
  return (
    <Cambio.Root motionPreset="bouncy">
      <Cambio.Trigger className={styles.trigger}>
        <Image
          fill
          unoptimized
          loading="eager"
          alt={"Bouncy Motion Example"}
          className={styles.image}
          src={"/basic.jpg"}
        />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup className={styles.popup}>
          <Image
            fill
            unoptimized
            loading="eager"
            alt={"Bouncy Motion Example"}
            className={styles.image}
            src={"/basic.jpg"}
          />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

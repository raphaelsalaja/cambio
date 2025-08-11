"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "./styles.module.css";

export function Basic() {
  return (
    <Cambio.Root>
      <Cambio.Trigger className={styles.trigger}>
        <Image
          fill
          unoptimized
          loading="eager"
          alt={"Basic Example"}
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
            alt={"Basic Example"}
            className={styles.image}
            src={"/basic.jpg"}
          />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

export function Dismissable() {
  return (
    <Cambio.Root>
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
        <Cambio.Popup dismissable className={styles.popup}>
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

export function ReducedMotion() {
  return (
    <Cambio.Root reduceMotion={true}>
      <Cambio.Trigger className={styles.trigger}>
        <Image
          fill
          unoptimized
          loading="eager"
          alt={"Reduced Motion Example"}
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
            alt={"Reduced Motion Example"}
            className={styles.image}
            src={"/basic.jpg"}
          />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

export const Examples = {
  Basic,
  Dismissable,
  ReducedMotion,
};

"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "../styles.module.css";

export function Variants() {
  return (
    <div className={styles.container}>
      <Cambio.Root
        motion={{
          trigger: "snappy",
          popup: "bouncy",
          backdrop: "smooth",
        }}
      >
        <Cambio.Trigger className={styles.trigger}>
          <Image
            src="/basic.jpg"
            alt="A placeholder image"
            width={120}
            height={120}
            className={styles.image}
          />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <div className={styles.content}>
              <Image
                src="/basic.jpg"
                alt="A placeholder image"
                width={400}
                height={400}
                className={styles.image}
              />
              <div className={styles.description}>
                <h3>Motion Variants Example</h3>
                <p>
                  This example uses different motion presets for each component:
                  <br />• Trigger: snappy (fast ease-out)
                  <br />• Popup: bouncy (spring with overshoot)
                  <br />• Backdrop: smooth (balanced ease-in-out)
                </p>
                <Cambio.Close className={styles.close}>Close</Cambio.Close>
              </div>
            </div>
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </div>
  );
}

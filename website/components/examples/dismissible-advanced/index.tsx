"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "../styles.module.css";

export function DismissableAdvanced() {
  return (
    <div className={styles.container}>
      <Cambio.Root
        dismissible={{
          threshold: 80, // Lower threshold - easier to dismiss
          velocity: 400, // Lower velocity - easier to dismiss
        }}
      >
        <Cambio.Trigger className={styles.trigger}>
          <Image
            src="/dismissible.jpg"
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
                src="/dismissible.jpg"
                alt="A placeholder image"
                width={400}
                height={400}
                className={styles.image}
              />
              <div className={styles.description}>
                <h3>Advanced Dismissible</h3>
                <p>
                  This popup has custom dismissal settings:
                  <br />• Lower distance threshold (80px vs 100px default)
                  <br />• Lower velocity threshold (400px/s vs 500px/s default)
                  <br />
                  This makes it easier to dismiss with gentle swipes.
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

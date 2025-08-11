"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "../styles.module.css";

export function Overrides() {
  return (
    <div className={styles.container}>
      <Cambio.Root motion="smooth">
        <Cambio.Trigger motion="snappy" className={styles.trigger}>
          <Image
            src="/basic.jpg"
            alt="A placeholder image"
            width={120}
            height={120}
            className={styles.image}
          />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop motion="reduced" className={styles.backdrop} />
          <Cambio.Popup motion="bouncy" className={styles.popup}>
            <div className={styles.content}>
              <Image
                src="/basic.jpg"
                alt="A placeholder image"
                width={400}
                height={400}
                className={styles.image}
              />
              <div className={styles.description}>
                <h3>Component Override Example</h3>
                <p>
                  Global motion is "smooth", but each component overrides:
                  <br />• Trigger: overridden to "snappy"
                  <br />• Popup: overridden to "bouncy"
                  <br />• Backdrop: overridden to "reduced"
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

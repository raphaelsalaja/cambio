"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import styles from "./styles.module.css";

export function Basic() {
  const blurDataURL =
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAQME/8QAFhABAQEAAAAAAAAAAAAAAAAAACIB/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEv/aAAwDAQACEQMRAD8AzyJTwDKtP//Z";

  return (
    <Cambio.Root>
      <Cambio.Trigger className={styles.trigger}>
        <Image
          src={"/media/basic.jpg"}
          alt={"Basic Example"}
          fill
          style={{
            objectFit: "cover",
            pointerEvents: "none",
          }}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className={styles.backdrop} />
        <Cambio.Popup dismissable className={styles.popup}>
          <Image
            src={"/media/basic.jpg"}
            alt={"Basic Example"}
            fill
            style={{
              pointerEvents: "none",
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

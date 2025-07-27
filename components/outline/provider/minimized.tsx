import { AnimatePresence, motion } from "motion/react";
import type { HeadingLink } from "../types";
import { defaultTransition } from "../utils";
import styles from "./styles.module.css";

interface Props {
  headingLinks: HeadingLink[];
  contentIsActive: (id: string) => boolean;
  isHovered: boolean;
}

export const MinimizedOutline = ({
  headingLinks,
  contentIsActive,
  isHovered,
}: Props) => (
  <motion.div
    style={{
      transformOrigin: "left center",
      zIndex: 1,
      y: "-50%",
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: isHovered ? 0 : 1,
      scale: isHovered ? 1 : 0.8,
      transition: { ...defaultTransition },
    }}
    className={styles.minimized}
  >
    <AnimatePresence initial={false}>
      <motion.div className={styles.list}>
        {headingLinks.map((link) => (
          <motion.div
            key={link.id}
            data-selector={`#${link.tagName}`}
            data-active={contentIsActive(link.id) ? "true" : "false"}
            className={styles.line}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  </motion.div>
);

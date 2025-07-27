// components/Outline/ExpandedOutline.tsx

import { AnimatePresence, motion } from "motion/react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import type { HeadingLink } from "../types";
import { defaultTransition, getScale } from "../utils";
import styles from "./styles.module.css";

interface Props {
  headingLinks: HeadingLink[];
  contentIsActive: (id: string) => boolean;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

export const ExpandedOutline = ({
  headingLinks,
  contentIsActive,
  isHovered,
  onHoverChange,
}: Props) => {
  const { handleLinkClick } = useSmoothScroll(120);

  return (
    <motion.div
      style={{
        transformOrigin: "left center",
        zIndex: 2,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        y: "-50%",
        x: isHovered ? 0 : -16,
        scale: isHovered ? 1 : getScale(headingLinks.length),
        opacity: isHovered ? 1 : 0,
        transition: { ...defaultTransition },
      }}
      className={styles.expanded}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div className={styles.list}>
          {headingLinks.map((link) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              data-selector={`#${link.tagName}`}
              data-active={contentIsActive(link.id) ? "true" : "false"}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={styles.link}
            >
              {link.title}
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

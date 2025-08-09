"use client";

import { Menu as BaseMenu } from "@base-ui-components/react/menu";

import {
  AnimatePresence,
  type MotionNodeAnimationOptions,
  motion,
} from "motion/react";
import { useState } from "react";
import { Check, Dots } from "../icons";
import styles from "./styles.module.css";

const query = `Read https://cambio.raphaelsalaja.com/llms.txt. I want to ask questions about it.`;

interface MenuProps {
  content: string;
}

export function Menu({ content }: MenuProps) {
  const [copied, setCopied] = useState(false);

  const animation: MotionNodeAnimationOptions = {
    initial: { opacity: 0, filter: "blur(4px)", scale: 0.5 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(4px)", scale: 0.5 },
    transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
  };

  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger className={styles.trigger} disabled={copied}>
        <AnimatePresence initial={false} mode="popLayout">
          {copied ? (
            <motion.div key="check" {...animation}>
              <Check size={24} />
            </motion.div>
          ) : (
            <motion.div key="dots" {...animation}>
              <Dots size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className={styles.positioner}
          align="end"
          sideOffset={8}
        >
          <BaseMenu.Popup className={styles.popup}>
            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/raphaelsalaja/cambio"
                >
                  Github
                </a>
              }
            />
            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/raphaelsalaja"
                >
                  Twitter
                </a>
              }
            />
            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.npmjs.com/package/cambio"
                >
                  NPM
                </a>
              }
            />
            <BaseMenu.Separator className={styles.separator} />
            <BaseMenu.Item
              className={styles.item}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(content);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch (err) {
                  console.error("Failed to copy content:", err);
                }
              }}
            >
              Copy Markdown
            </BaseMenu.Item>
            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cambio.raphaelsalaja.com/llms.txt"
                >
                  View as Markdown
                </a>
              }
            />
            <BaseMenu.Separator className={styles.separator} />

            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://chatgpt.com/?hints=search&q=${encodeURIComponent(query)}`}
                >
                  Open in ChatGPT
                </a>
              }
            />
            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://claude.ai/new?q=${encodeURIComponent(query)}`}
                >
                  Open in Claude
                </a>
              }
            />
            <BaseMenu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://t3.chat/new?q=${encodeURIComponent(query)}`}
                >
                  Open in T3 Chat
                </a>
              }
            />
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

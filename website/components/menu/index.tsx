"use client";

import { Menu } from "@base-ui-components/react/menu";

import {
  AnimatePresence,
  type MotionNodeAnimationOptions,
  motion,
} from "motion/react";
import { useState } from "react";
import { Check, Dots } from "../icons";
import styles from "./styles.module.css";

const query = `Read https://cambio.raphaelsalaja.com/, I want to ask questions about it.`;

interface CopyButtonProps {
  content: string;
}

export function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const animation: MotionNodeAnimationOptions = {
    initial: { opacity: 0, filter: "blur(4px)", scale: 0.5 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(4px)", scale: 0.5 },
    transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
  };

  return (
    <Menu.Root>
      <Menu.Trigger className={styles.trigger} disabled={copied}>
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
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className={styles.positioner}
          align="end"
          sideOffset={8}
        >
          <Menu.Popup className={styles.popup}>
            <Menu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/raphaelsalaja"
                >
                  Github
                </a>
              }
            />
            <Menu.Item
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
            <Menu.Item
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
            <Menu.Separator className={styles.separator} />
            <Menu.Item
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
            </Menu.Item>
            <Menu.Item
              className={styles.item}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://raw.githubusercontent.com/raphaelsalaja/cambio/refs/heads/main/website/content/documentation.mdx"
                >
                  View as Markdown
                </a>
              }
            />
            <Menu.Separator className={styles.separator} />

            <Menu.Item
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
            <Menu.Item
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
            <Menu.Item
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
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

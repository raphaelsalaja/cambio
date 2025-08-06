import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import styles from "./styles.module.css";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: Array<Tab>;
}

export function Tabs({
  items = [
    {
      title: "npm",
      content: "npm add cambio",
    },
    {
      title: "pnpm",
      content: "pnpm add cambio",
    },
    {
      title: "yarn",
      content: "yarn add cambio",
    },
    {
      title: "bun",
      content: "bun add cambio",
    },
  ],
}: TabsProps) {
  return (
    <BaseTabs.Root className={styles.Tabs} defaultValue={items[0].title}>
      <BaseTabs.List className={styles.List}>
        {items.map((item) => (
          <BaseTabs.Tab
            className={styles.Tab}
            value={item.title}
            key={item.title}
          >
            {item.title}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator className={styles.Indicator} />
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel
          className={styles.Panel}
          value={item.title}
          key={item.title}
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}

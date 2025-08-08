# Cambio

Cambio simplifies shared animations in React by removing the complexity that many developers face when setting up these interactions. By eliminating boilerplate code, it streamlines both implementation and maintenance workflows.

Built on [Base UI's](https://base-ui.com/) accessible primitives and [Motion's](https://motion.dev/) powerful animation library, Cambio ensures your animations are both performant and inclusive by default.

# Installation

```bash
pnpm add cambio
```

# Usage

It can be used anywhere in your application as follows.

```tsx
"use client";

import { Cambio } from "cambio";

export default function Example() {
  return (
    <Cambio.Root>
      <Cambio.Trigger>{/* Your Content */}</Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop />
        <Cambio.Popup>{/* Your Content*/}</Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}
```

# Motion

Cambio leverages the power of [Motion](https://motion.dev/) to provide a seamless animation experience.
For example you can easily add your own transitions by passing a `transition` prop to any of the components.

This saves having to create a `<motion.div/>` for each component.

```tsx lineNumbers
<Cambio.Popup transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>
  {/* Your Content */}
</Cambio.Popup>
```

# Support

For any issues or feature requests, please open an issue on [GitHub](https://github.com/raphaelsalaja/cambio).

You can also reach out to me on [Twitter](https://x.com/raphaelsalaja).

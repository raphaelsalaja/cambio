---
"cambio": patch
---

Refactor component architecture for better maintainability

- Split monolithic component structure into individual component files
- Added dedicated components: `Backdrop`, `Close`, `Description`, `Portal`, `Root`, `Title`, and `Trigger`
- Created centralized context and types modules
- Enhanced `Popup` component with drag-and-dismiss functionality
- Improved code organization and modularity for easier development and maintenance

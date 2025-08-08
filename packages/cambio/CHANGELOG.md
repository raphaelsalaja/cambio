# Cambio

## 1.0.5

### Patch Changes

- **CI/CD Infrastructure**: Added automated publishing workflow
  - Implemented GitHub Actions workflow for automated package publishing
  - Workflow triggers on version tag pushes for streamlined releases
  - Automated steps include building, testing, and publishing to npm
  - Improved developer workflow with CI/CD automation

- **Project maintenance**: Repository cleanup and licensing
  - Added MIT License for clear legal framework
  - Cleaned up website configuration by removing unused frontmatter properties
  - Optimized media assets and documentation structure
  - Better project organization and maintainability

## 1.0.4

### Patch Changes

- **Backdrop improvements**: Enhanced backdrop animation timing and visual improvements
  - Improved backdrop transition timing with longer duration (0.6s) and delay (0.2s) for smoother animations
  - Updated backdrop opacity in examples for better visual contrast (20% → 40%)
  - Better easing curve for more natural backdrop animations

- **Responsive design enhancements**: Added viewport configuration for improved mobile experience
  - Added responsive viewport meta configuration in website layout
  - Improved backdrop positioning and dimensions for mobile devices
  - Better support for dynamic viewport units (100dvh, 100dvw)

## 1.0.3

### Patch Changes

- **Documentation improvements**: Enhanced README with dismissable popup feature
  - Added comprehensive documentation for drag-to-dismiss functionality
  - Included visual examples of dismissable popup behavior
  - Updated documentation website with improved content structure

## 1.0.2

### Patch Changes

- **Version bump**: Stability improvements and package updates

## 1.0.1

### Patch Changes

- **Initial post-release fixes**: Package distribution improvements

## 1.0.0

### Major Changes

- **🎉 Stable Release**: Cambio v1.0.0 - Production Ready
  - Complete React component library for shared layout animations
  - Built on Base UI's accessible primitives and Motion's animation library
  - Full TypeScript support with comprehensive type definitions
  - Modular component architecture for maximum flexibility

### Key Features

- **Component Architecture**: Complete modular design with 8 core components
  - `Cambio.Root`: Context provider and state management
  - `Cambio.Trigger`: Interactive trigger element with layout animations
  - `Cambio.Portal`: Portal rendering for overlay content
  - `Cambio.Backdrop`: Animated backdrop with customizable transitions
  - `Cambio.Popup`: Main content container with shared layout animations
  - `Cambio.Title`: Accessible title component
  - `Cambio.Description`: Accessible description component
  - `Cambio.Close`: Close button with built-in dismiss functionality

- **Animation System**: Powered by Motion for smooth, performant animations
  - Shared layout animations between trigger and popup
  - Customizable spring transitions with sensible defaults
  - Smooth backdrop fade animations with easing curves
  - Support for custom transition configurations

- **Accessibility**: Built on Base UI for WCAG compliance
  - Proper ARIA attributes and semantic HTML
  - Keyboard navigation support
  - Screen reader compatibility
  - Focus management and restoration

- **Drag-to-Dismiss**: Advanced interaction feature
  - Optional drag-to-dismiss functionality for popup content
  - Configurable threshold and velocity parameters
  - Smooth drag animations with elastic constraints
  - Touch-friendly mobile experience

### Technical Improvements

- **Modern React**: Built for React 19+ with latest patterns
  - Client-side rendering optimization
  - Proper ref forwarding throughout component tree
  - Memo optimization for performance
  - Context-based state management

- **TypeScript**: Full type safety and developer experience
  - Comprehensive type definitions for all components
  - Proper Motion integration types
  - Base UI component type extensions
  - IntelliSense support for all props

- **Build System**: Optimized for modern bundlers
  - ESM and CommonJS dual package exports
  - Individual component exports for tree-shaking
  - Proper TypeScript declaration files
  - Bunchee-powered build pipeline

- **Package Configuration**: Production-ready distribution
  - Comprehensive package.json exports map
  - Individual component import paths
  - Proper engine requirements (Node 18+)
  - Extensive keywords for discoverability

### Development Experience

- **Documentation**: Comprehensive guides and examples
  - Complete README with usage examples
  - Motion integration patterns
  - Accessibility guidelines
  - TypeScript usage examples

- **Examples**: Real-world usage demonstrations
  - Basic dialog implementation
  - Dismissable popup with drag interactions
  - Motion transition customization
  - Responsive design patterns

### Breaking Changes

- Initial stable API - no breaking changes from beta versions
- Requires React 18+ and Node 18+ for modern feature support
- Base UI components dependency for accessibility features

## 1.0.0-beta.4

### Patch Changes

- **Branding and visual identity**: Final polish for stable release

## 1.0.0-beta.3

### Patch Changes

- **Complete architecture refactor**: Major structural improvements
  - Separated concerns into individual component modules
  - Improved maintainability and code organization
  - Better performance through component memoization

## 1.0.0-beta.2

### Minor Changes

- **Documentation enhancements**: Improved developer experience

### Patch Changes

- **Component architecture overhaul**: Modular design implementation
  - Split monolithic structure into dedicated component files
  - Enhanced component separation for better tree-shaking
  - Centralized context and type management
  - Improved popup component with advanced drag functionality

## 1.0.0-beta.1

### Major Changes

- **Beta release preparation**: Feature-complete beta version

### Patch Changes

- **Comprehensive documentation**: Production-ready documentation
  - Detailed installation and usage instructions
  - Motion integration examples and best practices
  - SEO-optimized package keywords for npm discoverability
  - Community support channels and contribution guidelines

## 0.1.0-beta.0

### Minor Changes

- **Initial beta release**: First public version
  - Core component functionality
  - Basic animation system
  - TypeScript support foundation

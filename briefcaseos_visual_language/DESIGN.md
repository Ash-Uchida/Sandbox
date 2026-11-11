---
name: BriefcaseOS Visual Language
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#005022'
  on-tertiary: '#ffffff'
  tertiary-container: '#006b2f'
  on-tertiary-container: '#88ea9a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#95f8a7'
  tertiary-fixed-dim: '#79db8d'
  on-tertiary-fixed: '#00210a'
  on-tertiary-fixed-variant: '#005323'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar-width: 260px
  container-max: 1440px
  gutter: 20px
---

## Brand & Style

The design system is engineered for corporate transactional law, where precision, authority, and information density are paramount. The brand personality is **distinguished, meticulous, and resilient**, moving away from "bubbly" tech aesthetics in favor of a sophisticated, document-centric interface.

The design style is **Modern Corporate Minimalism** with a focus on functional utility. It utilizes a structured "Paper & Ink" philosophy—where the digital canvas mimics the clarity of a high-end legal brief while leveraging the power of AI through subtle motion and depth. The aesthetic response should be one of absolute reliability and clarity, ensuring that the AI assistance feels like a senior associate's work: present but never intrusive.

## Colors

The palette is anchored by **#F7F9FC (Off-White)** to reduce eye strain during long hours of document review. 

- **Primary (Cobalt Blue):** Reserved strictly for primary actions and interactive states. It signals intent and movement.
- **Secondary (Deep Slate/Navy):** Used for structural navigation (Sidebars) and high-contrast headers to ground the interface and provide a sense of "The Law."
- **Status (Emerald Green):** Dedicated to compliance indicators, verified clauses, and successful AI executions.
- **Neutrals (Slate Grays):** Used for metadata, borders, and secondary text to maintain a strict visual hierarchy.
- **Ink (Charcoal):** All primary body text uses #333333 for maximum legibility against the off-white background.

## Typography

This design system uses a tri-font strategy to balance authority with technical precision:
1. **Hanken Grotesk (Headlines):** A sharp, contemporary grotesque that provides a professional "firm" look.
2. **Inter (Body):** Selected for its exceptional legibility in data-dense environments and legal text.
3. **JetBrains Mono (Metadata/Technical):** Used sparingly for document ID numbers, clause references, and AI-suggested code/logic to differentiate "System Data" from "Legal Content."

Typography follows a strict scale. Line heights are slightly increased for body text to improve the readability of long-form legal clauses.

## Layout & Spacing

The layout utilizes a **4px baseline grid** to ensure mathematical precision in all margins and paddings. 

- **Grid:** A 12-column fluid grid for the main content area, with a fixed 260px sidebar for primary navigation.
- **Density:** High Information Density. Padding in data tables and lists should lean towards the `sm` (8px) and `md` (16px) tokens to maximize the amount of visible text without sacrificing clarity.
- **Reflow:** On desktop, the document view remains centered or pinned to the left, with an "AI Inspector" panel appearing on the right. For mobile/tablet, the sidebar collapses into a drawer, and the Inspector panels stack beneath the primary content.

## Elevation & Depth

To maintain a "Professional/Legal" aesthetic, this design system avoids heavy shadows. Depth is conveyed through:

1. **Tonal Layering:** The primary background is #F7F9FC. White (#FFFFFF) is used for cards or "active sheets" to make them appear slightly elevated.
2. **Low-Contrast Outlines:** Instead of shadows, 1px borders in #E2E8F0 are used to define boundaries.
3. **Subtle Elevation:** Only the "Primary Action" components (e.g., the active AI suggestion or a modal) use a soft, 10% opacity Deep Slate shadow with a 4px blur to indicate focus.
4. **Sidebar Depth:** The sidebar uses the Deep Slate background (#1E293B) to create a distinct structural verticality, acting as the foundation for the entire application.

## Shapes

The design system utilizes **Soft (0.25rem)** roundedness. This subtle rounding prevents the interface from feeling "sharp" or "aggressive" while maintaining the rigid, professional structure expected in legal software. 

- **Inputs & Small Buttons:** 4px (0.25rem) radius.
- **Cards & Modals:** 8px (0.5rem) radius.
- **Avatars/Status Dots:** Circle/Pill-shaped (for clear distinction from functional containers).

## Components

### Buttons
- **Primary:** Cobalt Blue background, White text. No gradient. 4px border radius.
- **Secondary:** Transparent background, 1px Slate Gray border, Charcoal text.
- **Ghost:** No border, Slate Gray text. Used for low-priority actions in document headers.

### Input Fields
- **Standard:** White background, 1px #E2E8F0 border. On focus, the border changes to Cobalt Blue with a 1px inner shadow.
- **Legal Text Entry:** Uses Inter font, size 14px, with a more generous line-height (1.6) to mimic document editors.

### Cards & Sheets
- Cards are used to encapsulate AI "Insights" or "Clause Analyses." They feature a White background and a 1px border. A 4px vertical accent bar on the left indicates the "status" (e.g., Green for compliant, Blue for info).

### Chips/Badges
- Small, rectangular with 2px radius. Light-tinted backgrounds of the status color (e.g., Light Green background with Deep Emerald text).

### Lists & Tables
- Data-heavy tables use #F7F9FC for header rows and alternating subtle row tints to assist horizontal eye tracking. Cell padding is strictly 12px (3 units) for high density.

### AI Assistant (The Cursor)
- A distinct cobalt-to-emerald gradient "active cursor" or focus ring is used when the AI is processing a specific line of text, providing a visual bridge between the attorney's focus and the software's intelligence.
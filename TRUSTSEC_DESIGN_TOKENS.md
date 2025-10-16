# TrustSec Design Tokens

This document outlines the design tokens extracted from the TrustSec Figma design system and integrated into the Tailwind CSS configuration.

## Brand Colors

### Primary Brand Colors
These are the core TrustSec brand colors extracted from your Figma design:

| Color Variable | Hex Value | Usage | Tailwind Class |
|---------------|-----------|-------|----------------|
| `--trustsec-1` | `#080056` | Deep Navy Blue - Primary Brand | `bg-trustsec-1`, `text-trustsec-1` |
| `--trustsec-2` | `#114ef6` | Bright Blue - Secondary Brand | `bg-trustsec-2`, `text-trustsec-2` |
| `--trustsec-3` | `#01d5e1` | Cyan/Turquoise - Accent | `bg-trustsec-3`, `text-trustsec-3` |

## Usage Examples

### In React/Next.js Components

```tsx
// Primary button with TrustSec blue
<button className="bg-trustsec-2 text-white hover:bg-trustsec-1 px-6 py-3 rounded-lg">
  Get Started
</button>

// Accent border with cyan
<div className="border-2 border-trustsec-3 rounded-lg p-4">
  Featured Content
</div>

// Navy background with white text
<section className="bg-trustsec-1 text-white py-20">
  <h1 className="text-4xl font-black uppercase">Learn Fast. Stay Secure.</h1>
</section>

// Using CSS variables directly
<div style={{ 
  backgroundColor: 'var(--trustsec-2)',
  borderColor: 'var(--trustsec-3)'
}}>
  Custom Styled Content
</div>
```

### Color System Integration

The TrustSec colors are now integrated into the semantic color system:

- **Primary**: Uses `--trustsec-1` (Navy) for primary actions and text
- **Secondary**: Uses `--trustsec-2` (Blue) for secondary actions
- **Accent**: Uses `--trustsec-3` (Cyan) for highlights and borders
- **Ring/Focus**: Uses `--trustsec-3` (Cyan) for focus indicators

## Typography

Based on the Figma design, the following fonts are used:

- **Primary Font**: Montserrat (Black, Bold, Medium, Regular)
- **Fallback**: Inter (used in components)

### Font Weights in Figma
- Black: 900 (Headlines)
- Bold: 700 (Subheadings)
- Semi Bold: 600 (Strong text)
- Medium: 500 (Buttons)
- Regular: 400 (Body text)

## Border Radius

From the Figma design:
- Small: `10px` - `28px` for various elements
- Medium: Varies by component
- Large: `26px` - `79px` for cards and sections

Current Tailwind values:
- `--radius`: `0.625rem` (10px)
- `--radius-sm`: `6px`
- `--radius-md`: `8px`
- `--radius-lg`: `10px`
- `--radius-xl`: `14px`

## Dark Mode

Dark mode automatically uses the TrustSec navy (`#080056`) as the background with cyan (`#01d5e1`) accents.

```tsx
// Automatically adapts to dark mode
<div className="bg-background text-foreground">
  Content that works in both light and dark mode
</div>
```

## Component Examples from Figma

### Buttons
- Primary: Navy background with white text
- Secondary: White background with navy text and cyan border
- Icon buttons: Blue circular background

### Cards
- Glassmorphism effect with `backdrop-blur` and transparent backgrounds
- Cyan borders (`border-trustsec-3`)
- Navy overlay on images

### Gradients
```css
/* Hero gradient (from Figma) */
background: linear-gradient(90deg, #080056 0%, #114ef6 100%);

/* Footer gradient */
background: linear-gradient(to right, #080056, #114ef6);
```

## Accessibility Notes

- Navy (`#080056`) on white passes WCAG AAA for normal text
- White on Navy passes WCAG AAA
- Cyan (`#01d5e1`) should be used for borders/accents, not body text (contrast ratio with white is insufficient)
- Blue (`#114ef6`) on white passes WCAG AA for large text only

## Next Steps

1. ✅ Design tokens extracted and integrated
2. 🔲 Create reusable button components with TrustSec colors
3. 🔲 Build card components with glassmorphism effects
4. 🔲 Implement gradient backgrounds
5. 🔲 Add Montserrat font to the project
6. 🔲 Create themed components library

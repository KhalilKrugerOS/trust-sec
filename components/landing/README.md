# TrustSec Landing Page

This directory contains all the components for the TrustSec landing page, designed based on the Figma design specifications.

## Components

### Hero.tsx
The hero section featuring:
- Gradient background with TrustSec brand colors
- Social media icons (Instagram, WhatsApp, Facebook)
- "Courses" navigation button
- Main headline: "Learn Fast. Stay Secure."
- Three feature cards:
  - Team TrustSec introduction
  - Refer a Friend
  - Download App (positioned absolutely)

### WhoAreWe.tsx
"Who are we?" section with two cards:
- **Certified Training** - Left card with dark gradient background
- **Why Choose Us** - Right card with image overlay

Both cards include "See more" buttons with animated icons.

### Packs.tsx
"How can I start?" section featuring two pricing cards:
- **Initiation Pack** - Blue gradient (Best Seller)
- **Professional Pack** - Cyan gradient (Best Seller)

Each card includes:
- Best Seller badge
- Pack name
- Group Training label
- Pricing information (monthly/yearly)
- Action button with animated icon

### Newsletter.tsx
Newsletter subscription section with:
- TrustSec logo
- "Get weekly updates" heading
- Email input field with search icon
- Subscribe button
- Gradient background matching brand colors

### Footer.tsx
Footer section with four columns:
- **Logo & Social Media** - Brand logo and social icons (X, Instagram, YouTube, LinkedIn)
- **Support** - Location, email, phone contact
- **About Us** - Navigation links (History, Community, Contact)
- **Services** - Service links (Courses, Certificates)

Includes copyright notice at the bottom.

## Design System

### Colors
- Primary: `#080056` (Deep Navy)
- Secondary: `#114ef6` (Bright Blue)
- Accent: `#01d5e1` (Cyan/Turquoise)

### Typography
- Font Family: Montserrat
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 900 (Black)

### Effects
- Backdrop blur for glassmorphism effects
- Gradient backgrounds
- Hover transitions on buttons and links
- Border accents with cyan color

## Usage

Import components individually:
```tsx
import Hero from "@/components/landing/Hero";
import WhoAreWe from "@/components/landing/WhoAreWe";
import Packs from "@/components/landing/Packs";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";
```

Or import all at once:
```tsx
import { Hero, WhoAreWe, Packs, Newsletter, Footer } from "@/components/landing";
```

## Responsive Design
All components are fully responsive with:
- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg)
- Flexible grid layouts
- Adaptive typography sizes

## Accessibility
- Semantic HTML elements
- Proper heading hierarchy
- ARIA labels for icon-only buttons
- Focus states for interactive elements
- Color contrast meeting WCAG standards

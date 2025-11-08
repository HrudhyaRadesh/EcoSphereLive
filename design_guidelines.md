# EcoSphere AI Design Guidelines

## Design Approach
**Reference-Based with System Elements**: Drawing from Linear's clean dashboards, Notion's data presentation, and modern sustainability platforms. Emphasis on clarity, interactivity, and environmental consciousness without green clichés.

## Core Design Principles
1. **Data Clarity First**: Information hierarchy prioritizes actionable insights
2. **Eco-Modern Aesthetic**: Contemporary tech feel with subtle sustainability cues
3. **Progressive Disclosure**: Complex features revealed through intuitive interactions
4. **Gamification Integration**: Points, badges, and leaderboards feel natural, not forced

## Typography System
- **Primary Font**: Inter or DM Sans (Google Fonts) - clean, modern, excellent for data
- **Display Font**: Space Grotesk for hero headings and impactful statements
- **Hierarchy**:
  - Hero Headlines: text-5xl to text-7xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Card Titles: text-xl, font-semibold
  - Body Text: text-base, regular
  - Data Labels: text-sm, medium
  - Micro-copy: text-xs

## Layout System
**Spacing Primitives**: Consistent use of Tailwind units 2, 4, 8, 12, 16, 24
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-24
- Grid gaps: gap-4, gap-6, gap-8
- Container: max-w-7xl with px-4 responsive padding

## Page-Specific Layouts

### Home Page
- **Hero Section**: Full-width with gradient overlay (70vh)
  - Large hero image showing sustainable cityscape/nature
  - Centered headline + subtitle + dual CTAs (Get Started, Learn More)
  - Floating stats cards (Users, CO₂ Saved, Cities) with backdrop blur
- **Features Grid**: 3-column layout (grid-cols-1 md:grid-cols-3) showcasing core features with icons
- **Impact Section**: 2-column split with image + stats visualization
- **How It Works**: Horizontal timeline/step cards
- **CTA Section**: Centered with gradient background

### EcoTrack Dashboard
- **Layout**: Sidebar navigation (hidden on mobile) + main content area
- **Input Section**: 2x2 grid of category cards (Travel, Diet, Electricity, Water)
  - Each card: icon, input fields, real-time mini-preview
- **Results Panel**: Prominent total carbon display with radial progress indicator
- **Charts Section**: 2-column grid showing pie chart (breakdown) + line chart (trends)
- **Action Bar**: Sticky bottom with Save Data button (prominent, gradient background)

### Smart Eco Route Finder
- **Map-First Layout**: Full-height interactive map (min-h-screen minus header)
- **Control Panel**: Floating card overlay (top-left) with:
  - Start/End point inputs with autocomplete
  - Route options (transit modes)
  - Calculate button
- **Results Card**: Sliding panel (right side) displaying:
  - Route visualization on map
  - Distance, time, CO₂ savings in card format
  - Eco Score badge (large, animated)
  - Alternative routes comparison table

### Generative Green Designer
- **Input Form**: Centered, stepped form (max-w-2xl)
  - Budget slider with visual indicators
  - Lifestyle checkboxes (grid layout)
  - Climate dropdown with icons
  - Generate button (prominent)
- **Results Display**: Full-width masonry grid or card layout
  - AI-generated suggestions with images
  - Each card: product/layout image, description, sustainability score
  - Save/Share actions per card

### Urban Optimization Dashboard
- **City Selector**: Dropdown with search (sticky header)
- **Metrics Grid**: 4-column stats (Total Users, Avg Carbon, Top Category, Reduction %)
- **Charts Layout**: 2-column grid
  - City comparison bar chart
  - Category breakdown donut chart
  - Time-series line chart (full-width below)
- **Insights Cards**: 3-column grid with AI-generated recommendations

### Gamification Zone
- **Profile Header**: User stats banner (points, level, rank)
- **Badges Section**: Grid of earned/locked badges with hover tooltips
- **Leaderboard**: Table with rank, avatar, username, points
  - Highlight current user row
  - Animated position changes
- **Challenges Card**: Available eco-challenges with progress bars

### Login/Signup
- **Split Layout**: 50/50 on desktop (form left, visual right)
- **Form Panel**: Centered form (max-w-md) with:
  - Logo at top
  - Input fields with icon prefixes
  - Social login buttons (Google, GitHub)
  - Toggle between Login/Signup
- **Visual Panel**: Hero image with gradient overlay + value proposition text

## Component Library

### Cards
- Standard: rounded-xl, shadow-md, backdrop blur for overlays
- Dashboard: rounded-lg, border, subtle shadow
- Hover: transform scale-105, shadow-lg transition

### Buttons
- Primary: Gradient background, rounded-lg, px-6 py-3
- Secondary: Outline, transparent background
- Icon buttons: Square, rounded-lg, icon-only
- Floating action: Fixed position, rounded-full, shadow-2xl

### Forms
- Inputs: rounded-lg, border, focus ring
- Labels: text-sm, font-medium, mb-2
- Groups: Consistent spacing (space-y-4)

### Data Visualization
- Chart containers: rounded-lg cards with p-6
- Use Chart.js with custom color palette
- Interactive tooltips and legends
- Responsive sizing

### Navigation
- Top Nav: Sticky, backdrop blur, shadow-sm
- Sidebar: Fixed, collapsible on mobile
- Breadcrumbs: text-sm with chevron separators

### Badges & Tags
- Rounded-full, px-3 py-1, text-xs
- Different variants for achievement types

## Animations
- **Page Transitions**: Subtle fade-in on load (300ms)
- **Stat Counters**: Animate numbers counting up
- **Chart Reveals**: Stagger chart animations on scroll-into-view
- **Badge Unlocks**: Celebratory scale + glow animation
- **Route Drawing**: Animated path tracing on map
- **Hover States**: Scale 105%, shadow enhancement (200ms ease)
- **Loading States**: Skeleton screens for data fetching

## Images
- **Home Hero**: Large sustainable city or nature scene (full-width, 70vh)
- **Feature Icons**: Use Heroicons for consistency
- **Dashboard**: No large images, focus on data viz
- **Route Finder**: Map is primary visual (Leaflet.js)
- **Green Designer**: Product/layout suggestion thumbnails
- **Login Visual**: Inspiring sustainability imagery

## Accessibility
- All interactive elements keyboard accessible
- Form inputs with proper labels and ARIA attributes
- Sufficient contrast ratios throughout
- Focus indicators on all focusable elements
- Chart data tables as fallback
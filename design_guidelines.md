# EcoSphere Live - Design Guidelines

## Design Approach
**Hybrid Reference-Based:** Drawing inspiration from environmental apps like Ecosia and Forest, combined with Linear's modern aesthetics and Notion's clean data presentation. Focus on making environmental impact tangible and inspiring through compelling visuals and clear data hierarchy.

## Core Design Principles
1. **Inspire Through Visuals:** Connect users emotionally to their environmental impact
2. **Data Clarity:** Present metrics in digestible, meaningful formats
3. **Celebrate Progress:** Highlight achievements and personal contributions
4. **Modern Minimalism:** Clean interface that emphasizes content over decoration

## Typography
- **Primary Font:** Inter (Google Fonts) - excellent for data display and readability
- **Accent Font:** Poppins (Google Fonts) - for headlines and impact statements
- **Hierarchy:**
  - Hero/Impact Numbers: Poppins Bold, 3xl-5xl (48-64px)
  - Section Headers: Poppins SemiBold, xl-2xl (24-32px)
  - Metric Labels: Inter Medium, sm-base (14-16px)
  - Body Text: Inter Regular, sm-base (14-16px)
  - Data Values: Inter SemiBold, lg-xl (18-24px)

## Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, and 12 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: mb-8 to mb-12
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl with px-4 to px-8

## Component Library

### Dashboard Header
- Clean navigation with logo, user profile, and points display
- Sticky positioning for persistent access to key metrics
- Quick stats bar showing global impact counters

### Hero Section
- Full-width impactful environmental imagery (forest canopy, clean ocean, renewable energy)
- Overlay with blurred background buttons for primary actions
- Large display of user's total CO2 saved with celebratory visual treatment
- Tagline: "Your Impact on the Planet" or similar inspiring message

### Metrics Dashboard Cards
- Grid layout: 3 columns on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), 1 on mobile
- Each card features:
  - Large numerical value with animated counter
  - Icon representing the metric (use Heroicons)
  - Label and trend indicator (↑/↓)
  - Subtle background gradient or pattern
- Card variants for: Active Users, CO2 Saved, Cities Worldwide, Green Points

### Personal Impact Section
- "Your Impact" showcase with visual progress indicators
- Monthly comparison chart showing "This Month" vs previous months
- Achievement badges for milestones
- Activity timeline with recent eco-friendly actions

### Activity Feed
- Card-based list of user actions with timestamps
- Each activity shows: action type, CO2 saved, points earned, timestamp
- Categorized with color-coded icons

### Global Impact Visualization
- Real-time counter for aggregate metrics
- Animated globe or map showing cities participating
- Community achievement celebrations

### Footer
- Newsletter signup for eco-tips
- Social links to community platforms
- Quick navigation to app sections
- Trust indicators: total community impact stats

## Icons
**Library:** Heroicons (solid and outline variants)
- Environmental icons: leaf, globe, lightning-bolt, sun, water
- Action icons: plus-circle, check-circle, sparkles
- Navigation: home, chart-bar, user, cog

## Animations
**Minimal and purposeful:**
- Number counters: Animated count-up for metrics when entering viewport
- Achievement pop-ups: Subtle scale and fade-in when earning points
- Card hover: Gentle lift (translate-y) and shadow enhancement
- No scroll-based parallax or complex transitions

## Images
### Required Images:
1. **Hero Background:** High-quality environmental scene (forest canopy with sunlight, pristine ocean, or wind turbines at sunset) - full-width, 60-80vh
2. **Activity Icons:** Use placeholder illustrations for different eco-activities (recycling, biking, planting trees) - 64x64px to 128x128px
3. **Achievement Badges:** Simple illustrated badges for milestones - 96x96px

### Image Placement:
- Hero section: Full-width background with overlay
- Activity cards: Small icon representations
- No images needed in metric cards (keep data-focused)

## Accessibility
- Maintain WCAG AA contrast ratios throughout
- All interactive elements have clear focus states with ring-2 ring-offset-2
- Metric cards include aria-labels for screen readers
- Form inputs have visible labels and error states
- Keyboard navigation fully supported

## Key UX Patterns
- **Data First:** Metrics immediately visible without scrolling
- **Progressive Disclosure:** Detailed breakdowns accessible on-demand
- **Instant Feedback:** Real-time updates when actions are logged
- **Gamification:** Clear point system and achievement tracking
- **Social Proof:** Community stats to inspire participation
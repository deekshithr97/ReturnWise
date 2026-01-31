# ReturnWise - Pure HTML/CSS/JS Migration

## Overview
This is a complete migration of the ReturnWise investment calculator website from React/Tailwind to pure HTML5, CSS3, and Vanilla JavaScript.

## File Structure
```
/project
├── index.html          # Main HTML file with all sections
├── css/
│   └── style.css      # Complete stylesheet (no Tailwind)
├── js/
│   └── main.js        # All JavaScript functionality
└── README.md          # This file
```

## Features Preserved

### UI/UX
- Exact same layout and spacing
- Same typography (Inter + Poppins fonts)
- Same color palette with dark/light mode
- Same animations and transitions
- Same hover effects
- Same responsive breakpoints

### Functionality
- **Theme Toggle**: Light/Dark mode with localStorage persistence
- **Mobile Menu**: Hamburger menu with backdrop and animations
- **SIP Calculator**: Monthly investment calculations with charts
- **Lumpsum Calculator**: One-time investment calculations
- **FD Calculator**: Fixed deposit calculations
- **RD Calculator**: Recurring deposit calculations
- **PPF Calculator**: Public Provident Fund calculations
- **Comparison Tool**: Side-by-side investment comparison
- **Interactive Charts**: Pie charts and growth charts using Chart.js
- **Real-time Updates**: Instant calculations on input change

### Sections
1. **Hero**: Landing section with CTA buttons
2. **Calculator Preview**: Quick estimator on homepage
3. **Features**: 6 feature cards with icons
4. **Why Us**: Benefits list with visual card
5. **Use Cases**: 4 investment scenarios
6. **Call to Action**: Final conversion section
7. **Calculators**: Full calculator tabs (SIP, Lumpsum, FD, RD, PPF)
8. **Compare**: Investment comparison tool
9. **Footer**: Links and disclaimer

## Technical Details

### CSS Architecture
- CSS Variables for theming (light/dark mode)
- Mobile-first responsive design
- Semantic class naming
- No inline styles
- Optimized animations

### JavaScript Architecture
- Modular pattern with separate managers
- Event delegation for performance
- Chart.js for data visualization
- LocalStorage for theme persistence
- Smooth scrolling navigation

### Accessibility
- Semantic HTML5 tags
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Alt attributes for icons

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- No external CSS frameworks
- Minimal JavaScript footprint
- Lazy-loaded charts
- Optimized animations (CSS transforms)
- Efficient DOM updates

## How to Use
1. Open `index.html` in any modern browser
2. No build step required
3. No server required (can open directly)
4. Works offline after first load

## Key Differences from React Version
- **No React**: All components are plain HTML
- **No Tailwind**: All styles are in CSS file
- **No Build Step**: Direct browser execution
- **Chart.js Instead of Recharts**: Pure JS chart library
- **Vanilla JS State**: No React state management
- **CSS Animations**: Instead of Framer Motion

## Migration Notes
- All React components converted to HTML sections
- All Tailwind classes converted to CSS classes
- All React hooks converted to vanilla JS
- All Recharts converted to Chart.js
- Theme system preserved with CSS variables
- Responsive design maintained
- All calculator logic preserved
- All animations recreated in CSS

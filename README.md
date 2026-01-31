# ReturnWise - Investment Returns Calculator

## Overview

ReturnWise is a comprehensive, user-friendly investment calculator web application designed specifically for Indian investors. It helps users calculate, compare, and visualize returns across various investment instruments including SIP (Systematic Investment Plan), Lumpsum investments, Fixed Deposits (FD), Recurring Deposits (RD), and Public Provident Fund (PPF).

## Live Demo

Open `index.html` directly in any modern web browser. No server or build process required!

## Features

### 🧮 Investment Calculators

#### 1. **SIP Calculator**
- Calculate returns on monthly investments in mutual funds
- Adjustable monthly investment amount (₹500 - ₹1,00,000)
- Customizable expected return rate (1% - 30% p.a.)
- Flexible time period (1 - 30 years)
- Visual pie chart showing invested vs returns ratio
- Growth analysis chart showing wealth accumulation over time

#### 2. **Lumpsum Calculator**
- Calculate returns on one-time investments
- Investment range: ₹1,000 - ₹1 Crore
- Real-time compound interest calculation
- Visual representation of wealth growth

#### 3. **Fixed Deposit (FD) Calculator**
- Calculate maturity amount for bank FDs
- Interest rate range: 1% - 15% p.a.
- Time period: 1 - 10 years
- Shows total interest earned

#### 4. **Recurring Deposit (RD) Calculator**
- Calculate returns on monthly deposits
- Monthly deposit range: ₹500 - ₹1,00,000
- Quarterly compounding calculation
- Maturity value projection

#### 5. **PPF Calculator**
- Calculate Public Provident Fund returns
- Yearly investment up to ₹1.5 Lakhs
- Time period: 15 - 50 years
- Government-backed secure investment returns

### ⚖️ Investment Comparison Tool

Compare different investment options side-by-side:
- **SIP vs FD**: Compare mutual fund returns vs fixed deposits
- Visual progress bars showing relative performance
- Detailed comparison table with:
  - Invested amount
  - Total returns
  - Final value
  - Growth percentage
- "Winner" badge highlighting best performing option

### 🎨 User Interface Features

#### **Light/Dark Mode**
- Toggle between light and dark themes
- Preference saved in localStorage
- Smooth transitions between themes
- All charts adapt to current theme

#### **Responsive Design**
- Fully responsive layout
- Mobile-optimized navigation with hamburger menu
- Touch-friendly interface (44px minimum touch targets)
- Works on desktop, tablet, and mobile devices

#### **Interactive Elements**
- Real-time calculations as you adjust sliders
- Synchronized number inputs and range sliders
- Smooth animations and hover effects
- Accessible keyboard navigation

### 📊 Visual Charts

#### **Pie Charts (Doughnut)**
- Shows invested amount vs returns ratio
- Center text displays returns percentage
- Interactive tooltips with detailed values

#### **Growth Analysis Charts (Line)**
- Dual-line chart showing:
  - Total portfolio value over time
  - Total invested amount over time
- Year-by-year breakdown
- Hover tooltips with exact values
- Gradient fills for better visualization

## How to Use

### Getting Started

1. **Open the Website**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

2. **Choose a Calculator**
   - Click on the calculator tabs (SIP, Lumpsum, FD, RD, PPF)
   - Or click "Try Calculator" in the navigation

3. **Adjust Parameters**
   - Use sliders or type directly in input fields
   - See real-time updates to calculations
   - View pie chart and growth chart automatically

4. **Compare Investments**
   - Navigate to the "Compare" section
   - Select which investments to compare
   - Adjust monthly investment and time period
   - View side-by-side comparison

### Example Calculations

#### **SIP Example**
- Monthly Investment: ₹25,000
- Expected Return: 12% p.a.
- Time Period: 15 years
- **Result**: Total Value ₹1.25 Crores (236% growth)

#### **Lumpsum Example**
- Investment: ₹1,00,000
- Expected Return: 12% p.a.
- Time Period: 10 years
- **Result**: Maturity ₹3,10,585 (211% growth)

#### **FD Example**
- Principal: ₹1,00,000
- Interest Rate: 7% p.a.
- Time Period: 5 years
- **Result**: Maturity ₹1,40,255 (40% growth)

## Technical Details

### Technology Stack

- **HTML5**: Semantic markup, accessible structure
- **CSS3**: Custom properties (variables), flexbox, grid, animations
- **JavaScript (ES6+)**: Modular architecture, no frameworks
- **Chart.js**: Interactive charts and visualizations
- **Google Fonts**: Inter and Poppins typography

### Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### File Structure

```
returns-calculator/
├── index.html          # Main HTML file (68 KB)
├── css/
│   └── style.css       # All styles (33 KB)
├── js/
│   └── main.js         # All JavaScript logic (31 KB)
├── MIGRATION.md        # Migration documentation
└── README.md           # This file
```

### Key Features

#### **No Build Process**
- Pure HTML/CSS/JS - no compilation needed
- Works offline after first load
- No dependencies except Chart.js (CDN)

#### **Performance Optimized**
- ~138 KB total size
- Lazy chart rendering
- Efficient DOM updates
- CSS animations (GPU accelerated)

#### **Accessibility**
- Semantic HTML5 tags
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly

## Formulas Used

### SIP (Systematic Investment Plan)
```
FV = P × (((1 + r)^n - 1) / r) × (1 + r)
Where:
P = Monthly investment
r = Monthly interest rate (annual rate / 12 / 100)
n = Total number of months
```

### Lumpsum
```
FV = P × (1 + r)^n
Where:
P = Principal amount
r = Annual interest rate / 100
n = Number of years
```

### Fixed Deposit (Compound Interest)
```
A = P × (1 + r/n)^(n×t)
Where:
P = Principal
r = Annual interest rate
n = Compounding frequency per year
```

### Recurring Deposit
```
Maturity = Σ(P × (1 + r/400)^(remaining_quarters))
Where:
P = Monthly deposit
r = Annual interest rate
```

### PPF (Public Provident Fund)
```
Yearly compounding with annual contributions
Balance = Previous_Balance + Interest + Contribution
```

## Investment Insights

### Understanding the Charts

#### **Pie Chart**
- **Blue section**: Returns/Interest earned
- **Gray section**: Amount invested
- **Center percentage**: Percentage of returns relative to total

#### **Growth Chart**
- **Blue line**: Total portfolio value (invested + returns)
- **Darker blue line**: Total amount invested
- **Gap between lines**: Your wealth gained

### Key Takeaways

1. **Power of Compounding**: Small regular investments can grow significantly over time
2. **Time Matters**: Longer investment horizons lead to exponentially higher returns
3. **Compare Before Investing**: Different instruments suit different goals
4. **Start Early**: Even small amounts invested early can beat larger later investments

## Disclaimer

⚠️ **Important**: 
- All calculations are estimates for educational purposes
- Mutual fund returns are not guaranteed and subject to market risks
- FD and RD rates vary by bank and are subject to change
- PPF rates are set by the Government of India and may change
- Past performance does not guarantee future returns
- Please read all scheme-related documents carefully before investing
- Consult a financial advisor for personalized investment advice

## Future Enhancements

- [ ] Step-up SIP calculator (increasing monthly investments)
- [ ] Inflation-adjusted returns
- [ ] Tax calculation (LTCG, STCG)
- [ ] Export results as PDF
- [ ] Save calculations history
- [ ] More investment options (NPS, Gold, Real Estate)
- [ ] Goal-based planning (retirement, education, marriage)

## Contributing

This is an open-source project. Feel free to:
- Report bugs or issues
- Suggest new features
- Improve calculations
- Enhance UI/UX
- Add translations

## License

MIT License - Feel free to use, modify, and distribute.

## Contact

For questions, suggestions, or feedback, please reach out through the website's contact section.

---

**Made with ❤️ for Indian Investors**

*Empowering you to make informed financial decisions*

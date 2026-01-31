/**
 * ReturnWise - Pure JavaScript Implementation
 * All calculator logic, charts, and interactions
 */

// ========================================
// Theme Management
// ========================================
const ThemeManager = {
  init() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    this.applyTheme(savedTheme);
    
    // Toggle theme on button click
    themeToggle?.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  },
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

// ========================================
// Mobile Menu
// ========================================
const MobileMenu = {
  init() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('active');
    });
    
    backdrop?.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
    });
    
    // Close menu when clicking a link
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
      });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mobileMenu?.classList.remove('active');
      }
    });
  }
};

// ========================================
// Calculator Logic
// ========================================
const Calculators = {
  // SIP Calculation
  calculateSIP(monthlyInvestment, rate, years) {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const investedAmount = monthlyInvestment * months;
    
    // Future Value formula for SIP
    // FV = P * ((1 + r)^n - 1) / r * (1 + r)
    const totalValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    return {
      investedAmount: Math.round(investedAmount),
      totalValue: Math.round(totalValue),
      wealthGained: Math.round(totalValue - investedAmount)
    };
  },
  
  // Lumpsum Calculation
  calculateLumpsum(investment, rate, years) {
    // Future Value = P * (1 + r)^n
    const totalValue = investment * Math.pow(1 + rate / 100, years);
    
    return {
      investedAmount: Math.round(investment),
      totalValue: Math.round(totalValue),
      wealthGained: Math.round(totalValue - investment)
    };
  },
  
  // FD Calculation (Compound Interest)
  calculateFD(principal, rate, years) {
    // A = P * (1 + r/n)^(nt) - For annual compounding
    const totalValue = principal * Math.pow(1 + rate / 100, years);
    
    return {
      investedAmount: Math.round(principal),
      totalValue: Math.round(totalValue),
      wealthGained: Math.round(totalValue - principal)
    };
  },
  
  // RD Calculation
  calculateRD(monthlyDeposit, rate, years) {
    const monthlyRate = rate / 12 / 100;
    const quarters = years * 4;
    const months = years * 12;
    
    // RD uses quarterly compounding
    // Maturity Value = P * (1 + r/n)^(nt) for each installment
    let maturityValue = 0;
    
    for (let i = 0; i < months; i++) {
      const remainingQuarters = (months - i) / 3;
      maturityValue += monthlyDeposit * Math.pow(1 + rate / 400, remainingQuarters);
    }
    
    const totalDeposit = monthlyDeposit * months;
    
    return {
      investedAmount: Math.round(totalDeposit),
      totalValue: Math.round(maturityValue),
      wealthGained: Math.round(maturityValue - totalDeposit)
    };
  },
  
  // PPF Calculation
  calculatePPF(yearlyInvestment, rate, years) {
    // PPF uses annual compounding
    let balance = 0;
    const data = [];
    
    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        const interest = balance * (rate / 100);
        balance += interest + yearlyInvestment;
      } else {
        balance = yearlyInvestment;
      }
      
      data.push({
        year: `Year ${year}`,
        invested: yearlyInvestment * year,
        value: Math.round(balance)
      });
    }
    
    const totalInvested = yearlyInvestment * years;
    
    return {
      investedAmount: Math.round(totalInvested),
      totalValue: Math.round(balance),
      wealthGained: Math.round(balance - totalInvested),
      chartData: data
    };
  },
  
  // Format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  },
  
  // Format compact (Lakhs/Crores)
  formatCompact(amount) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  }
};

// ========================================
// Chart Management
// ========================================
const ChartManager = {
  charts: {},
  pendingCharts: {},
  
  // Get chart colors based on theme
  getColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      primary: isDark ? '#60a5fa' : '#3b82f6',
      secondary: isDark ? '#38bdf8' : '#0ea5e9',
      text: isDark ? '#94a3b8' : '#64748b',
      grid: isDark ? '#334155' : '#e2e8f0',
      surface: isDark ? '#1e293b' : '#ffffff'
    };
  },
  
  // Create Pie Chart
  createPieChart(canvasId, invested, returns) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
      delete this.charts[canvasId];
    }
    
    const colors = this.getColors();
    const total = invested + returns;
    const returnsPercentage = Math.round((returns / total) * 100);
    
    this.charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Invested', 'Returns'],
        datasets: [{
          data: [invested, returns],
          backgroundColor: [colors.text, '#0ea5e9'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                const percentage = Math.round((value / total) * 100);
                return `${context.label}: ${Calculators.formatCurrency(value)} (${percentage}%)`;
              }
            }
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw: (chart) => {
          const { ctx, width, height } = chart;
          ctx.restore();
          ctx.font = 'bold 24px Inter';
          ctx.fillStyle = colors.text;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(`${returnsPercentage}%`, width / 2, height / 2 - 10);
          ctx.font = '14px Inter';
          ctx.fillText('Returns', width / 2, height / 2 + 15);
          ctx.save();
        }
      }]
    });
  },
  
  // Create Growth Chart
  createGrowthChart(canvasId, data, label = 'Investment Growth') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas ${canvasId} not found`);
      return;
    }
    
    // Check if canvas is visible
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      // Canvas is hidden, store for later
      this.pendingCharts[canvasId] = { data, label };
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
      delete this.charts[canvasId];
    }
    
    const colors = this.getColors();
    
    this.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.year),
        datasets: [
          {
            label: 'Total Value',
            data: data.map(d => d.value),
            borderColor: '#0ea5e9',
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
              gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            borderWidth: 3
          },
          {
            label: 'Invested',
            data: data.map(d => d.invested),
            borderColor: colors.primary,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.surface,
            titleColor: colors.text,
            bodyColor: colors.text,
            borderColor: colors.grid,
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${Calculators.formatCurrency(context.raw)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { 
              color: colors.text,
              maxTicksLimit: 8
            }
          },
          y: {
            grid: { 
              color: colors.grid,
              borderDash: [3, 3]
            },
            ticks: {
              color: colors.text,
              callback: (value) => `₹${(value / 100000).toFixed(1)}L`
            }
          }
        }
      }
    });
  },
  
  // Render pending charts (call when tab becomes visible)
  renderPendingCharts() {
    Object.keys(this.pendingCharts).forEach(canvasId => {
      const { data, label } = this.pendingCharts[canvasId];
      this.createGrowthChart(canvasId, data, label);
    });
    this.pendingCharts = {};
  },
  
  // Update all charts (call on theme change)
  updateAllCharts() {
    Object.keys(this.charts).forEach(canvasId => {
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
        delete this.charts[canvasId];
      }
    });
    // Charts will be recreated on next update
  }
};

// ========================================
// Calculator UI Management
// ========================================
const CalculatorUI = {
  init() {
    this.setupTabs();
    this.setupSIPCalculator();
    this.setupLumpsumCalculator();
    this.setupFDCalculator();
    this.setupRDCalculator();
    this.setupPPFCalculator();
    this.setupPreviewCalculator();
    this.setupComparison();
  },
  
  setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.calculator-panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active panel
        panels.forEach(p => p.classList.remove('active'));
        const activePanel = document.getElementById(`${targetTab}-panel`);
        activePanel?.classList.add('active');
        
        // Render pending charts for this panel
        setTimeout(() => {
          ChartManager.renderPendingCharts();
          // Trigger update for the active calculator
          this.triggerCalculatorUpdate(targetTab);
        }, 50);
      });
    });
  },
  
  triggerCalculatorUpdate(type) {
    // Trigger input event on amount field to recalculate and redraw charts
    const amountInput = document.getElementById(`${type}Amount`);
    if (amountInput) {
      amountInput.dispatchEvent(new Event('input'));
    }
  },
  
  setupSIPCalculator() {
    const amount = document.getElementById('sipAmount');
    const amountSlider = document.getElementById('sipAmountSlider');
    const rate = document.getElementById('sipRate');
    const rateSlider = document.getElementById('sipRateSlider');
    const years = document.getElementById('sipYears');
    const yearsSlider = document.getElementById('sipYearsSlider');
    
    const update = () => {
      const result = Calculators.calculateSIP(
        parseInt(amount.value),
        parseFloat(rate.value),
        parseInt(years.value)
      );
      
      // Update display
      document.getElementById('sipTotalValue').textContent = Calculators.formatCurrency(result.totalValue);
      document.getElementById('sipInvested').textContent = Calculators.formatCurrency(result.investedAmount);
      document.getElementById('sipReturns').textContent = Calculators.formatCurrency(result.wealthGained);
      
      const growthPercent = Math.round((result.wealthGained / result.investedAmount) * 100);
      document.getElementById('sipGrowthPercent').textContent = `${growthPercent}% Growth`;
      
      // Generate chart data
      const chartData = [];
      for (let i = 0; i <= parseInt(years.value); i++) {
        const yearResult = Calculators.calculateSIP(parseInt(amount.value), parseFloat(rate.value), i);
        chartData.push({
          year: `Year ${i}`,
          invested: yearResult.investedAmount,
          value: yearResult.totalValue
        });
      }
      
      // Update charts
      ChartManager.createPieChart('sipPieChart', result.investedAmount, result.wealthGained);
      ChartManager.createGrowthChart('sipGrowthChart', chartData);
    };
    
    // Sync inputs and sliders
    this.syncInputSlider(amount, amountSlider, update);
    this.syncInputSlider(rate, rateSlider, update);
    this.syncInputSlider(years, yearsSlider, update);
    
    update();
  },
  
  setupLumpsumCalculator() {
    const amount = document.getElementById('lumpsumAmount');
    const amountSlider = document.getElementById('lumpsumAmountSlider');
    const rate = document.getElementById('lumpsumRate');
    const rateSlider = document.getElementById('lumpsumRateSlider');
    const years = document.getElementById('lumpsumYears');
    const yearsSlider = document.getElementById('lumpsumYearsSlider');
    
    const update = () => {
      const result = Calculators.calculateLumpsum(
        parseInt(amount.value),
        parseFloat(rate.value),
        parseInt(years.value)
      );
      
      document.getElementById('lumpsumTotalValue').textContent = Calculators.formatCurrency(result.totalValue);
      document.getElementById('lumpsumInvested').textContent = Calculators.formatCurrency(result.investedAmount);
      document.getElementById('lumpsumReturns').textContent = Calculators.formatCurrency(result.wealthGained);
      
      const growthPercent = Math.round((result.wealthGained / result.investedAmount) * 100);
      document.getElementById('lumpsumGrowthPercent').textContent = `${growthPercent}% Growth`;
      
      const chartData = [];
      for (let i = 0; i <= parseInt(years.value); i++) {
        const yearResult = Calculators.calculateLumpsum(parseInt(amount.value), parseFloat(rate.value), i);
        chartData.push({
          year: `Year ${i}`,
          invested: result.investedAmount,
          value: yearResult.totalValue
        });
      }
      
      ChartManager.createPieChart('lumpsumPieChart', result.investedAmount, result.wealthGained);
      ChartManager.createGrowthChart('lumpsumGrowthChart', chartData);
    };
    
    this.syncInputSlider(amount, amountSlider, update);
    this.syncInputSlider(rate, rateSlider, update);
    this.syncInputSlider(years, yearsSlider, update);
    
    update();
  },
  
  setupFDCalculator() {
    const amount = document.getElementById('fdAmount');
    const amountSlider = document.getElementById('fdAmountSlider');
    const rate = document.getElementById('fdRate');
    const rateSlider = document.getElementById('fdRateSlider');
    const years = document.getElementById('fdYears');
    const yearsSlider = document.getElementById('fdYearsSlider');
    
    const update = () => {
      const result = Calculators.calculateFD(
        parseInt(amount.value),
        parseFloat(rate.value),
        parseInt(years.value)
      );
      
      document.getElementById('fdTotalValue').textContent = Calculators.formatCurrency(result.totalValue);
      document.getElementById('fdInvested').textContent = Calculators.formatCurrency(result.investedAmount);
      document.getElementById('fdReturns').textContent = Calculators.formatCurrency(result.wealthGained);
      
      const growthPercent = Math.round((result.wealthGained / result.investedAmount) * 100);
      document.getElementById('fdGrowthPercent').textContent = `${growthPercent}% Growth`;
      
      const chartData = [];
      for (let i = 0; i <= parseInt(years.value); i++) {
        const yearResult = Calculators.calculateFD(parseInt(amount.value), parseFloat(rate.value), i);
        chartData.push({
          year: `Year ${i}`,
          invested: result.investedAmount,
          value: yearResult.totalValue
        });
      }
      
      ChartManager.createPieChart('fdPieChart', result.investedAmount, result.wealthGained);
      ChartManager.createGrowthChart('fdGrowthChart', chartData);
    };
    
    this.syncInputSlider(amount, amountSlider, update);
    this.syncInputSlider(rate, rateSlider, update);
    this.syncInputSlider(years, yearsSlider, update);
    
    update();
  },
  
  setupRDCalculator() {
    const amount = document.getElementById('rdAmount');
    const amountSlider = document.getElementById('rdAmountSlider');
    const rate = document.getElementById('rdRate');
    const rateSlider = document.getElementById('rdRateSlider');
    const years = document.getElementById('rdYears');
    const yearsSlider = document.getElementById('rdYearsSlider');
    
    const update = () => {
      const result = Calculators.calculateRD(
        parseInt(amount.value),
        parseFloat(rate.value),
        parseInt(years.value)
      );
      
      document.getElementById('rdTotalValue').textContent = Calculators.formatCurrency(result.totalValue);
      document.getElementById('rdInvested').textContent = Calculators.formatCurrency(result.investedAmount);
      document.getElementById('rdReturns').textContent = Calculators.formatCurrency(result.wealthGained);
      
      const growthPercent = Math.round((result.wealthGained / result.investedAmount) * 100);
      document.getElementById('rdGrowthPercent').textContent = `${growthPercent}% Growth`;
      
      const chartData = [];
      for (let i = 0; i <= parseInt(years.value); i++) {
        const yearResult = Calculators.calculateRD(parseInt(amount.value), parseFloat(rate.value), i);
        chartData.push({
          year: `Year ${i}`,
          invested: yearResult.investedAmount,
          value: yearResult.totalValue
        });
      }
      
      ChartManager.createPieChart('rdPieChart', result.investedAmount, result.wealthGained);
      ChartManager.createGrowthChart('rdGrowthChart', chartData);
    };
    
    this.syncInputSlider(amount, amountSlider, update);
    this.syncInputSlider(rate, rateSlider, update);
    this.syncInputSlider(years, yearsSlider, update);
    
    update();
  },
  
  setupPPFCalculator() {
    const amount = document.getElementById('ppfAmount');
    const amountSlider = document.getElementById('ppfAmountSlider');
    const rate = document.getElementById('ppfRate');
    const rateSlider = document.getElementById('ppfRateSlider');
    const years = document.getElementById('ppfYears');
    const yearsSlider = document.getElementById('ppfYearsSlider');
    
    const update = () => {
      const result = Calculators.calculatePPF(
        parseInt(amount.value),
        parseFloat(rate.value),
        parseInt(years.value)
      );
      
      document.getElementById('ppfTotalValue').textContent = Calculators.formatCurrency(result.totalValue);
      document.getElementById('ppfInvested').textContent = Calculators.formatCurrency(result.investedAmount);
      document.getElementById('ppfReturns').textContent = Calculators.formatCurrency(result.wealthGained);
      
      const growthPercent = Math.round((result.wealthGained / result.investedAmount) * 100);
      document.getElementById('ppfGrowthPercent').textContent = `${growthPercent}% Growth`;
      
      ChartManager.createPieChart('ppfPieChart', result.investedAmount, result.wealthGained);
      ChartManager.createGrowthChart('ppfGrowthChart', result.chartData);
    };
    
    this.syncInputSlider(amount, amountSlider, update);
    this.syncInputSlider(rate, rateSlider, update);
    this.syncInputSlider(years, yearsSlider, update);
    
    update();
  },
  
  setupPreviewCalculator() {
    const amount = document.getElementById('previewAmount');
    const years = document.getElementById('previewYears');
    const rate = document.getElementById('previewRate');
    
    const update = () => {
      const monthlyInvestment = parseInt(amount.value);
      const rateValue = parseFloat(rate.value);
      const yearsValue = parseInt(years.value);
      
      // Update display values
      document.getElementById('previewAmountValue').textContent = `₹${monthlyInvestment.toLocaleString()}`;
      document.getElementById('previewRateValue').textContent = `${rateValue}%`;
      document.getElementById('previewYearsValue').textContent = `${yearsValue} Years`;
      
      // Calculate
      const result = Calculators.calculateSIP(monthlyInvestment, rateValue, yearsValue);
      
      document.getElementById('previewInvested').textContent = Calculators.formatCompact(result.investedAmount);
      document.getElementById('previewTotal').textContent = Calculators.formatCompact(result.totalValue);
      
      // Update chart
      const canvas = document.getElementById('previewChart');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const colors = ChartManager.getColors();
      const data = [];
      
      for (let i = 0; i <= yearsValue; i++) {
        const yearResult = Calculators.calculateSIP(monthlyInvestment, rateValue, i);
        data.push({
          year: `Year ${i}`,
          invested: yearResult.investedAmount,
          value: yearResult.totalValue
        });
      }
      
      if (ChartManager.charts['previewChart']) {
        ChartManager.charts['previewChart'].destroy();
      }
      
      ChartManager.charts['previewChart'] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(d => d.year),
          datasets: [{
            label: 'Portfolio Value',
            data: data.map(d => d.value),
            borderColor: '#0ea5e9',
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
              gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: colors.text }
            },
            y: {
              grid: { color: colors.grid, borderDash: [3, 3] },
              ticks: {
                color: colors.text,
                callback: (value) => `₹${(value / 100000).toFixed(1)}L`
              }
            }
          }
        }
      });
    };
    
    [amount, years, rate].forEach(input => {
      input?.addEventListener('input', update);
    });
    
    update();
  },
  
  setupComparison() {
    const amount = document.getElementById('compareAmount');
    const amountSlider = document.getElementById('compareAmountSlider');
    const years = document.getElementById('compareYears');
    const yearsSlider = document.getElementById('compareYearsSlider');
    const toggles = document.querySelectorAll('.compare-toggle');
    
    const selectedInvestments = new Set(['sip', 'fd']);
    
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const type = toggle.dataset.compare;
        
        if (selectedInvestments.has(type)) {
          if (selectedInvestments.size > 1) {
            selectedInvestments.delete(type);
            toggle.classList.remove('active');
          }
        } else {
          selectedInvestments.add(type);
          toggle.classList.add('active');
        }
        
        update();
      });
    });
    
    const update = () => {
      const monthlyInvestment = parseInt(amount.value);
      const yearsValue = parseInt(years.value);
      
      const comparisons = [];
      
      if (selectedInvestments.has('sip')) {
        const sipResult = Calculators.calculateSIP(monthlyInvestment, 12, yearsValue);
        comparisons.push({
          type: 'SIP (Mutual Funds)',
          icon: 'trending',
          rate: 12,
          description: 'Systematic Investment Plan in equity mutual funds',
          color: '#0ea5e9',
          ...sipResult
        });
      }
      
      if (selectedInvestments.has('fd')) {
        const totalPrincipal = monthlyInvestment * 12 * yearsValue;
        const fdResult = Calculators.calculateFD(totalPrincipal, 7, yearsValue);
        comparisons.push({
          type: 'Fixed Deposit',
          icon: 'landmark',
          rate: 7,
          description: 'Bank fixed deposit with guaranteed returns',
          color: '#94a3b8',
          ...fdResult
        });
      }
      
      // Sort by total value
      comparisons.sort((a, b) => b.totalValue - a.totalValue);
      
      const maxReturn = Math.max(...comparisons.map(c => c.totalValue));
      
      // Render comparison cards
      const resultsContainer = document.getElementById('compareResults');
      resultsContainer.innerHTML = comparisons.map((comp, index) => {
        const percentage = maxReturn > 0 ? (comp.totalValue / maxReturn) * 100 : 0;
        const isWinner = comp.totalValue === maxReturn;
        
        return `
          <div class="compare-result-card ${isWinner ? 'winner' : ''}">
            ${isWinner ? '<span class="compare-result-badge">Best Return</span>' : ''}
            <div class="compare-result-header">
              <div class="compare-result-icon" style="background-color: ${comp.color}20; color: ${comp.color}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  ${comp.icon === 'trending' 
                    ? '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
                    : '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>'
                  }
                </svg>
              </div>
              <div>
                <h4 class="compare-result-name">${comp.type}</h4>
                <p class="compare-result-desc">${comp.description}</p>
              </div>
            </div>
            <div class="compare-result-rate">
              <p class="compare-result-rate-label">Expected Return Rate</p>
              <p class="compare-result-rate-value" style="color: ${comp.color}">${comp.rate}% p.a.</p>
            </div>
            <div class="compare-progress">
              <div class="compare-progress-bar" style="width: ${percentage}%; background-color: ${comp.color}"></div>
            </div>
            <div class="compare-result-stats">
              <div>
                <p class="compare-stat-label">Invested</p>
                <p class="compare-stat-value">${Calculators.formatCurrency(comp.investedAmount)}</p>
              </div>
              <div>
                <p class="compare-stat-label">Returns</p>
                <p class="compare-stat-value" style="color: ${comp.color}">${Calculators.formatCurrency(comp.wealthGained)}</p>
              </div>
              <div>
                <p class="compare-stat-label">Total Value</p>
                <p class="compare-stat-value">${Calculators.formatCurrency(comp.totalValue)}</p>
              </div>
            </div>
          </div>
        `;
      }).join('');
      
      // Render table
      const tableBody = document.getElementById('compareTableBody');
      tableBody.innerHTML = comparisons.map((comp, index) => {
        const growthPercent = Math.round((comp.wealthGained / comp.investedAmount) * 100);
        const isWinner = index === 0;
        
        return `
          <tr class="compare-table-row ${isWinner ? 'winner' : ''}">
            <td>
              <svg class="compare-table-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: ${comp.color}">
                ${comp.icon === 'trending' 
                  ? '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
                  : '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>'
                }
              </svg>
              <span style="font-weight: 500;">${comp.type}</span>
              ${isWinner ? '<span class="compare-table-badge">Winner</span>' : ''}
            </td>
            <td class="text-right">${Calculators.formatCurrency(comp.investedAmount)}</td>
            <td class="text-right" style="color: ${comp.color}">${Calculators.formatCurrency(comp.wealthGained)}</td>
            <td class="text-right" style="font-weight: 600;">${Calculators.formatCurrency(comp.totalValue)}</td>
            <td class="text-right" style="color: ${isWinner ? '#22c55e' : 'var(--text-muted)'}; font-weight: 600;">${growthPercent}%</td>
          </tr>
        `;
      }).join('');
    };
    
    this.syncInputSlider(amount, amountSlider, update);
    this.syncInputSlider(years, yearsSlider, update);
    
    update();
  },
  
  syncInputSlider(input, slider, callback) {
    if (!input || !slider) return;
    
    input.addEventListener('input', () => {
      slider.value = input.value;
      callback();
    });
    
    slider.addEventListener('input', () => {
      input.value = slider.value;
      callback();
    });
  }
};

// ========================================
// Smooth Scroll
// ========================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  MobileMenu.init();
  CalculatorUI.init();
  SmoothScroll.init();
  
  // Update charts when theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // Clear all charts and let them be recreated
        ChartManager.updateAllCharts();
        // Trigger updates for all visible calculators
        setTimeout(() => {
          document.querySelectorAll('.calculator-panel.active .slider').forEach(slider => {
            slider.dispatchEvent(new Event('input'));
          });
        }, 100);
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
});

// Handle window resize for charts
window.addEventListener('resize', () => {
  Object.values(ChartManager.charts).forEach(chart => {
    if (chart) chart.resize();
  });
});
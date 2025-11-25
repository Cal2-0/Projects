// Tool, student, and stock dummy data
window.FINTERA_DATA = {
  tools: {
    emi: {
      title: 'EMI Analysis',
      intro: 'Plan loans with a clear view of interest vs. principal and monthly cash flow impact.',
      lookFor: ['Lower interest rate', 'No prepayment penalty', 'Fixed rate stability'],
      avoid: ['High processing fees', 'Long lock-in periods', 'Hidden charges'],
      start: ['Check credit score', 'Compare loan offers', 'Use EMI calculator'],
      chart: { type: 'pie' },
    },
    sip: {
      title: 'SIP Growth',
      intro: 'Build wealth with disciplined investing and the power of compounding.',
      lookFor: ['Consistent returns', 'Low expense ratio', 'Diversified funds'],
      avoid: ['Chasing past performance', 'High churn', 'Unclear objectives'],
      start: ['Define goal and horizon', 'Pick 1-2 funds', 'Automate monthly SIP'],
      chart: { type: 'bar' },
    },
    tax: {
      title: 'Tax Optimization',
      intro: 'Choose the right deductions and instruments for your profile.',
      lookFor: ['80C options', 'Health insurance 80D', 'NPS 80CCD(1B)'],
      avoid: ['Unverified schemes', 'Last-minute rush', 'Ignoring declarations'],
      start: ['Estimate income', 'Plan investments early', 'Track proofs monthly'],
      chart: { type: 'bar' },
      scroller: [
        { name: 'For Salaried', items: ['ELSS', 'EPF', 'Term Insurance'] },
        { name: 'For Small Business', items: ['PPF', 'NPS', 'Health Insurance'] },
        { name: 'For Homeowners', items: ['Home Loan Interest', 'Principal 80C', 'ELSS'] },
      ],
    },
    'home-loan': {
      title: 'Home Loan Planner',
      intro: 'Assess affordability, EMI, and prepayment strategies for home ownership.',
      lookFor: ['Lower effective rate', 'Minimal fees', 'Flexible prepayment'],
      avoid: ['Teaser rates', 'Costly insurance add-ons', 'Balloon EMIs'],
      start: ['Fix budget', 'Compare banks', 'Simulate amortization'],
      chart: { type: 'line' },
    },
    cards: {
      title: 'Credit & Debit Cards',
      intro: 'Pick the right card for your spending profile and avoid hidden costs.',
      lookFor: ['Rewards aligned to spends', 'Low/waived annual fees', 'Robust support'],
      avoid: ['High forex markup', 'Low reward caps', 'Mandatory add-ons'],
      start: ['List top 3 spends', 'Shortlist 2 cards', 'Review fees and caps'],
      chart: { type: 'bar' },
      scroller: [
        { bank: 'HDFC', feature: '5% Cashback', user: 'Best for Students' },
        { bank: 'SBI', feature: 'Fuel Surcharge Waiver', user: 'Commuters' },
        { bank: 'ICICI', feature: 'Dining Benefits', user: 'Foodies' },
        { bank: 'Axis', feature: 'Travel Miles', user: 'Frequent Travelers' },
      ],
    },
  },
  students: [
    { title: 'Student Banking', desc: 'Zero-balance, student cards, fee waivers' },
    { title: 'Education Loans', desc: 'Compare interest and moratoriums' },
    { title: 'Scholarships', desc: 'Govt and private opportunities' },
  ],
  stocks: {
    indices: [
      { symbol: 'NIFTY 50', price: 24650 },
      { symbol: 'SENSEX', price: 81600 },
    ],
    watchlist: [
      { symbol: 'RELIANCE', price: 2950, change: 0.3 },
      { symbol: 'TCS', price: 3920, change: -0.5 },
      { symbol: 'HDFCBANK', price: 1650, change: 0.2 },
      { symbol: 'INFY', price: 1640, change: -0.1 },
      { symbol: 'ITC', price: 460, change: 0.4 },
      { symbol: 'LT', price: 3810, change: -0.2 },
    ],
    insights: [
      'Market sentiment appears cautiously optimistic.',
      'Sector Spotlight: IT shows strong momentum this week.',
      'Defensives outperform in volatile sessions; watch FMCG.',
    ],
  },
};

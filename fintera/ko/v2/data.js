// Fintera demo dataset (trimmed but extensible)
// Fields are normalized for rendering in index.html

window.FINTERA_DATA = {
  cards: {
    Travel: [
      {
        id: 'card_travel_jetset',
        name: 'Jetset Journeys Card',
        bank: 'Bank of India',
        interestPerMonthPct: 2.0,
        interestPerYearPct: 24.0,
        annualFee: 2500,
        joiningFee: 2000,
        features: [
          '5× air miles on flights',
          '4 domestic + 2 international lounge visits/year',
          'Travel insurance cover'
        ],
        useCase: 'Best for frequent flyers and international travelers.',
        image: 'http://example.com/jetset.jpg',
        moreInfo: 'http://bankofindia.com/jetset-journeys'
      },
      {
        id: 'card_travel_continental',
        name: 'Continental Explorer Card',
        bank: 'Axis Bank',
        interestPerMonthPct: 1.9,
        interestPerYearPct: 23.0,
        annualFee: 1500,
        joiningFee: 1000,
        features: [
          '4× points on hotel and flight bookings',
          '6 domestic lounge visits',
          'Up to ₹3,000 travel voucher annually'
        ],
        useCase: 'Ideal for frequent holidaymakers.',
        image: 'http://example.com/continental-explorer.jpg',
        moreInfo: 'http://axisbank.com/continental-explorer'
      },
      {
        id: 'card_travel_skymiles',
        name: 'SkyMiles Platinum Card',
        bank: 'HDFC Bank',
        interestPerMonthPct: 2.2,
        interestPerYearPct: 26.0,
        annualFee: 5000,
        joiningFee: 5000,
        features: [
          '10,000 bonus points on welcome',
          '5× points on all travel spends',
          'Unlimited domestic lounge + 2 international lounges'
        ],
        useCase: 'Suited for premium travelers and business class flyers.',
        image: 'http://example.com/skymiles.jpg',
        moreInfo: 'http://hdfcbank.com/skymiles-platinum'
      }
    ],
    Grocery: [
      {
        id: 'card_grocery_supershopper',
        name: 'SuperShopper Rewards Card',
        bank: 'ICICI Bank',
        interestPerMonthPct: 2.0,
        annualFee: 999,
        joiningFee: 499,
        features: [
          '5% cashback on groceries (max ₹500/month)',
          '1% cashback on other spends',
          'Fuel surcharge waiver'
        ],
        useCase: 'Great for family grocery shopping.',
        image: 'http://example.com/supershopper.jpg',
        moreInfo: 'http://icicibank.com/supershopper'
      },
      {
        id: 'card_grocery_marketmaster',
        name: 'MarketMaster Card',
        bank: 'SBI Card',
        interestPerMonthPct: 2.5,
        annualFee: 499,
        joiningFee: 0,
        features: [
          '4% cashback on supermarkets',
          '3% on utilities & dining',
          'Zero fuel surcharge'
        ],
        useCase: 'Best for heavy grocery and utility bills.',
        image: 'http://example.com/marketmaster.jpg',
        moreInfo: 'http://sbicard.com/marketmaster'
      },
      {
        id: 'card_grocery_dailyneeds',
        name: 'DailyNeeds Cashback Card',
        bank: 'Axis Bank',
        interestPerMonthPct: 1.8,
        annualFee: 250,
        joiningFee: 250,
        features: [
          '3% cashback on groceries (max ₹300/month)',
          '1% on other spends',
          '1 lounge access'
        ],
        useCase: 'Good for budget shoppers.',
        image: 'http://example.com/dailyneeds.jpg',
        moreInfo: 'http://axisbank.com/dailyneeds'
      }
    ],
    Fuel: [
      {
        id: 'card_fuel_petrolpro',
        name: 'PetrolPro Card',
        bank: 'HDFC Bank',
        interestPerMonthPct: 2.0,
        annualFee: 300,
        joiningFee: 300,
        features: [
          '5% cashback on fuel (max ₹250/month)',
          '1% on other spends',
          'Fuel surcharge waiver'
        ],
        useCase: 'Best for commuters and frequent drivers.',
        image: 'http://example.com/petrolpro.jpg',
        moreInfo: 'http://hdfcbank.com/petrolpro'
      },
      {
        id: 'card_fuel_sbi_fuelsaver',
        name: 'FuelSaver SBI Card',
        bank: 'SBI Card',
        interestPerMonthPct: 2.5,
        annualFee: 499,
        joiningFee: 0,
        features: [
          '4% cashback on petrol (max ₹400/month)',
          '0.5% on others',
          'No fuel surcharge'
        ],
        useCase: 'Ideal for regular car owners.',
        image: 'http://example.com/fuelsaver.jpg',
        moreInfo: 'http://sbicard.com/fuelsaver'
      },
      {
        id: 'card_fuel_drivedeluxe',
        name: 'DriveDeluxe Card',
        bank: 'Axis Bank',
        interestPerMonthPct: 1.9,
        annualFee: 500,
        joiningFee: 0,
        features: [
          '6% discount on fuel (max ₹3,000/year)',
          '5× reward points on dining & shopping',
          'Complimentary lounge access'
        ],
        useCase: 'For high-mileage motorists seeking premium perks.',
        image: 'http://example.com/drivedeluxe.jpg',
        moreInfo: 'http://axisbank.com/drivedeluxe'
      }
    ],
    Luxury: [
      {
        id: 'card_lux_platinum_prestige',
        name: 'Platinum Prestige Card',
        bank: 'American Express',
        interestPerMonthPct: 1.5,
        annualFee: 40000,
        joiningFee: 39000,
        features: [
          'Unlimited worldwide lounge access',
          'Up to ₹50,000 welcome points',
          '10× points on overseas spends'
        ],
        useCase: 'Exclusive for high net-worth travelers.',
        image: 'http://example.com/platinum-prestige.jpg',
        moreInfo: 'http://americanexpress.com/platinum-prestige'
      },
      {
        id: 'card_lux_titanium_elite',
        name: 'Titanium Elite Card',
        bank: 'ICICI Bank',
        interestPerMonthPct: 1.75,
        annualFee: 3000,
        joiningFee: 0,
        features: [
          '3% cashback on luxury retail',
          '2 free lounge visits',
          'Complimentary travel insurance'
        ],
        useCase: 'Luxury shopping and international travel.',
        image: 'http://example.com/titanium-elite.jpg',
        moreInfo: 'http://icicibank.com/titanium-elite'
      },
      {
        id: 'card_lux_royal_sapphire',
        name: 'Royal Sapphire Card',
        bank: 'HDFC Bank',
        interestPerMonthPct: 1.9,
        annualFee: 5000,
        joiningFee: 5000,
        features: [
          '10,000 welcome points',
          '5× points on premium brand spends',
          'Luxury gift vouchers'
        ],
        useCase: 'For premium lifestyle and travel rewards.',
        image: 'http://example.com/royal-sapphire.jpg',
        moreInfo: 'http://hdfcbank.com/royal-sapphire'
      }
    ],
    Cashback: [
      {
        id: 'card_cashback_plus',
        name: 'CashBack Plus Card',
        bank: 'Kotak Mahindra Bank',
        interestPerMonthPct: 2.0,
        annualFee: 500,
        joiningFee: 500,
        features: [
          '5% cashback on online spends (max ₹1,000/month)',
          '2% on groceries/fuel',
          '0.5% on others'
        ],
        useCase: 'General spending with high cashback.',
        image: 'http://example.com/cashbackplus.jpg',
        moreInfo: 'http://kotak.com/cashbackplus'
      },
      {
        id: 'card_easyreward',
        name: 'EasyReward Card',
        bank: 'Axis Bank',
        interestPerMonthPct: 2.2,
        annualFee: 250,
        joiningFee: 250,
        features: [
          '5% on mobile/DTH recharges',
          '3% on utilities',
          '1% on shopping'
        ],
        useCase: 'For bill payments and online shopping.',
        image: 'http://example.com/easyreward.jpg',
        moreInfo: 'http://axisbank.com/easyreward'
      },
      {
        id: 'card_rewardsmax',
        name: 'RewardsMax Card',
        bank: 'HDFC Bank',
        interestPerMonthPct: 1.8,
        annualFee: 999,
        joiningFee: 0,
        features: [
          '3% cashback on all spends (1.5% as statement credit)',
          '5% on dining',
          '2 lounge visits/year'
        ],
        useCase: 'Balanced cashback on everyday spends.',
        image: 'http://example.com/rewardsmax.jpg',
        moreInfo: 'http://hdfcbank.com/rewardsmax'
      }
    ],
    Student: [
      {
        id: 'card_student_campus',
        name: 'Campus Card',
        bank: 'SBI Card',
        interestPerMonthPct: 3.0,
        annualFee: 0,
        joiningFee: 0,
        features: [
          '5% on educational subscriptions',
          '4% on bookstores',
          '1% on dining'
        ],
        useCase: 'College students building credit.',
        image: 'http://example.com/campus.jpg',
        moreInfo: 'http://sbicard.com/campus'
      },
      {
        id: 'card_student_scholars',
        name: 'Scholars Credit Card',
        bank: 'Axis Bank',
        interestPerMonthPct: 2.5,
        annualFee: 0,
        joiningFee: 0,
        features: [
          '5% on academics and e-learning',
          '2% on groceries',
          '1% on other spends'
        ],
        useCase: 'Undergraduates and postgraduates.',
        image: 'http://example.com/scholars.jpg',
        moreInfo: 'http://axisbank.com/scholars'
      },
      {
        id: 'card_student_youth_platinum',
        name: 'Youth Platinum Card',
        bank: 'ICICI Bank',
        interestPerMonthPct: 2.8,
        annualFee: 0,
        joiningFee: 0,
        features: [
          '4% on e-commerce',
          '3% on dining',
          'Tuition fee waivers'
        ],
        useCase: 'Tech-savvy young spenders.',
        image: 'http://example.com/youthplatinum.jpg',
        moreInfo: 'http://icicibank.com/youth-platinum'
      }
    ]
  },
  loans: {
    Home: [
      {
        id: 'loan_home_icici_home_comfort',
        name: 'Home Comfort Loan',
        bank: 'ICICI Bank',
        ratePct: 7.70,
        processingFee: '0.5% (min ₹5,000)',
        benefits: ['Pre-approved sanction','Up to 30-year tenure','Balance transfer option'],
        useCase: 'Best for salaried homebuyers.',
        image: 'http://example.com/homecomfort.jpg',
        moreInfo: 'http://icicibank.com/home-comfort-loan'
      },
      {
        id: 'loan_home_hdfc_dream_home',
        name: 'Dream Home Loan',
        bank: 'HDFC Bank',
        ratePct: 8.15,
        processingFee: '₹9,600',
        benefits: ['Up to ₹5 Cr','Fixed/float options','Minimal documentation'],
        useCase: 'Ideal for first-time homeowners.',
        image: 'http://example.com/dreamhome.jpg',
        moreInfo: 'http://hdfcbank.com/dream-home-loan'
      },
      {
        id: 'loan_home_sbi_grih_awas',
        name: 'SBI Grih Awas Loan',
        bank: 'SBI',
        ratePct: 7.50,
        processingFee: '0.40% (min ₹7,500)',
        benefits: ['Special rate for women 7.20%','Top-up available','Up to 30-year tenure'],
        useCase: 'Low-cost loan with government rates.',
        image: 'http://example.com/sbi-grihawas.jpg',
        moreInfo: 'http://sbi.co.in/grih-awas-loan'
      }
    ],
    Car: [
      {
        id: 'loan_car_hdfc_autodrive',
        name: 'AutoDrive Loan',
        bank: 'HDFC Bank',
        ratePct: 9.40,
        processingFee: '1.25% of loan',
        benefits: ['Up to 100% financing','Tenor up to 7 years'],
        useCase: 'Buying new cars at competitive rates.',
        image: 'http://example.com/autodrive.jpg',
        moreInfo: 'http://hdfcbank.com/autodrive-loan'
      },
      {
        id: 'loan_car_icici_carloan_plus',
        name: 'CarLoan Plus',
        bank: 'ICICI Bank',
        ratePct: 9.15,
        processingFee: '1.00% (min ₹1,000)',
        benefits: ['No prepayment charge','Quick disbursal'],
        useCase: 'Easy financing for any car purchase.',
        image: 'http://example.com/carloanplus.jpg',
        moreInfo: 'http://icicibank.com/carloanplus'
      },
      {
        id: 'loan_car_sbi_driveeasy',
        name: 'DriveEasy Loan',
        bank: 'SBI',
        ratePct: 8.90,
        processingFee: '₹800 + stamp duty',
        benefits: ['Special EV rates','Top-up loans'],
        useCase: 'Cost-effective loan for SBI customers.',
        image: 'http://example.com/driveeasy.jpg',
        moreInfo: 'http://sbi.co.in/driveeasy-loan'
      }
    ],
    Personal: [
      {
        id: 'loan_personal_axis_flexicash',
        name: 'FlexiCash Loan',
        bank: 'Axis Bank',
        rateRangePct: '9.99–22',
        processingFee: '2% (min ₹3,000)',
        benefits: ['No collateral','Quick approval','Part-prepayment after 12 EMIs'],
        useCase: 'Unsecured loan for personal needs.',
        image: 'http://example.com/flexicash.jpg',
        moreInfo: 'http://axisbank.com/flexicash'
      },
      {
        id: 'loan_personal_hdfc_quick',
        name: 'Quick Personal Loan',
        bank: 'HDFC Bank',
        ratePct: 10.60,
        processingFee: '₹999 (min ₹1,000)',
        benefits: ['Instant approval up to ₹25 lakh','Minimal docs','Top-up on existing loan'],
        useCase: 'Short-term financing.',
        image: 'http://example.com/quickloan.jpg',
        moreInfo: 'http://hdfcbank.com/quick-personal-loan'
      },
      {
        id: 'loan_personal_icici_advance',
        name: 'Personal Advance',
        bank: 'ICICI Bank',
        ratePct: 11.50,
        processingFee: '1.50% (max ₹15,000)',
        benefits: ['Preferential salary a/c rates','Up to 5-year tenure'],
        useCase: 'For salaried professionals needing funds.',
        image: 'http://example.com/personaladvance.jpg',
        moreInfo: 'http://icicibank.com/personal-advance'
      }
    ],
    Education: [
      {
        id: 'loan_edu_sbi_edufund',
        name: 'EduFund Loan',
        bank: 'SBI',
        rateRangePct: '7.15–10.15',
        processingFee: 'Nil ≤₹7.5L; else 1% (max ₹10,000)',
        benefits: ['Up to 15-year repayment','Covers tuition & living'],
        useCase: 'Students pursuing higher education.',
        image: 'http://example.com/edufund.jpg',
        moreInfo: 'http://sbi.co.in/edufund-loan'
      },
      {
        id: 'loan_edu_pnb_scholar',
        name: 'Scholarship Loan',
        bank: 'PNB',
        rateRangePct: '4.00–11.85',
        processingFee: 'Nil (India) / 1% abroad (min ₹10,000)',
        benefits: ['Zero interest (4%) for meritorious','Co-borrower not mandatory for small loans'],
        useCase: 'High-achieving students with need.',
        image: 'http://example.com/scholarship.jpg',
        moreInfo: 'http://pnbindia.in/scholarship-loan'
      },
      {
        id: 'loan_edu_hdfc_brightfuture',
        name: 'BrightFuture Education Loan',
        bank: 'HDFC Bank',
        ratePct: 10.50,
        processingFee: 'Nil (≤₹7.5L) / 1% above',
        benefits: ['Fast processing','Part-payment from second year'],
        useCase: 'Graduate and postgraduate courses.',
        image: 'http://example.com/brightfuture.jpg',
        moreInfo: 'http://hdfcbank.com/bright-future'
      }
    ]
  },
  investments: {
    SIP: [
      {
        id: 'sip_futuregrowth500',
        name: 'FutureGrowth 500 (ELSS)',
        provider: 'HDFC Mutual Fund',
        returnPct: 15,
        expenseRatioPct: 1.5,
        features: ['Tax-saving ELSS','3-year lock-in'],
        useCase: 'Long-term wealth creation + tax saving.',
        image: 'http://example.com/futuregrowth500.jpg',
        moreInfo: 'http://hdfcfund.com/futuregrowth500'
      },
      {
        id: 'sip_balanced_adv',
        name: 'Balanced Advantage Fund',
        provider: 'ICICI Prudential',
        returnPct: 10,
        features: ['Dynamic equity-debt allocation','Moderate risk'],
        useCase: 'Diversified SIP for moderate-risk investors.',
        image: 'http://example.com/balancedadv.jpg',
        moreInfo: 'http://icicipruamc.com/balanced-advantage'
      },
      {
        id: 'sip_midcap_opportunities',
        name: 'MidCap Opportunities Fund',
        provider: 'SBI Mutual Fund',
        returnPct: 13,
        expenseRatioPct: 2.0,
        features: ['Focus on mid-cap stocks','Higher growth potential'],
        useCase: 'Aggressive SIP for wealth accumulation.',
        image: 'http://example.com/midcapopps.jpg',
        moreInfo: 'http://sbimf.com/midcap-opportunities'
      }
    ],
    FD: [
      {
        id: 'fd_sbi_super',
        name: 'Super FD Scheme',
        provider: 'State Bank of India',
        ratePct: 7.0,
        features: ['Loan against FD up to 80%','Auto-renewal option'],
        useCase: 'Safe short-term savings.',
        image: 'http://example.com/superfd.jpg',
        moreInfo: 'http://sbi.co.in/super-fd'
      },
      {
        id: 'fd_icici_maximiser',
        name: 'Maximiser FD',
        provider: 'ICICI Bank',
        ratePct: 7.15,
        features: ['Monthly/quarterly payout'],
        useCase: 'Steady income for retirees.',
        image: 'http://example.com/maximiserfd.jpg',
        moreInfo: 'http://icicibank.com/maximiser-fd'
      },
      {
        id: 'fd_hdfc_plusplus',
        name: 'PlusPlus Fixed Deposit',
        provider: 'HDFC Bank',
        ratePct: 7.10,
        features: ['Flexible tenors','NRI variant available'],
        useCase: 'General savings with moderate return.',
        image: 'http://example.com/plusplusfd.jpg',
        moreInfo: 'http://hdfcbank.com/plusplus-fd'
      }
    ],
    Stocks: [
      {
        id: 'stock_reliance',
        name: 'Reliance Industries Ltd. (RELIANCE)',
        provider: 'NSE',
        returnPct: 12,
        features: ['Blue-chip','Diversified businesses'],
        useCase: 'Blue-chip growth investment.',
        image: 'http://example.com/reliance.jpg',
        moreInfo: 'https://www.nseindia.com/get-quotes/equity?symbol=RELIANCE'
      },
      {
        id: 'stock_tcs',
        name: 'Tata Consultancy Services (TCS)',
        provider: 'NSE',
        returnPct: 15,
        features: ['IT export leader','High dividend payer'],
        useCase: 'Long-term tech sector play.',
        image: 'http://example.com/tcs.jpg',
        moreInfo: 'https://www.nseindia.com/get-quotes/equity?symbol=TCS'
      },
      {
        id: 'stock_hdfc_bank',
        name: 'HDFC Bank Ltd. (HDFCBANK)',
        provider: 'NSE',
        returnPct: 10,
        features: ['Leading private bank','Steady asset growth'],
        useCase: 'Banking sector exposure.',
        image: 'http://example.com/hdfcbank.jpg',
        moreInfo: 'https://www.nseindia.com/get-quotes/equity?symbol=HDFCBANK'
      }
    ],
    DigitalGold: [
      {
        id: 'dg_aurum_1g',
        name: '1g Gold (Aurum Safe)',
        provider: 'Aurum Safe',
        returnNote: 'Market-linked (~6–7% hist.)',
        fees: '1% purchase',
        features: ['24K Purity','Invest from ₹100'],
        useCase: 'Diversified portfolio with gold exposure.',
        image: 'http://example.com/1g.jpg',
        moreInfo: 'https://www.dhan.co/1g-gold'
      },
      {
        id: 'dg_axis_securegold',
        name: 'SecureGold',
        provider: 'Axis Bank',
        fees: '0% purchase, 2% redemption',
        features: ['Instant buy/sell','Insured by Custodian'],
        useCase: 'Hedge against inflation.',
        image: 'http://example.com/securegold.jpg',
        moreInfo: 'https://www.axisbank.com/securegold'
      },
      {
        id: 'dg_paytm_gold',
        name: 'Paytm Gold',
        provider: 'Paytm',
        fees: '0%',
        features: ['Biodegradable gold coins benefit'],
        useCase: 'Convenient small gold investments.',
        image: 'http://example.com/paytmgold.jpg',
        moreInfo: 'https://paytm.com/digital-gold'
      }
    ]
  }
};


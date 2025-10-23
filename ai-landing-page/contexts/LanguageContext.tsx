"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navbar
    'nav.markets': 'Markets',
    'nav.predictions': 'Predictions',
    'nav.roadmap': 'Roadmap',
    'nav.chinese': '中文',
    'nav.english': 'EN',
    
    // Homepage
    'home.subtitle': 'The next-generation BNB prediction marketplace. Trade on the future.',
    'home.startTrading': 'Start Trading',
    'home.docs': 'Docs',
    'home.connect': 'Connect',
    
    // Roadmap
    'roadmap.title': 'Roadmap',
    'roadmap.subtitle': 'Building the future of decentralized prediction markets on BNB Smart Chain',
    'roadmap.legend.completed': 'Completed',
    'roadmap.legend.development': 'In Development',
    'roadmap.legend.planned': 'Planned',
    'roadmap.phase1.title': 'Foundation',
    'roadmap.phase1.status': 'COMPLETED',
    'roadmap.phase2.title': 'Enhanced Markets',
    'roadmap.phase2.status': 'IN DEVELOPMENT',
    'roadmap.phase3.title': 'Expansion',
    'roadmap.phase3.status': 'PLANNED',
    'roadmap.phase4.title': 'Ecosystem',
    'roadmap.phase4.status': 'FUTURE',
    'roadmap.phase1.feature1': 'Binary prediction markets for BNB, BTC, ETH',
    'roadmap.phase1.feature2': 'On-chain verified oracle feeds via Chainlink',
    'roadmap.phase1.feature3': 'Trustless smart contract-based betting system',
    'roadmap.phase1.feature4': 'Multi-language support (EN/中文)',
    'roadmap.phase1.feature5': 'Wallet integration with MetaMask',
    'roadmap.phase2.feature1': 'Full-fledged odds market with dynamic pricing',
    'roadmap.phase2.feature2': 'Native token launch for platform utility',
    'roadmap.phase2.feature3': 'Multiple time frames (1m, 5m, 15m, 1h, 4h, 1d)',
    'roadmap.phase2.feature4': 'Advanced charting and analytics',
    'roadmap.phase2.feature5': 'Mobile-optimized interface',
    'roadmap.phase3.feature1': 'Sports betting markets with on-chain verified results',
    'roadmap.phase3.feature2': 'Political and event-based predictions',
    'roadmap.phase3.feature3': 'Community-created markets using token collateral',
    'roadmap.phase3.feature4': 'Cross-chain support with verified oracle bridges',
    'roadmap.phase3.feature5': 'DAO governance for market creation',
    'roadmap.phase4.feature1': 'Revenue sharing for token holders',
    'roadmap.phase4.feature2': 'Premium features and subscriptions',
    'roadmap.phase4.feature3': 'API access for developers',
    'roadmap.phase4.feature4': 'White-label solutions for partners',
    'roadmap.phase4.feature5': 'Advanced risk management tools',
    
    // Predictions
    'predictions.title': 'Binary Predictions',
    'predictions.subtitle': 'Trade on the future of BNB, BTC, and ETH with binary prediction markets',
    'predictions.yes': 'YES',
    'predictions.no': 'NO',
    'predictions.current': 'Current',
    'predictions.target': 'Target',
    'predictions.volume': 'Volume',
    'predictions.users': 'Users',
    
    // Markets
    'markets.title': 'Prediction Markets',
    'markets.subtitle': 'Trade on the future of technology. Predict outcomes, earn rewards, and shape tomorrow\'s innovations.',
    
    // Coming Soon
    'comingSoon.title': 'Coming Soon',
    'comingSoon.description': 'Stay tuned for alpha release!',
    'comingSoon.alpha': 'Alpha Coming Soon',
    'comingSoon.backToHome': 'Back to Home',
    'comingSoon.followTwitter': 'Follow on X',
  },
  zh: {
    // Navbar
    'nav.markets': '市场',
    'nav.predictions': '预测',
    'nav.roadmap': '路线图',
    'nav.chinese': '中文',
    'nav.english': 'EN',
    
    // Homepage
    'home.subtitle': '下一代BNB预测市场。交易未来。',
    'home.startTrading': '开始交易',
    'home.docs': '文档',
    'home.connect': '连接',
    
    // Roadmap
    'roadmap.title': '路线图',
    'roadmap.subtitle': '在BNB智能链上构建去中心化预测市场的未来',
    'roadmap.legend.completed': '已完成',
    'roadmap.legend.development': '开发中',
    'roadmap.legend.planned': '计划中',
    'roadmap.phase1.title': '基础建设',
    'roadmap.phase1.status': '已完成',
    'roadmap.phase2.title': '增强市场',
    'roadmap.phase2.status': '开发中',
    'roadmap.phase3.title': '扩展',
    'roadmap.phase3.status': '计划中',
    'roadmap.phase4.title': '生态系统',
    'roadmap.phase4.status': '未来',
    'roadmap.phase1.feature1': 'BNB、BTC、ETH的二元预测市场',
    'roadmap.phase1.feature2': '通过Chainlink进行链上验证的预言机数据源',
    'roadmap.phase1.feature3': '基于智能合约的无信任投注系统',
    'roadmap.phase1.feature4': '多语言支持（英文/中文）',
    'roadmap.phase1.feature5': 'MetaMask钱包集成',
    'roadmap.phase2.feature1': '具有动态定价的完整赔率市场',
    'roadmap.phase2.feature2': '平台实用性的原生代币发布',
    'roadmap.phase2.feature3': '多个时间框架（1分钟、5分钟、15分钟、1小时、4小时、1天）',
    'roadmap.phase2.feature4': '高级图表和分析',
    'roadmap.phase2.feature5': '移动端优化界面',
    'roadmap.phase3.feature1': '具有链上验证结果的体育博彩市场',
    'roadmap.phase3.feature2': '政治和事件预测',
    'roadmap.phase3.feature3': '使用代币抵押的社区创建市场',
    'roadmap.phase3.feature4': '具有验证预言机桥的跨链支持',
    'roadmap.phase3.feature5': '市场创建的DAO治理',
    'roadmap.phase4.feature1': '代币持有者的收入分享',
    'roadmap.phase4.feature2': '高级功能和订阅',
    'roadmap.phase4.feature3': '开发者的API访问',
    'roadmap.phase4.feature4': '合作伙伴的白标解决方案',
    'roadmap.phase4.feature5': '高级风险管理工具',
    
    // Predictions
    'predictions.title': '二元预测',
    'predictions.subtitle': '通过二元预测市场交易BNB、BTC和ETH的未来',
    'predictions.yes': '是',
    'predictions.no': '否',
    'predictions.current': '当前',
    'predictions.target': '目标',
    'predictions.volume': '交易量',
    'predictions.users': '用户',
    
    // Markets
    'markets.title': '预测市场',
    'markets.subtitle': '交易技术未来。预测结果，获得奖励，塑造明天的创新。',
    
    // Coming Soon
    'comingSoon.title': '即将推出',
    'comingSoon.description': '敬请期待Alpha版本！',
    'comingSoon.alpha': 'Alpha即将推出',
    'comingSoon.backToHome': '返回首页',
    'comingSoon.followTwitter': '关注X',
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load language from localStorage on mount (client-side only)
  useEffect(() => {
    if (isClient) {
      const savedLanguage = localStorage.getItem('nomo-language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
        setLanguage(savedLanguage)
      }
    }
  }, [isClient])

  // Save language to localStorage when it changes (client-side only)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('nomo-language', language)
    }
  }, [language, isClient])

  const t = (key: string): string => {
    // Ensure we have a valid language and key
    if (!isClient) {
      return translations['en'][key as keyof typeof translations['en']] || key
    }
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

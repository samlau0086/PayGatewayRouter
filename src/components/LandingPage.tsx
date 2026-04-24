import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  Network,
  CreditCard,
  Lock,
  Languages
} from 'lucide-react';
import { motion } from 'motion/react';

const translations = {
  zh: {
    navFeatures: '功能特性',
    navSolutions: '解决方案',
    navPricing: '价格方案',
    login: '登录',
    getStarted: '立即开始',
    heroBadge: '下一代支付分流专家',
    heroTitle: '全自动 A/B 轮询',
    heroTitleHighlight: '资金隔离分发',
    heroTitleSystem: '系统',
    heroSub: '为高频业务设计的路由网关。通过多维度轮询算法分摊风险压力，内置核心隔离隔离层，确保每一笔交易都安全、可控、透明。',
    heroBtnDeploy: '免费部署测试',
    heroBtnDemo: '查看演示视频',
    featuresTitle: '专为复杂业务环境打造',
    featuresSub: '集成多种核心能力，助您在全球业务中保持稳定与安全',
    routingTitle: '多级智能路由',
    routingDesc: '内置四种负载均衡算法，可根据站点权重、当前各网关水位线实时分发请求，彻底告警「单点爆破」风险。',
    isolationTitle: '银行级核心隔离',
    isolationDesc: '独创的 A/B 隔离架构。业务端无需对接支付 API，通过 VortexPay 路由层实现完全解耦，保护您的资金结算端隐私。',
    dashboardTitle: '全链路实时大盘',
    dashboardDesc: '毫秒级更新的资金流向视图。完美支持跨币种汇总分析，让您对全球各业务线的进出账情况了如指掌。',
    solutionsTitle: '简单三步，',
    solutionsTitleSub: '构建您的私有支付网关池',
    step1Title: '部署 VortexPay 路由内核',
    step1Desc: '通过一键脚本或 Docker 部署至您的私有服务器，拥有完全的控制权。',
    step2Title: '接入业务 A 站 & 支付 B 站',
    step2Desc: '安装我们提供的专有插件，秒级同步站点状态与 API 鉴权。',
    step3Title: '开启自动化风控轮询',
    step3Desc: '配置分流权重，系统将根据您的规则自动调配流量，确保持续盈利。',
    pricingTitle: '针对不同规模的定价',
    pricingSub: '支持独立服务器授权及 SaaS 订阅模式',
    starter: '入门版 / Starter',
    professional: '企业版 / Professional',
    sourcePack: '源码授权 / Source Pack',
    mo: '/ 月',
    once: '/ 一次性',
    starterFeatures: ['支持最多 5 个 A 站接入', '无限 B 站网关数量', '基础轮询策略', '专属技术支持'],
    proFeatures: ['支持最多 25 个 A 站接入', '无限 B 站网关数量', '高级 Round-Robin 算法', '7*24 小时专属技术响应'],
    sourceFeatures: ['100% 完整源代码', '私有化二次开发权', '去中心化无限节点部署', '终身技术指导'],
    mostPopular: '最受欢迎 🔥',
    coreRecommend: '核心推荐',
    contactManager: '联系客服经理',
    footerTerms: '使用协议',
    footerPrivacy: '隐私政策',
    footerContact: '联系我们',
    syncSuccess: '同步成功'
  },
  en: {
    navFeatures: 'Features',
    navSolutions: 'Solutions',
    navPricing: 'Pricing',
    login: 'Login',
    getStarted: 'Get Started',
    heroBadge: 'Next-Gen Payment Routing Expert',
    heroTitle: 'Automated A/B Polling',
    heroTitleHighlight: 'Fund Isolation',
    heroTitleSystem: 'System',
    heroSub: 'Routing gateway designed for high-frequency business. Share risk pressure through multi-dimensional polling algorithms, built-in core isolation layer to ensure every transaction is safe, controllable, and transparent.',
    heroBtnDeploy: 'Free Deployment Test',
    heroBtnDemo: 'Watch Demo',
    featuresTitle: 'Built for Complex Environments',
    featuresSub: 'Integrated core capabilities to keep your global business stable and secure',
    routingTitle: 'Multi-level Smart Routing',
    routingDesc: 'Built-in four load balancing algorithms, real-time distribution based on site weight and gateway levels, eliminating "single point" risks.',
    isolationTitle: 'Bank-grade Isolation',
    isolationDesc: 'Original A/B isolation architecture. No direct payment API integration needed for business sites, fully decoupled via VortexPay routing layer.',
    dashboardTitle: 'Real-time Analytics',
    dashboardDesc: 'Millisecond-level fund flow updates. Perfect multi-currency analysis support, keeping you informed about all global business lines.',
    solutionsTitle: 'Three Simple Steps,',
    solutionsTitleSub: 'Build Your Private Payment Pool',
    step1Title: 'Deploy VortexPay Core',
    step1Desc: 'Deploy to your private server via one-click script or Docker with full control.',
    step2Title: 'Connect Business & Payment Sites',
    step2Desc: 'Install our proprietary plugins to sync site status and API authentication in seconds.',
    step3Title: 'Start Automated Routing',
    step3Desc: 'Configure weights and rules; the system automatically allocates traffic to ensure continuous profit.',
    pricingTitle: 'Pricing for Every Scale',
    pricingSub: 'Supports standalone server licensing and SaaS subscription models',
    starter: 'Starter Plan',
    professional: 'Professional Plan',
    sourcePack: 'Source Code License',
    mo: '/ mo',
    once: '/ once',
    starterFeatures: ['Up to 5 Business Sites', 'Unlimited Payment Gateways', 'Basic Polling Strategy', 'Dedicated Support'],
    proFeatures: ['Up to 25 Business Sites', 'Unlimited Payment Gateways', 'Advanced Round-Robin', '24/7 Priority Support'],
    sourceFeatures: ['100% Full Source Code', 'Private Customization Rights', 'Unlimited Node Deployment', 'Lifetime Technical Guidance'],
    mostPopular: 'MOST POPULAR 🔥',
    coreRecommend: 'Recommended',
    contactManager: 'Contact Manager',
    footerTerms: 'Terms of Service',
    footerPrivacy: 'Privacy Policy',
    footerContact: 'Contact Us',
    syncSuccess: 'Sync Success'
  }
};

export const LandingPage = () => {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const t = (key: keyof typeof translations['zh']) => translations[lang][key];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-indigo-200 shadow-lg">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">VortexPay</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">{t('navFeatures')}</a>
            <a href="#solutions" className="hover:text-indigo-600 transition-colors">{t('navSolutions')}</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">{t('navPricing')}</a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
               <button 
                 onClick={() => setLang('zh')}
                 className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'zh' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 中文
               </button>
               <button 
                 onClick={() => setLang('en')}
                 className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 EN
               </button>
            </div>
            <Button variant="ghost" className="font-bold text-slate-700 md:block hidden" onClick={() => window.location.href = '/admin'}>
              {t('login')}
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-lg shadow-indigo-100" onClick={() => window.location.href = '/admin'}>
              {t('getStarted')} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-6 tracking-widest uppercase border border-indigo-100">
              {t('heroBadge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
              {t('heroTitle')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">{t('heroTitleHighlight')}</span>{t('heroTitleSystem')}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed">
              {t('heroSub')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-14 px-10 text-lg font-bold shadow-xl shadow-indigo-200" onClick={() => window.location.href = '/admin'}>
                {t('heroBtnDeploy')}
              </Button>
              <Button size="lg" variant="outline" className="border-slate-200 hover:bg-slate-100 h-14 px-10 text-lg font-bold rounded-full">
                {t('heroBtnDemo')}
              </Button>
            </div>
            
            <div className="mt-20 relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-2">
                  <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200&h=600" alt="Dashboard Preview" className="rounded-xl w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">{t('featuresTitle')}</h2>
            <p className="text-slate-500 font-medium">{t('featuresSub')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('routingTitle')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('routingDesc')}
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('isolationTitle')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('isolationDesc')}
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('dashboardTitle')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('dashboardDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / How it works */}
      <section id="solutions" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
                {t('solutionsTitle')}<br />
                {t('solutionsTitleSub')}
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{t('step1Title')}</h4>
                    <p className="text-slate-500 text-sm">{t('step1Desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{t('step2Title')}</h4>
                    <p className="text-slate-500 text-sm">{t('step2Desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{t('step3Title')}</h4>
                    <p className="text-slate-500 text-sm">{t('step3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-x-2 flex">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">ROUTING_ENGINE_V2_ACTIVE</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between animate-pulse">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center"><Server className="w-4 h-4 text-indigo-400" /></div>
                         <div className="text-sm font-bold text-white">Ingress: GlobalSiteA.com</div>
                      </div>
                      <div className="text-[10px] bg-indigo-500/20 text-indigo-400 font-bold px-2 py-0.5 rounded uppercase">Inbound</div>
                    </div>
                    
                    <div className="py-2 flex justify-center">
                       <ArrowRight className="w-6 h-6 text-indigo-500 rotate-90" />
                    </div>

                    <div className="flex gap-4">
                      <div className="w-1/2 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                         <div className="text-[10px] font-bold text-emerald-400 mb-2">TARGET_B1 (35%)</div>
                         <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[70%]" />
                         </div>
                      </div>
                      <div className="w-1/2 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                         <div className="text-[10px] font-bold text-blue-400 mb-2">TARGET_B2 (65%)</div>
                         <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[40%]" />
                         </div>
                      </div>
                    </div>
                  </div>
               </div>
               {/* Floating elements */}
               <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce delay-700">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold">{t('syncSuccess')}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Callback push: 200 OK</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('pricingTitle')}</h2>
          <p className="text-slate-400 mb-16 max-w-xl mx-auto italic">{t('pricingSub')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card className="bg-slate-800 border-slate-700 text-white rounded-3xl overflow-hidden hover:scale-105 transition-transform">
               <CardContent className="p-10 text-left">
                  <div className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-xs">{t('starter')}</div>
                  <div className="text-4xl font-black mb-6">$39<span className="text-lg font-medium text-slate-500"> {t('mo')}</span></div>
                  <ul className="space-y-4 mb-10 text-slate-300 text-sm">
                    {t('starterFeatures').map((f, i) => (
                      <li key={i} className={`flex items-center gap-2 ${i === 3 ? 'opacity-30' : ''}`}><CheckCircle2 className="w-4 h-4 text-indigo-400" /> {f}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-white text-slate-900 border-none h-12 font-bold rounded-xl hover:bg-slate-100">{t('getStarted')}</Button>
               </CardContent>
             </Card>

             <Card className="bg-indigo-600 border-indigo-500 text-white rounded-3xl overflow-hidden scale-110 shadow-2xl z-10">
               <div className="bg-white text-indigo-600 py-1 text-center text-[10px] font-black uppercase tracking-[0.2em]">{t('mostPopular')}</div>
               <CardContent className="p-10 text-left">
                  <div className="text-white/80 font-bold mb-4 uppercase tracking-widest text-xs">{t('professional')}</div>
                  <div className="text-4xl font-black mb-6">$59<span className="text-lg font-medium text-white/50"> {t('mo')}</span></div>
                  <ul className="space-y-4 mb-10 text-white/90 text-sm">
                    {t('proFeatures').map((f, i) => (
                      <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-200" /> {f}</li>
                    ))}
                  </ul>
                  <Button className="w-full bg-white text-indigo-600 border-none h-12 font-bold rounded-xl hover:bg-slate-100">{t('coreRecommend')}</Button>
               </CardContent>
             </Card>

             <Card className="bg-slate-800 border-slate-700 text-white rounded-3xl overflow-hidden hover:scale-105 transition-transform">
               <CardContent className="p-10 text-left">
                  <div className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-xs">{t('sourcePack')}</div>
                  <div className="text-4xl font-black mb-6">$299<span className="text-lg font-medium text-slate-500"> {t('once')}</span></div>
                  <ul className="space-y-4 mb-10 text-slate-300 text-sm">
                     {t('sourceFeatures').map((f, i) => (
                      <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> {f}</li>
                    ))}
                  </ul>
                  <Button className="w-full border-white/20 border-2 bg-transparent text-white h-12 font-bold rounded-xl hover:bg-white/10">{t('contactManager')}</Button>
               </CardContent>
             </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 text-white p-1 rounded-md">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">VortexPay</span>
           </div>
           
           <div className="flex items-center space-x-8 text-slate-400 text-xs font-semibold">
              <a href="#" className="hover:text-slate-900">{t('footerTerms')}</a>
              <a href="#" className="hover:text-slate-900">{t('footerPrivacy')}</a>
              <a href="#" className="hover:text-slate-900">{t('footerContact')}</a>
           </div>

           <div className="text-slate-400 text-xs font-mono">
              © 2026 VORTEXPAY CORE SYSTEM. AUTHENTICATED GATEWAY.
           </div>
        </div>
      </footer>
    </div>
  );
};


import React from 'react';
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
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage = () => {
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
            <a href="#features" className="hover:text-indigo-600 transition-colors">功能特性</a>
            <a href="#solutions" className="hover:text-indigo-600 transition-colors">解决方案</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">价格方案</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="font-bold text-slate-700" onClick={() => window.location.href = '/admin'}>
              登录
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-lg shadow-indigo-100" onClick={() => window.location.href = '/admin'}>
              立即开始 <ArrowRight className="w-4 h-4 ml-2" />
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
              下一代支付分流专家
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
              全自动 A/B 轮询<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">资金隔离分发</span>系统
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed">
              为高频业务设计的路由网关。通过多维度轮询算法分摊风险压力，内置核心隔离隔离层，确保每一笔交易都安全、可控、透明。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-14 px-10 text-lg font-bold shadow-xl shadow-indigo-200" onClick={() => window.location.href = '/admin'}>
                免费部署测试
              </Button>
              <Button size="lg" variant="outline" className="border-slate-200 hover:bg-slate-100 h-14 px-10 text-lg font-bold rounded-full">
                查看演示视频
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">专为复杂业务环境打造</h2>
            <p className="text-slate-500 font-medium">集成多种核心能力，助您在全球业务中保持稳定与安全</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">多级智能路由</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                内置四种负载均衡算法，可根据站点权重、当前各网关水位线实时分发请求，彻底告警「单点爆破」风险。
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">银行级核心隔离</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                独创的 A/B 隔离架构。业务端无需对接支付 API，通过 VortexPay 路由层实现完全解耦，保护您的资金结算端隐私。
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">全链路实时大盘</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                毫秒级更新的资金流向视图。完美支持跨币种汇总分析，让您对全球各业务线的进出账情况了如指掌。
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
                简单三步，<br />
                构建您的私有支付网关池
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">部署 VortexPay 路由内核</h4>
                    <p className="text-slate-500 text-sm">通过一键脚本或 Docker 部署至您的私有服务器，拥有完全的控制权。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">接入业务 A 站 & 支付 B 站</h4>
                    <p className="text-slate-500 text-sm">安装我们提供的专有插件，秒级同步站点状态与 API 鉴权。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">开启自动化风控轮询</h4>
                    <p className="text-slate-500 text-sm">配置分流权重，系统将根据您的规则自动调配流量，确保持续盈利。</p>
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
                    <span className="text-xs font-bold">同步成功</span>
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
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">针对不同规模的定价</h2>
          <p className="text-slate-400 mb-16 max-w-xl mx-auto italic">支持独立服务器授权及 SaaS 订阅模式</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card className="bg-slate-800 border-slate-700 text-white rounded-3xl overflow-hidden hover:scale-105 transition-transform">
               <CardContent className="p-10 text-left">
                  <div className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-xs">入门版 / Starter</div>
                  <div className="text-4xl font-black mb-6">$199<span className="text-lg font-medium text-slate-500"> / mo</span></div>
                  <ul className="space-y-4 mb-10 text-slate-300 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 支持最多 5 个 A 站接入</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 无限 B 站网关数量</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 基础轮询策略</li>
                    <li className="flex items-center gap-2 opacity-30"><CheckCircle2 className="w-4 h-4" /> 专属技术支持</li>
                  </ul>
                  <Button className="w-full bg-white text-slate-900 border-none h-12 font-bold rounded-xl hover:bg-slate-100">立即开始</Button>
               </CardContent>
             </Card>

             <Card className="bg-indigo-600 border-indigo-500 text-white rounded-3xl overflow-hidden scale-110 shadow-2xl z-10">
               <div className="bg-white text-indigo-600 py-1 text-center text-[10px] font-black uppercase tracking-[0.2em]">MOST POPULAR 🔥</div>
               <CardContent className="p-10 text-left">
                  <div className="text-white/80 font-bold mb-4 uppercase tracking-widest text-xs">企业版 / Professional</div>
                  <div className="text-4xl font-black mb-6">$399<span className="text-lg font-medium text-white/50"> / mo</span></div>
                  <ul className="space-y-4 mb-10 text-white/90 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-200" /> 支持最多 25 个 A 站接入</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-200" /> 无限 B 站网关数量</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-200" /> 高级 Round-Robin 算法</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-200" /> 7*24 小时专属技术响应</li>
                  </ul>
                  <Button className="w-full bg-white text-indigo-600 border-none h-12 font-bold rounded-xl hover:bg-slate-100">核心推荐</Button>
               </CardContent>
             </Card>

             <Card className="bg-slate-800 border-slate-700 text-white rounded-3xl overflow-hidden hover:scale-105 transition-transform">
               <CardContent className="p-10 text-left">
                  <div className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-xs">源码授权 / Source Pack</div>
                  <div className="text-4xl font-black mb-6">$2,999<span className="text-lg font-medium text-slate-500"> / once</span></div>
                  <ul className="space-y-4 mb-10 text-slate-300 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 100% 完整源代码</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 私有化二次开发权</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 去中心化无限节点部署</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 终身技术指导</li>
                  </ul>
                  <Button className="w-full border-white/20 border-2 bg-transparent text-white h-12 font-bold rounded-xl hover:bg-white/10">联系客服经理</Button>
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
              <a href="#" className="hover:text-slate-900">使用协议</a>
              <a href="#" className="hover:text-slate-900">隐私政策</a>
              <a href="#" className="hover:text-slate-900">联系我们</a>
           </div>

           <div className="text-slate-400 text-xs font-mono">
              © 2026 VORTEXPAY CORE SYSTEM. AUTHENTICATED GATEWAY.
           </div>
        </div>
      </footer>
    </div>
  );
};


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView, UserStats, WithdrawalRequest } from './types';
import { geminiService } from './services/geminiService';
import AdBanner from './components/AdBanner';

const WITHDRAWAL_MIN = 20.00;
const HOURLY_RATE = 20.00;
const SECONDS_PER_HOUR = 3600;
const EARNING_PER_SEC = HOURLY_RATE / SECONDS_PER_HOUR;

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [stats, setStats] = useState<UserStats>({
    balance: 0.00,
    totalEarned: 0.00,
    tasksCompleted: 0,
    hourlyRate: HOURLY_RATE
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [activeTask, setActiveTask] = useState<any | null>(null);
  const [taskAnswer, setTaskAnswer] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawNetwork, setWithdrawNetwork] = useState('BEP20');
  const [showPopup, setShowPopup] = useState(false);
  const [history, setHistory] = useState<WithdrawalRequest[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Initial Load: Check if GH Pages or subpath (handled by simple state)
  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [view]);

  // Real-time Earnings Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        balance: prev.balance + EARNING_PER_SEC,
        totalEarned: prev.totalEarned + EARNING_PER_SEC
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Professional "Random" Popups for Ad Revenue simulation
  useEffect(() => {
    const triggerPopup = () => {
      if (!showPopup) {
        setShowPopup(true);
      }
      // Random interval between 45s and 90s
      setTimeout(triggerPopup, Math.random() * 45000 + 45000);
    };
    const initialTimer = setTimeout(triggerPopup, 30000);
    return () => clearTimeout(initialTimer);
  }, [showPopup]);

  const fetchTasks = useCallback(async () => {
    setLoadingTasks(true);
    const newTasks = await geminiService.generateTasks();
    setTasks(newTasks);
    setLoadingTasks(false);
  }, []);

  useEffect(() => {
    if (view === AppView.TASKS && tasks.length === 0) {
      fetchTasks();
    }
  }, [view, tasks.length, fetchTasks]);

  const handleTaskSubmit = async () => {
    if (!activeTask || !taskAnswer.trim()) return;
    setIsVerifying(true);
    const success = await geminiService.verifyTaskCompletion(activeTask.description, taskAnswer);
    
    if (success) {
      const reward = activeTask.reward || 5.00;
      setStats(prev => ({
        ...prev,
        balance: prev.balance + reward,
        totalEarned: prev.totalEarned + reward,
        tasksCompleted: prev.tasksCompleted + 1
      }));
      setActiveTask(null);
      setTaskAnswer('');
      fetchTasks();
    } else {
      alert("Verification failed. Our AI suggests providing more context for professional approval.");
    }
    setIsVerifying(false);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < WITHDRAWAL_MIN) {
      alert(`The minimum payout for professional tiers is $${WITHDRAWAL_MIN.toFixed(2)} USDT.`);
      return;
    }
    if (amount > stats.balance) {
      alert("Insufficient liquidity in your current wallet segment.");
      return;
    }
    if (!withdrawAddress.trim() || withdrawAddress.length < 20) {
      alert("Invalid Binance wallet address format. Please verify and try again.");
      return;
    }

    const newRequest: WithdrawalRequest = {
      id: "TX" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      amount: amount,
      address: withdrawAddress,
      network: withdrawNetwork,
      status: 'Pending',
      timestamp: new Date()
    };

    setHistory([newRequest, ...history]);
    setStats(prev => ({ ...prev, balance: prev.balance - amount }));
    setWithdrawAmount('');
    setWithdrawAddress('');
    alert("Withdrawal request dispatched to the Binance verification pool. Status: PENDING.");
  };

  const NavItem = ({ target, label, icon }: { target: AppView, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setView(target)}
      className={`relative flex items-center gap-4 px-6 py-4 w-full transition-all group overflow-hidden ${
        view === target ? 'text-[#fcd535]' : 'text-gray-500 hover:text-white'
      }`}
    >
      {view === target && (
        <motion.div 
          layoutId="activeNav"
          className="absolute left-0 w-1 h-2/3 bg-[#fcd535] rounded-r-full"
        />
      )}
      <div className={`transition-transform duration-300 ${view === target ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0e11] text-[#eaecef] selection:bg-[#fcd535] selection:text-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#fcd535] rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-72 bg-[#181a20]/80 backdrop-blur-xl border-r border-gray-800/50 fixed h-full hidden lg:block z-40">
        <div className="flex flex-col h-full">
          <div className="p-10">
            <div className="flex items-center gap-3 mb-12">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-[#fcd535] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(252,213,53,0.3)]"
              >
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4L34.3923 10V22L24 28L13.6077 22V10L24 4Z" fill="#181A20"/>
                </svg>
              </motion.div>
              <div>
                <span className="text-xl font-black text-white tracking-tighter uppercase italic">Earn<span className="text-[#fcd535]">Pro</span></span>
                <p className="text-[8px] text-gray-500 font-black tracking-[4px] uppercase -mt-1">Elite Platform</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <NavItem 
                target={AppView.DASHBOARD} 
                label="LIVE DASHBOARD" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} 
              />
              <NavItem 
                target={AppView.TASKS} 
                label="YIELD GENERATOR" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} 
              />
              <NavItem 
                target={AppView.WITHDRAW} 
                label="BINANCE PAYOUT" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} 
              />
              <NavItem 
                target={AppView.HISTORY} 
                label="ORDER HISTORY" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>} 
              />
            </nav>
          </div>

          <div className="mt-auto p-8">
            <div className="bg-[#fcd535] rounded-2xl p-6 text-black relative overflow-hidden group cursor-pointer shadow-xl">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-black/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <h4 className="font-black text-xs uppercase tracking-widest mb-1">Upgrade Tier</h4>
              <p className="text-[10px] font-bold opacity-80 leading-tight mb-4">Get $25/hr earning rate and instant verification.</p>
              <button className="w-full py-2 bg-black text-[#fcd535] text-[10px] font-black uppercase rounded-lg">Buy Premium</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 relative z-10 p-6 md:p-12 pb-32">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 animate-slide-up">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full border-2 border-[#fcd535]/30 p-1 bg-gradient-to-tr from-[#1e2329] to-[#2b3139]">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-full bg-gray-800" alt="Avatar" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">PREMIUM SESSION</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Verified Account • Tier 1</span>
              </div>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-6 glass p-6 rounded-3xl border border-[#fcd535]/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#fcd535]/5 rounded-full -mr-12 -mt-12"></div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-black tracking-[3px] uppercase mb-1">Total Assets</p>
              <p className="text-4xl font-black text-white font-mono tracking-tighter">
                {stats.balance.toFixed(4)}<span className="text-[#fcd535] ml-2 text-lg">USDT</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#fcd535] flex items-center justify-center text-black shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
          </motion.div>
        </header>

        <AdBanner type="leaderboard" />

        {/* View Transitioning with Framer Motion */}
        <AnimatePresence mode="wait">
          {view === AppView.DASHBOARD && (
            <motion.div 
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Stat Cards */}
              {[
                { label: 'YIELD VELOCITY', value: `$${stats.hourlyRate.toFixed(2)}/hr`, color: 'text-green-400', sub: 'Calculated in real-time' },
                { label: 'VERIFIED OPERATIONS', value: stats.tasksCompleted, color: 'text-white', sub: '+4.2% institutional growth' },
                { label: 'EQUITY WITHDRAWN', value: '$0.00', color: 'text-[#fcd535]', sub: '0.00% fees applied' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-3xl border border-white/5 shadow-xl relative group overflow-hidden"
                >
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                  </div>
                  <h3 className="text-gray-500 font-black text-[10px] tracking-[4px] uppercase mb-4 italic">{item.label}</h3>
                  <p className={`text-4xl font-black mb-2 ${item.color} tracking-tighter`}>{item.value}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.sub}</p>
                </motion.div>
              ))}

              <div className="md:col-span-2 glass rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex flex-col">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-black text-white italic tracking-tighter">MARKET EXECUTION LOG</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black rounded-full border border-green-500/20">LIVE FEED</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-crosshair border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-tight">System Payout Execution</p>
                          <p className="text-[9px] text-gray-500 font-mono">0x{Math.random().toString(16).substring(2, 8).toUpperCase()}... CONFIRMED</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-green-400 font-mono">+$0.0{Math.floor(Math.random()*90)+10}</p>
                        <p className="text-[8px] text-gray-500 font-bold">SECURE_TUNNEL</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <AdBanner type="sidebar" />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#fcd535] p-8 rounded-3xl text-black shadow-[0_20px_40px_rgba(252,213,53,0.2)] relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-2xl font-black mb-2 italic tracking-tighter">INSTANT WITHDRAW</h3>
                  <p className="text-sm font-bold opacity-80 mb-8 leading-tight">Your funds are protected by end-to-end institutional grade encryption. Minimum $20.00 USDT.</p>
                  <button 
                    onClick={() => setView(AppView.WITHDRAW)}
                    className="w-full py-4 bg-black text-[#fcd535] font-black uppercase text-xs tracking-[3px] rounded-2xl transition-all active:scale-95 shadow-lg"
                  >
                    Launch Payout Portal
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === AppView.TASKS && (
            <motion.div 
              key="tasks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-white italic tracking-tighter">YIELD GENERATOR</h2>
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[4px]">Verified high-impact professional tasks</p>
                </div>
                <button 
                  onClick={fetchTasks}
                  disabled={loadingTasks}
                  className="glass px-8 py-3 rounded-2xl text-[#fcd535] font-black text-xs uppercase tracking-widest hover:bg-[#fcd535] hover:text-black transition-all flex items-center gap-3 active:scale-95"
                >
                  <svg className={`w-4 h-4 ${loadingTasks ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  Sync Task Engine
                </button>
              </div>

              {loadingTasks ? (
                <div className="grid gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 glass animate-pulse rounded-3xl border border-white/5"></div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {tasks.map((task, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.01, x: 10 }}
                      className="glass p-8 rounded-3xl border border-white/5 hover:border-[#fcd535]/30 transition-all flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#fcd535] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-[#fcd535]/10 text-[#fcd535] text-[9px] font-black uppercase rounded-lg border border-[#fcd535]/20">{task.category}</span>
                          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest italic">EST: {task.timeEstimate}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase italic">{task.title}</h3>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-2xl">{task.description}</p>
                      </div>
                      <div className="text-center md:text-right flex flex-col items-center md:items-end gap-4 min-w-[160px]">
                        <div className="text-4xl font-black text-white font-mono tracking-tighter">${(task.reward || 5).toFixed(2)}</div>
                        <button 
                          onClick={() => setActiveTask(task)}
                          className="px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[3px] rounded-2xl hover:bg-[#fcd535] transition-all shadow-xl active:scale-95 whitespace-nowrap"
                        >
                          Execute Task
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {view === AppView.WITHDRAW && (
            <motion.div 
              key="withdraw"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass rounded-[40px] border border-white/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                <div className="p-12 border-b border-white/5">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-20 h-20 bg-[#fcd535] rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(252,213,53,0.3)] animate-float">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#181A20"/>
                        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#181A20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white italic tracking-tighter">BINANCE PAYOUT</h2>
                      <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[5px]">Institutional USD Gateway</p>
                    </div>
                  </div>

                  <div className="bg-[#181a20] p-8 rounded-3xl mb-12 flex items-center justify-between border border-white/5 shadow-inner">
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Portfolio Liquidity</p>
                      <p className="text-5xl font-black text-white font-mono tracking-tighter">
                        {stats.balance.toFixed(4)} <span className="text-[#fcd535] text-2xl uppercase italic">USDT</span>
                      </p>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Withdrawal Min</p>
                      <p className="text-2xl font-black text-white">${WITHDRAWAL_MIN.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Withdrawal Amount</label>
                        <div className="relative group">
                          <input 
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="w-full bg-[#181a20] border-2 border-transparent border-b-white/10 px-0 py-4 focus:border-b-[#fcd535] focus:outline-none transition-all font-mono text-2xl font-bold"
                            placeholder="0.00"
                          />
                          <button 
                            onClick={() => setWithdrawAmount(stats.balance.toString())}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#fcd535] text-[10px] font-black hover:scale-110 transition-transform tracking-widest"
                          >
                            MAX_ALL
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Asset Network</label>
                        <div className="flex gap-4">
                          {['BEP20', 'ERC20'].map(net => (
                            <button
                              key={net}
                              onClick={() => setWithdrawNetwork(net)}
                              className={`flex-1 py-4 rounded-2xl border font-black text-[10px] tracking-[2px] transition-all uppercase ${
                                withdrawNetwork === net 
                                  ? 'bg-[#fcd535] border-[#fcd535] text-black shadow-lg shadow-[#fcd535]/20' 
                                  : 'bg-[#181a20] border-white/5 text-gray-500 hover:bg-white/5'
                              }`}
                            >
                              {net}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Recipient Binance Address</label>
                      <input 
                        type="text"
                        value={withdrawAddress}
                        onChange={(e) => setWithdrawAddress(e.target.value)}
                        className="w-full bg-[#181a20] border-2 border-transparent border-b-white/10 px-0 py-4 focus:border-b-[#fcd535] focus:outline-none transition-all font-mono text-sm"
                        placeholder="Paste Binance address (USDT)..."
                      />
                      <div className="flex items-center gap-2 mt-4 text-[9px] text-gray-500 font-bold uppercase italic tracking-widest">
                        <svg className="w-3 h-3 text-[#fcd535]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                        Smart verification enabled. Double check network compatibility.
                      </div>
                    </div>

                    <button 
                      onClick={handleWithdraw}
                      className="w-full py-6 bg-[#fcd535] text-black font-black uppercase text-sm tracking-[5px] rounded-3xl hover:bg-white transition-all shadow-[0_20px_40px_rgba(252,213,53,0.3)] group overflow-hidden relative active:scale-95"
                    >
                      <span className="relative z-10">Authorize Transaction</span>
                      <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </button>
                  </div>
                </div>
                <div className="p-10 bg-[#181a20]/50 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'SECURITY', desc: 'Hardware-level encryption enabled' },
                    { title: 'LATENCY', desc: 'Estimated 0.2ms dispatch speed' },
                    { title: 'NETWORK', desc: 'Cross-chain bridging active' }
                  ].map((info, i) => (
                    <div key={i}>
                      <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 italic">{info.title}</h4>
                      <p className="text-[10px] font-bold text-white uppercase">{info.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === AppView.HISTORY && (
            <motion.div 
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-4xl font-black text-white italic tracking-tighter mb-10 uppercase">Order History</h2>
              <div className="glass rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gray-500 text-[9px] font-black uppercase tracking-[3px]">
                    <tr>
                      <th className="px-10 py-6">Reference ID</th>
                      <th className="px-10 py-6">Execution Date</th>
                      <th className="px-10 py-6">Quantum Amount</th>
                      <th className="px-10 py-6 text-right">Node Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {history.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-10 py-32 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-30">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <p className="text-xs font-black uppercase tracking-[5px]">Data Ledger Empty</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      history.map((item, idx) => (
                        <motion.tr 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="hover:bg-white/5 transition-colors cursor-crosshair"
                        >
                          <td className="px-10 py-8 font-mono text-sm text-[#fcd535] font-bold tracking-tighter">{item.id}</td>
                          <td className="px-10 py-8 text-[11px] text-gray-400 font-bold uppercase">{item.timestamp.toLocaleString()}</td>
                          <td className="px-10 py-8 font-black text-white text-xl tracking-tighter italic">${item.amount.toFixed(2)}</td>
                          <td className="px-10 py-8 text-right">
                            <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic border ${
                              item.status === 'Pending' 
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 animate-glow' 
                                : 'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Footer Ad (Sticky) */}
        <AdBanner type="sticky-footer" />
      </main>

      {/* Task Modal with Advanced Glassmorphism */}
      <AnimatePresence>
        {activeTask && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="glass border-2 border-white/10 w-full max-w-3xl rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-4xl font-black text-white italic tracking-tighter mb-4 uppercase">{activeTask.title}</h2>
                    <p className="text-gray-400 font-medium leading-relaxed max-w-xl">{activeTask.description}</p>
                  </div>
                  <div className="text-4xl font-black text-green-400 font-mono tracking-tighter">${(activeTask.reward || 5).toFixed(2)}</div>
                </div>

                <div className="bg-[#181a20] p-10 rounded-[30px] mb-10 border border-white/5 relative overflow-hidden group shadow-inner">
                  <div className="absolute top-0 right-0 w-2 h-full bg-[#fcd535] opacity-20"></div>
                  <p className="text-[#fcd535] font-black mb-4 uppercase text-[10px] tracking-[5px] italic">Execution Verification Required:</p>
                  <p className="text-2xl font-black text-white italic tracking-tight">{activeTask.verificationQuestion}</p>
                </div>

                <textarea 
                  className="w-full bg-[#0b0e11] border-2 border-white/5 rounded-[30px] p-8 min-h-[200px] focus:outline-none focus:border-[#fcd535] mb-10 transition-all font-medium text-lg placeholder:text-gray-700"
                  placeholder="Describe your execution process and findings for AI validation..."
                  value={taskAnswer}
                  onChange={(e) => setTaskAnswer(e.target.value)}
                />

                <div className="flex gap-6">
                  <button 
                    onClick={() => {
                      setActiveTask(null);
                      setTaskAnswer('');
                    }}
                    className="flex-1 py-5 text-gray-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
                  >
                    Abort Mission
                  </button>
                  <button 
                    onClick={handleTaskSubmit}
                    disabled={isVerifying || !taskAnswer.trim()}
                    className="flex-[2] py-5 bg-[#fcd535] text-black font-black uppercase text-xs tracking-[5px] rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95 disabled:opacity-30 disabled:pointer-events-none group relative overflow-hidden"
                  >
                    <span className="relative z-10">{isVerifying ? 'Validating Link...' : 'Confirm Submission'}</span>
                  </button>
                </div>
              </div>
              <div className="px-12 py-5 bg-[#181a20] flex items-center justify-between text-[9px] text-gray-500 font-black tracking-[4px] uppercase border-t border-white/5">
                <span>Quantum AI Engine Validating</span>
                <span>Tier 1 Clearance Only</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Ad Popups */}
      <AnimatePresence>
        {showPopup && <AdBanner type="popup" onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
      
      {/* Mobile Professional Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 flex justify-around py-4 px-2 z-50">
        {[
          { v: AppView.DASHBOARD, l: 'LIVE', i: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
          { v: AppView.TASKS, l: 'EARN', i: 'M13 10V3L4 14h7v7l9-11h-7z' },
          { v: AppView.WITHDRAW, l: 'PAYOUT', i: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
        ].map((item) => (
          <button 
            key={item.v}
            onClick={() => setView(item.v)} 
            className={`flex flex-col items-center gap-1 transition-all ${view === item.v ? 'text-[#fcd535]' : 'text-gray-500'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.i}/></svg>
            <span className="text-[9px] font-black tracking-widest uppercase italic">{item.l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;

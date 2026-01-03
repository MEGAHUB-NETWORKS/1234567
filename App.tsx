
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from './types';

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'GPT-5: The First Step Toward Recursive Self-Improvement',
    excerpt: 'OpenAI leaks suggest the next iteration focuses on "Reasoning-as-a-Service," allowing models to debug their own logic in real-time.',
    content: 'The architectural blueprint for the next generation of transformer models has been leaked...',
    category: 'AI TRENDS',
    date: 'JAN 03, 2026',
    author: 'NeuralScribe',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTime: '8 MIN'
  },
  {
    id: '2',
    title: 'The Sol-Fire Protocol: 2 Million TPS Benchmark Hit',
    excerpt: 'Solana’s latest update introduces parallel sharding that effectively removes the bottleneck of sequential execution.',
    content: 'Engineers have spent three years refining the network stack to handle unprecedented throughput...',
    category: 'BLOCKCHAIN',
    date: 'JAN 02, 2026',
    author: 'CryptoNode',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    readTime: '6 MIN'
  },
  {
    id: '3',
    title: 'Neuro-Holography: Visualizing Thought Patterns in Real-Time',
    excerpt: 'A new wearable headset can now project high-fidelity holograms of neural activity, revolutionizing mental health diagnostics.',
    content: 'Clinical trials have shown a 98% accuracy rate for simple linguistic intent...',
    category: 'NEUROTECH',
    date: 'JAN 01, 2026',
    author: 'SynapseX',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
    readTime: '10 MIN'
  },
  {
    id: '4',
    title: 'Post-Quantum Defense: The Great Cryptographic Reset',
    excerpt: 'As quantum computers approach stable qubit thresholds, the race to migrate to Lattice-based encryption enters its final phase.',
    content: 'The shift from user-driven browsing to agentic internet interaction is the primary focus of 2026...',
    category: 'CYBERSEC',
    date: 'DEC 31, 2025',
    author: 'GhostNode',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    readTime: '12 MIN'
  },
  {
    id: '5',
    title: 'Web4: When AI Becomes the Browser Itself',
    excerpt: 'Moving away from URLs to "Intent Strings." Learn how the browser is evolving into an autonomous agent.',
    content: 'The architectural shift from IPFS to AI-FS...',
    category: 'WEB3',
    date: 'DEC 30, 2025',
    author: 'Elena Vance',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTime: '7 MIN'
  },
  {
    id: '6',
    title: 'Humanoid Fleets: The Automation of General Labor',
    excerpt: 'Tesla and NVIDIA announce a joint venture to deploy 50,000 humanoid robots into global manufacturing hubs by Q3.',
    content: 'Impact on manufacturing and domestic labor...',
    category: 'ROBOTICS',
    date: 'DEC 29, 2025',
    author: 'MechMaster',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    readTime: '9 MIN'
  }
];

const App: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen selection:bg-cyan-500/40 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">N</div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">Neural<span className="text-cyan-500">Net</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
            {['Intelligence', 'Protocols', 'Wetware', 'Security'].map(item => (
              <a key={item} href="#" className="hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button className="px-8 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Access Terminal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
          >
            Terminal Status: Online • Decrypting Latest Signals
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-14 uppercase italic"
          >
            The Future <br/><span className="text-cyan-500 glow-text">is Code</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-2xl font-medium leading-relaxed mb-16">
            Analyzing the tectonic shifts in AI, Blockchain, and the neuro-tech frontier. High-frequency intelligence for a post-human economy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-14 py-6 bg-cyan-500 text-slate-950 font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-white transition-all shadow-2xl">
              Start Feed
            </button>
            <button className="w-full sm:w-auto px-14 py-6 border border-slate-800 text-white font-bold uppercase text-sm tracking-widest rounded-2xl hover:border-cyan-500 transition-all">
              Watch Node Live
            </button>
          </div>
        </div>
      </header>

      {/* Grid of Articles */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-8 mb-20">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Latest Intel Dispatches</h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTICLES.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="cyber-card group flex flex-col h-full rounded-[48px] overflow-hidden cursor-pointer"
              onClick={() => setActiveArticle(article)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-100" 
                />
                <div className="absolute top-8 left-8 px-4 py-1.5 glass text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-500/30 shadow-2xl">
                  {article.category}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-3xl font-black leading-[1.1] mb-6 group-hover:text-cyan-400 transition-colors uppercase italic tracking-tighter">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-10 flex-1 font-medium">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-cyan-400">
                      {article.author[0]}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{article.author}</span>
                  </div>
                  <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    READ INTEL →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* SEO Filler Text Section */}
      <section className="bg-slate-950/50 border-y border-white/5 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.6em] mb-16 text-center opacity-50">Global Intelligence Matrix Index</h2>
          <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed space-y-12 font-medium">
            <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter">The Convergence of Neural Agency and Decentralized Consensus</h3>
            <p>
              In the rapidly evolving landscape of contemporary technology, the emergence of Large Language Models (LLMs) has signaled a paradigm shift that extends far beyond simple natural language processing. As we delve into the nuances of AI trends, it becomes increasingly apparent that the trajectory of neural architectures is moving toward what industry experts define as "Agency Intelligence." Unlike previous iterations of automation, these modern systems exhibit traits of goal-oriented planning and autonomous execution. This transition is not merely technical but philosophical, as we grapple with the implications of delegating critical decision-making processes to algorithmic frameworks that operate at nanosecond speeds.
            </p>
            <p>
              Simultaneously, the maturation of blockchain protocols has provided a necessary counterweight to centralized digital power. The integration of zero-knowledge proofs (ZK-proofs) and sharding methodologies has finally addressed the "blockchain trilemma," allowing for scalability without sacrificing decentralization or security. As these two titans of tech—AI and Blockchain—begin to converge, we are witnessing the birth of the "Autonomous Economy." In this new era, smart contracts no longer just execute pre-defined logic; they serve as the foundational bedrock for AI agents to trade, negotiate, and settle transactions in a trustless environment. This synthesis is the catalyst for a global restructuring of financial incentives, leading to what many are calling the Great Digital Reset.
            </p>
            <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter">Quantum Resiliency: The New Strategic Frontier</h3>
            <p>
              The quest for the ultimate consensus mechanism has been the Holy Grail of the cryptographic world since the inception of Bitcoin in 2009. Moving from Proof-of-Work to Proof-of-Stake was a monumental leap in energy efficiency, yet the demand for high-throughput, low-latency transaction processing remains insatiable. Current trends in Layer-2 scaling solutions, such as Rollups and Sidechains, have provided temporary relief, but the true frontier lies in the development of Layer-0 protocols that unify disparate networks into a cohesive, interoperable mesh. The rise of multi-chain ecosystems suggests that the future is not about a "one chain to rule them all" philosophy, but rather a modular approach where specific chains handle specific functions—privacy, computation, storage, and liquidity—all while maintaining a shared state across the network.
            </p>
            <p>
              Furthermore, the democratization of mining through decentralized physical infrastructure networks (DePIN) is revolutionizing how we perceive hardware ownership. By incentivizing individuals to contribute GPU cycles, storage capacity, and network bandwidth to a global pool, we are creating a more resilient and censorship-resistant internet. This shift is particularly relevant as AI training requirements continue to skyrocket, demanding massive amounts of compute power that only a truly decentralized network can provide without succumbing to the monopolistic tendencies of cloud service giants.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-2xl">N</div>
              <span className="text-3xl font-black tracking-tighter uppercase text-white">Neural<span className="text-cyan-500">Net</span></span>
            </div>
            <p className="text-slate-500 max-w-sm mb-12 font-medium text-lg leading-relaxed">
              The definitive source for algorithmic intelligence and the future of human agency. Intelligence for the terminal age.
            </p>
            <div className="flex gap-4">
              {['X', 'TG', 'DC', 'GH'].map(s => (
                <a key={s} href="#" className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all font-black text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-10 italic">Intel Channels</h4>
            <ul className="space-y-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Neural Research</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Protocol Audits</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Silicon Leaks</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Quantum State</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-10 italic">Core Network</h4>
            <ul className="space-y-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">The Nexus Hub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Ledger</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Node Compliance</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terminal Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black text-slate-600 uppercase tracking-[0.5em]">
          <span>© 2026 NEURALNET MEDIA • ALL SIGNALS ENCRYPTED</span>
          <div className="flex items-center gap-10">
            <span>UPTIME: 99.99%</span>
            <span>NODES ACTIVE: 4,122</span>
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl overflow-y-auto px-6 py-24"
          >
            <div className="max-w-4xl mx-auto relative">
              <button 
                onClick={() => setActiveArticle(null)}
                className="fixed top-10 right-10 w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-cyan-500 hover:text-cyan-500 transition-all z-[110] shadow-2xl"
              >
                ✕
              </button>

              <div className="mb-20">
                <div className="px-5 py-2 bg-cyan-500/10 text-cyan-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-full border border-cyan-500/20 inline-block mb-12">
                  {activeArticle.category}
                </div>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-12 leading-[0.85]">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-12 text-[12px] font-bold text-slate-500 uppercase tracking-[0.4em]">
                  <span>BY {activeArticle.author}</span>
                  <span>{activeArticle.date}</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <img 
                src={activeArticle.image} 
                className="w-full aspect-video object-cover rounded-[64px] mb-20 border border-white/10 shadow-3xl" 
                alt="" 
              />

              <div className="prose prose-invert max-w-none text-slate-300 text-2xl leading-relaxed space-y-14 font-medium">
                <p className="text-white font-black text-3xl md:text-5xl italic tracking-tight border-l-8 border-cyan-500 pl-12 mb-20 leading-tight">
                  {activeArticle.excerpt}
                </p>
                <p>
                  As we integrate deeper layers of abstraction into our everyday computational tasks, the lines between user-intent and machine-autonomy begin to blur. The architectural implications of {activeArticle.category.toLowerCase()} suggest that we are moving toward a frictionless interface between thought and execution.
                </p>
                <div className="p-16 glass rounded-[56px] border border-cyan-500/10 italic text-white font-black text-4xl leading-tight text-center shadow-inner">
                  "The code isn't just a tool; it is the fundamental building block of the new digital sovereignty."
                </div>
                <p>
                  Our monitoring nodes have observed a significant uptick in cross-protocol communication, indicating that the siloed nature of early Web3 is rapidly giving way to a unified, AI-managed internet infrastructure. NeuralNet will continue to broadcast these signals as the situation evolves.
                </p>
              </div>

              <div className="mt-40 pt-20 border-t border-slate-900 flex flex-col items-center gap-12">
                <h4 className="text-white font-black uppercase text-sm tracking-[0.6em]">Transmit Transmission</h4>
                <div className="flex gap-8">
                  {['Encrypted', 'Broadcast', 'Direct'].map(s => (
                    <button key={s} className="px-14 py-5 bg-slate-900 rounded-3xl border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all text-[11px] font-black uppercase tracking-widest">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

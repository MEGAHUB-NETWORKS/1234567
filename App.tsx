
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from './types';

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Silicon Singularity: GPT-5 Architecture Revealed',
    excerpt: 'Leaked whitepapers from Project Strawberry suggest a fundamental shift from token prediction to reasoning-first neural fabrics.',
    content: 'The architectural blueprint for the next generation of transformer models has been leaked...',
    category: 'AI RESEARCH',
    date: 'JAN 03, 2026',
    author: 'Alex Rivera',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTime: '7 MIN'
  },
  {
    id: '2',
    title: 'Solana Hydra: Scaling to 5 Million Transactions per Second',
    excerpt: 'A deep dive into the Hydra parallel execution engine that claims to solve the blockchain trilemma once and for all.',
    content: 'Engineers have spent three years refining the network stack to handle unprecedented throughput...',
    category: 'BLOCKCHAIN',
    date: 'JAN 02, 2026',
    author: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    readTime: '5 MIN'
  },
  {
    id: '3',
    title: 'Bio-Digital Convergence: The First Non-Invasive Neural Link',
    excerpt: 'Using temporal interference stimulation, a Boston startup has achieved high-fidelity brain-to-text input without surgery.',
    content: 'Clinical trials have shown a 98% accuracy rate for simple linguistic intent...',
    category: 'NEUROTECH',
    date: 'JAN 01, 2026',
    author: 'Dr. James K.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
    readTime: '9 MIN'
  },
  {
    id: '4',
    title: 'Post-Quantum Defense: The Lattice Encryption Standard',
    excerpt: 'As quantum computers reach 10,000 stable qubits, the global financial system begins its most urgent upgrade.',
    content: 'The shift from user-driven browsing to agentic internet interaction is the primary focus of 2026...',
    category: 'CYBERSEC',
    date: 'DEC 31, 2025',
    author: 'Marcus Thorne',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    readTime: '11 MIN'
  },
  {
    id: '5',
    title: 'Web4: The Internet of Agents and Autonomous Wallets',
    excerpt: 'Moving beyond human-centric browsing to a protocol where AI agents negotiate and trade on our behalf.',
    content: 'The architectural shift from IPFS to AI-FS...',
    category: 'WEB3',
    date: 'DEC 30, 2025',
    author: 'Elena Vance',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTime: '6 MIN'
  },
  {
    id: '6',
    title: 'NVIDIA Project GR00T: The Humanoid Era Begins',
    excerpt: 'Foundation models for robotics have finally reached the physical layer, enabling mimicry of human labor at scale.',
    content: 'Impact on manufacturing and domestic labor...',
    category: 'ROBOTICS',
    date: 'DEC 29, 2025',
    author: 'Tyson Lee',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    readTime: '8 MIN'
  }
];

const App: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen selection:bg-cyan-500/40 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">N</div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">Neural<span className="text-cyan-500">Net</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-12 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            {['Intelligence', 'Infrastructure', 'Security', 'About'].map(item => (
              <a key={item} href="#" className="hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button className="px-8 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            Join the Nexus
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 relative overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            System Status: Optimal • Node ID: 0x88F2
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12 uppercase italic"
          >
            Intelligence <br/><span className="text-cyan-500 glow-text">Beyond Silicon</span>
          </motion.h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-2xl font-medium leading-relaxed mb-16">
            Analyzing the tectonic shifts in algorithmic sovereignty, neuro-tech convergence, and the future of human agency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-12 py-5 bg-cyan-500 text-slate-950 font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl">
              Launch Intelligence Feed
            </button>
            <button className="w-full sm:w-auto px-12 py-5 border border-slate-800 text-white font-bold uppercase text-sm tracking-widest rounded-2xl hover:border-cyan-500 transition-all hover:bg-slate-900">
              Technical Briefings
            </button>
          </div>
        </div>
      </header>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-6 mb-20">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase whitespace-nowrap">Latest Intel</h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ARTICLES.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="cyber-card group flex flex-col h-full rounded-[40px] overflow-hidden cursor-pointer"
              onClick={() => setActiveArticle(article)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-100" 
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 glass text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-500/20">
                  {article.category}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-2xl font-black leading-tight mb-6 group-hover:text-cyan-400 transition-colors uppercase italic tracking-tighter">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-1 font-medium">
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
                    Read Report →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Authority Section (Filler Text for Review) */}
      <section className="bg-slate-950 border-y border-white/5 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-16 text-center">Global Intelligence Index</h2>
          <div className="prose prose-invert max-w-none text-slate-400 font-medium leading-relaxed space-y-12">
            <div>
              <h3 className="text-white text-2xl font-black uppercase italic mb-6">The Emergence of Algorithmically Sovereign Entities</h3>
              <p>
                As we navigate the mid-2020s, the boundary between human-directed software and autonomous neural agency has effectively evaporated. The transition from Large Language Models (LLMs) to Agentic Reasoning Fabrics (ARFs) represents the most significant socioeconomic shift since the industrial revolution. Our research indicates that by late 2026, over 60% of digital capital allocation will be performed by autonomous entities operating on decentralized ledgers. This "Autonomous Economy" is powered by the synthesis of high-frequency AI computation and zero-knowledge blockchain proofs, ensuring that while the intelligence is centralized in neural clusters, the execution remains trustless and immutable.
              </p>
            </div>
            <div>
              <h3 className="text-white text-2xl font-black uppercase italic mb-6">Quantum Resiliency and the Cryptographic Horizon</h3>
              <p>
                The threat of "Q-Day"—the moment a quantum computer can break RSA-2048 encryption—has moved from a distant possibility to a strategic certainty. NeuralNet tracks the global migration toward lattice-based cryptography, a standard that ensures data remains secure against Shor’s algorithm. This transition is not just a technical upgrade; it is a fundamental restructuring of digital trust. Sovereign nations are racing to secure their critical infrastructure before the first stable quantum super-advantage is achieved. At NeuralNet, we provide the signal required to navigate this cryptographic landscape, ensuring that your data architecture is future-proofed against the quantum singularity.
              </p>
            </div>
            <div>
              <h3 className="text-white text-2xl font-black uppercase italic mb-6">The Embodiment Threshold: From Bits to Actuators</h3>
              <p>
                The final frontier of AI is no longer located behind a screen. The embodiment of foundation models in humanoid robotics marks the beginning of the "Actuator Age." By training in high-fidelity digital twins, neural controllers are mastering the complexities of physical interaction at a rate that bypasses biological evolution. We are seeing the first generation of multi-purpose domestic and industrial robots that can learn new tasks through visual imitation, effectively commoditizing physical labor. This disruption will require a new social contract, one where human-machine collaboration is the default mode of operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-xl">N</div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">Neural<span className="text-cyan-500">Net</span></span>
            </div>
            <p className="text-slate-500 max-w-sm mb-12 font-medium leading-relaxed">
              The world's leading intelligence node for the age of algorithmic governance and neuro-tech convergence. Established 2023.
            </p>
            <div className="flex gap-4">
              {['X', 'TG', 'DC', 'GH'].map(s => (
                <a key={s} href="#" className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all font-black text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8 italic">Channels</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Neural Research</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Audits</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Hardware Leaks</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Quantum State</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8 italic">Network</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Nexus</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Protocols</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Node</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
          <span>© 2026 NEURALNET MEDIA GROUP • ALL RIGHTS RESERVED</span>
          <span>ESTABLISHED 0x7E7 • UPTIME: 99.99%</span>
        </div>
      </footer>

      {/* Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl overflow-y-auto px-6 py-20"
          >
            <div className="max-w-3xl mx-auto relative">
              <button 
                onClick={() => setActiveArticle(null)}
                className="fixed top-10 right-10 w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-cyan-500 hover:text-cyan-500 transition-all z-[110]"
              >
                ✕
              </button>

              <div className="mb-16">
                <div className="px-4 py-1.5 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-cyan-500/20 inline-block mb-10">
                  {activeArticle.category}
                </div>
                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-10 leading-[0.9]">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-10 text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                  <span>BY {activeArticle.author}</span>
                  <span>{activeArticle.date}</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <img 
                src={activeArticle.image} 
                className="w-full aspect-video object-cover rounded-[50px] mb-16 border border-white/10 shadow-2xl" 
                alt="" 
              />

              <div className="prose prose-invert max-w-none text-slate-300 text-xl leading-relaxed space-y-12 font-medium">
                <p className="text-white font-black text-2xl md:text-3xl italic tracking-tight border-l-4 border-cyan-500 pl-10 mb-16">
                  {activeArticle.excerpt}
                </p>
                <p>
                  As we integrate deeper layers of abstraction into our everyday computational tasks, the lines between user-intent and machine-autonomy begin to blur. This article explores the hidden architecture of the latest developments in {activeArticle.category.toLowerCase()}.
                </p>
                <div className="p-12 glass rounded-[40px] border border-cyan-500/10 italic text-white font-bold text-2xl leading-tight text-center">
                  "The transformation is not just about speed, it is about the structural integrity of how we define digital agency in a post-human world."
                </div>
                <p>
                  Further analysis reveals that the transition toward decentralized intelligence is accelerating. By moving processing to the edge, we reduce latency while maintaining a unified global state. This balance is critical for real-time applications in robotics and neuro-technology.
                </p>
                <p>
                  Stay subscribed to NeuralNet for continued coverage as this situation develops. Our nodes are monitoring the situation across multiple global relay stations.
                </p>
              </div>

              <div className="mt-32 pt-16 border-t border-slate-900 flex flex-col items-center gap-10">
                <h4 className="text-white font-black uppercase text-xs tracking-[0.5em]">Transmit Intel</h4>
                <div className="flex gap-6">
                  {['Broadcast', 'Encrypted', 'Direct'].map(s => (
                    <button key={s} className="px-12 py-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all text-xs font-black uppercase tracking-widest">
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

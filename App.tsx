
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from './types';
import AdBanner from './components/AdBanner';

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'GPT-5 Leaks: The AGI Threshold is Closer Than We Thought',
    excerpt: 'Internal documents suggest a leap in reasoning capabilities that could automate 40% of coding tasks by 2026.',
    content: 'The architectural blueprint for the next generation of transformer models has been leaked...',
    category: 'AI TRENDS',
    date: 'OCT 24, 2025',
    author: 'CyberScribe',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTime: '6 MIN'
  },
  {
    id: '2',
    title: 'Solana 2.0: The End of Network Congestion Forever?',
    excerpt: 'The FireDancer validator is finally live on mainnet, promising 1 million TPS under stress tests.',
    content: 'Engineers have spent three years refining the network stack to handle unprecedented throughput...',
    category: 'BLOCKCHAIN',
    date: 'OCT 23, 2025',
    author: 'BlockMaster',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    readTime: '4 MIN'
  },
  {
    id: '3',
    title: 'Neuralink Competitor Unveils Non-Invasive Brain-to-Text Interface',
    excerpt: 'A new startup claims they can achieve 80 words per minute using only a sleek wearable headband.',
    content: 'Clinical trials have shown a 98% accuracy rate for simple linguistic intent...',
    category: 'NEUROTECH',
    date: 'OCT 22, 2025',
    author: 'Synapse',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
    readTime: '8 MIN'
  },
  {
    id: '4',
    title: 'Web4: The Autonomous Agency Layer Explained',
    excerpt: 'Moving beyond static pages to decentralized AI agents that negotiate deals while you sleep.',
    content: 'The shift from user-driven browsing to agentic internet interaction is the primary focus of 2026...',
    category: 'WEB3',
    date: 'OCT 21, 2025',
    author: 'DecentralProxy',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTime: '10 MIN'
  },
  {
    id: '5',
    title: 'Quantum Advantage Hit by Google’s New Sycamore Processor',
    excerpt: 'The latest benchmark shows a calculation taking 3 seconds that would take top supercomputers 50,000 years.',
    content: 'Quantum decoherence remains a challenge, but the error-correction breakthrough is significant...',
    category: 'QUANTUM',
    date: 'OCT 20, 2025',
    author: 'AtomQ',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    readTime: '7 MIN'
  },
  {
    id: '6',
    title: 'NVIDIA Enters the Humanoid Robot Market',
    excerpt: 'The "Project GR00T" initiative reveals a software-defined robot capable of mimicking human gestures perfectly.',
    content: 'By integrating LLMs directly into the motor cortex of synthetic beings, the barrier is broken...',
    category: 'ROBOTICS',
    date: 'OCT 19, 2025',
    author: 'MechGeek',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    readTime: '5 MIN'
  }
];

const App: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-gray-950 text-2xl shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">N</div>
            <span className="text-xl font-bold tracking-tighter uppercase">Neural<span className="text-cyan-500">Net</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            {['Intelligence', 'Protocols', 'Wetware', 'Quantum'].map(item => (
              <a key={item} href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
            ))}
          </div>
          <button className="px-6 py-2.5 bg-cyan-500 text-gray-950 text-xs font-black uppercase tracking-widest rounded-full hover:bg-white transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            Access Terminal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            Terminal Update v.2.4.0 — LIVE
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 italic"
          >
            THE FUTURE IS <br/><span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">ALGORITHMIC</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium mb-12 leading-relaxed">
            NeuralNet delivers high-frequency intelligence on the tectonic shifts in AI, Blockchain, and the quantum frontier. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-12 py-5 bg-white text-gray-950 font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-cyan-400 transition-all shadow-xl">
              Start Intelligence Feed
            </button>
            <button className="w-full sm:w-auto px-12 py-5 border border-gray-700 text-white font-bold uppercase text-sm tracking-widest rounded-2xl hover:border-cyan-500 transition-all">
              Watch Node Live
            </button>
          </div>
        </div>
      </section>

      {/* BANNER AD 1 HERE */}
      <div className="max-w-7xl mx-auto px-4 my-16">
        <AdBanner type="leaderboard" />
      </div>

      {/* Grid of Articles */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-black italic tracking-tighter shrink-0">CORE INTEL</h2>
          <div className="h-px w-full bg-gradient-to-r from-gray-800 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ARTICLES.map((article, idx) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="neon-border bg-gray-900/40 rounded-[32px] overflow-hidden group flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6 px-3 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {article.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-2xl font-black leading-tight mb-4 group-hover:text-cyan-400 transition-colors italic tracking-tighter">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] font-black text-cyan-500">
                      {article.author[0]}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{article.author}</span>
                  </div>
                  <button 
                    onClick={() => setActiveArticle(article)}
                    className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group/btn"
                  >
                    READ INTEL <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEO 1,000 WORDS FILLER TEXT SECTION */}
      <section className="bg-gray-900/30 border-y border-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-12 text-center opacity-50">Global Intelligence Context</div>
          <div className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed space-y-10 font-medium">
            <h4 className="text-gray-200 text-lg font-bold">The Convergence of AI and Decentralized Consensus</h4>
            <p>
              In the current technological epoch, the emergence of Large Language Models (LLMs) and advanced neural architectures has created a seismic shift in how we perceive digital intelligence. As we navigate the complex landscape of 2025, the concept of "Neural Agency" has become the focal point of both industrial research and ethical debate. It is no longer sufficient to view AI as a passive tool; we are witnessing the transition toward autonomous digital entities capable of high-level reasoning and goal-oriented execution. This evolution is driven by the massive influx of capital into specialized silicon, where NPUs (Neural Processing Units) are replacing traditional computing paradigms to handle sparse matrix operations at terahertz scales.
            </p>
            <p>
              Simultaneously, the maturation of blockchain technology has provided the necessary infrastructure for these autonomous agents to operate within a trustless environment. By utilizing zero-knowledge proofs (ZKPs) and sharded ledger architectures, protocols are finally overcoming the scalability trilemma that plagued early implementations. The integration of AI agents into smart contracts allows for dynamic, context-aware execution of decentralized logic, giving rise to the "Autonomous Economy." In this new model, financial transactions are not just programmed but negotiated in real-time by algorithmic entities, ensuring optimal liquidity and capital efficiency across global markets.
            </p>
            
            <h4 className="text-gray-200 text-lg font-bold">Quantum Computing and the Cryptographic Horizon</h4>
            <p>
              The specter of "Quantum Advantage" has moved from theoretical physics to practical engineering benchmarks. As companies like Google and IBM push the limits of qubit coherence and error correction, the traditional foundations of cryptography are under direct threat. The transition to Post-Quantum Cryptography (PQC) is no longer a luxury but a strategic necessity for sovereign states and global corporations. We are seeing a rapid deployment of lattice-based encryption methods designed to withstand the Shor-algorithm attacks that could potentially compromise the entire existing digital security infrastructure. This race toward quantum resilience is defining the next decade of cyber-security protocols.
            </p>
            <p>
              Furthermore, the development of quantum sensing and networking is paving the way for the "Quantum Internet." By leveraging entanglement for secure data transmission, we can achieve a level of privacy that is fundamentally guaranteed by the laws of physics. This is particularly relevant for the decentralized finance sector, where the security of private keys is the ultimate arbiter of ownership. The synergy between quantum-secure communication and blockchain immutability represents the pinnacle of current technological aspirations.
            </p>

            <h4 className="text-gray-200 text-lg font-bold">Humanoid Robotics and the Physical Layer of AI</h4>
            <p>
              While digital intelligence continues its exponential growth, the challenge of embodiment remains. The recent breakthroughs in humanoid robotics, particularly in actuators and synthetic muscle fibers, are finally allowing AI to interact with the physical world with human-like dexterity. Projects like NVIDIA's GR00T and Tesla's Optimus are not merely mechanical engineering feats; they are the physical manifestation of multi-modal foundation models. These robots learn through imitation and reinforcement in synthetic simulations (digital twins) before being deployed to real-world environments, a process that drastically accelerates their capability curve.
            </p>
            <p>
              As these units integrate into the workforce, the socioeconomic implications are profound. We are looking at a restructuring of the manufacturing, logistics, and domestic labor sectors. The discussion around Universal Basic Income (UBI) is shifting toward "Universal Basic Compute," where access to algorithmic resources becomes a fundamental right. NeuralNet continues to track these developments, providing the signal amidst the noise as we approach the singularity threshold. Our commitment is to provide rigorous, high-frequency intelligence for those who demand to see the code behind the curtain.
            </p>
            <p className="italic opacity-60">
              Note: This intelligence brief is updated hourly as new telemetry data arrives from our global monitoring nodes. NeuralNet utilizes a proprietary ensemble of AI models to verify all incoming signals before publication.
            </p>
          </div>
        </div>
      </section>

      {/* BANNER AD 2 HERE */}
      <div className="max-w-7xl mx-auto px-4 my-24">
        <AdBanner type="sticky-footer" />
      </div>

      {/* Footer */}
      <footer className="bg-[#030712] border-t border-gray-900 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-gray-950 text-xl">N</div>
              <span className="text-xl font-bold tracking-tighter uppercase">Neural<span className="text-cyan-500">Net</span></span>
            </div>
            <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-medium">
              The world's leading intelligence node for the age of algorithmic governance and neuro-tech convergence. Established in the late analog era for the digital future.
            </p>
            <div className="flex gap-4">
              {['X', 'TG', 'DC', 'GH'].map(s => (
                <a key={s} href="#" className="w-10 h-10 rounded-xl bg-gray-900/50 border border-gray-800 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all font-black text-xs">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 italic underline decoration-cyan-500 underline-offset-8">Directives</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Neural Research</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Audits</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Silicon Leaks</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Quantum State</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 italic underline decoration-purple-500 underline-offset-8">Corporate</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">The Nexus</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Signal</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Node</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
          <span>© 2025 NEURALNET GLOBAL MEDIA • ALL SIGNALS ENCRYPTED</span>
          <div className="flex items-center gap-6">
            <span>Uptime: 99.99%</span>
            <span>Latency: 12ms</span>
          </div>
        </div>
      </footer>

      {/* Article Detail View Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-24 relative">
              <button 
                onClick={() => setActiveArticle(null)}
                className="fixed top-10 right-10 w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-white hover:border-cyan-500 hover:text-cyan-500 transition-all z-[110] shadow-xl"
              >
                ✕
              </button>
              
              <div className="mb-12">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="px-4 py-1.5 bg-cyan-500 text-gray-950 text-[10px] font-black uppercase tracking-[0.3em] rounded-full inline-block mb-8"
                >
                  {activeArticle.category}
                </motion.div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 leading-[0.9]"
                >
                  {activeArticle.title}
                </motion.h2>
                <div className="flex items-center gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                  <span>BY {activeArticle.author}</span>
                  <span>{activeArticle.date}</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <motion.img 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={activeArticle.image} 
                className="w-full h-[500px] object-cover rounded-[48px] mb-16 border border-gray-800 shadow-2xl" 
                alt="" 
              />

              <div className="prose prose-invert max-w-none text-gray-300 text-xl leading-relaxed space-y-10 font-medium">
                <p className="text-white font-black text-2xl md:text-3xl italic tracking-tight leading-tight border-l-4 border-cyan-500 pl-8">
                  {activeArticle.excerpt}
                </p>
                <p>
                  The fundamental shift in how we perceive computation began in the early 20s, but it is only now, in late 2025, that the architectural implications are becoming clear. As we transition from general-purpose silicon to specialized neural fabrics, the latency of thought is rapidly approaching the speed of light.
                </p>
                <p>
                  This briefing examines the telemetry data gathered from the latest mainnet deployments. We have observed a 400% increase in autonomous cross-chain transactions, signaling that AI agents are no longer just monitoring markets—they are defining them.
                </p>
                <div className="p-12 bg-gradient-to-br from-gray-900 to-gray-950 rounded-[40px] border border-gray-800 italic text-white font-bold text-2xl leading-tight shadow-inner">
                  "We aren't just building tools anymore. We are building the substrate for a new type of biological-digital hybrid intelligence."
                </div>
                <p>
                  As the quantum advantage threshold is crossed, existing encryption standards will become legacy overnight. The urgency of migrating to lattice-based systems cannot be overstated. NeuralNet remains at the forefront of this transition, ensuring our readers have the intelligence required to survive the cryptographic fallout.
                </p>
              </div>

              <div className="mt-32 pt-16 border-t border-gray-900">
                <div className="flex flex-col items-center gap-10">
                  <h4 className="text-white font-black uppercase text-sm tracking-[0.5em]">Transmit Intel</h4>
                  <div className="flex gap-6">
                    {['Encrypted Share', 'Node Broadcast', 'Signal Protocol'].map(s => (
                      <button key={s} className="px-10 py-3 bg-gray-900 rounded-2xl border border-gray-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-500 transition-all text-xs font-black uppercase tracking-widest">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad Popups */}
      <AnimatePresence>
        {showPopup && (
          <AdBanner type="popup" onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

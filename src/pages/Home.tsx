import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  Bell, 
  Calendar, 
  MessageSquare, 
  BookOpen,
  Users, 
  Trophy, 
  Code, 
  ShieldCheck,
  ChevronRight,
  Terminal,
  Activity,
  PlayCircle,
  Sparkles,
  Layers,
  Flame,
  Zap,
  Cpu
} from 'lucide-react';

import { HERO_DATA, HOME_FEATURES, ACONTECENDO_AGORA, STATS } from '../data/mockData';
import { NeonButton } from '../components/NeonButton';
import { CyberCard } from '../components/CyberCard';
import { CajooLaptopIllustration } from '../components/CajooLaptopIllustration';
import { HeroParticles } from '../components/HeroParticles';
import { FadeInSection } from '../components/FadeInSection';

export const Home: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ExternalLink: (
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        <ExternalLink className="w-5 h-5 text-zinc-300 group-hover:text-purple-400 transition-colors" />
      </div>
    ),
    Bell: (
      <div className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
      </div>
    ),
    Calendar: (
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        <Calendar className="w-5 h-5 text-zinc-300 group-hover:text-purple-400 transition-colors" />
      </div>
    ),
    MessageSquare: (
      <div className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
        <MessageSquare className="w-5 h-5 text-zinc-300 group-hover:text-purple-400 transition-colors" />
      </div>
    ),
    BookOpen: (
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        <BookOpen className="w-5 h-5 text-zinc-300 group-hover:text-purple-400 transition-colors" />
      </div>
    ),
    Users: (
      <div className="transition-transform duration-300 group-hover:scale-115">
        <Users className="w-6 h-6 text-zinc-300 group-hover:text-purple-400 transition-colors" />
      </div>
    ),
    Trophy: (
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115">
        <Trophy className="w-6 h-6 text-zinc-300 group-hover:text-amber-400 transition-colors" />
      </div>
    ),
    Code: (
      <div className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-115">
        <Code className="w-6 h-6 text-zinc-300 group-hover:text-purple-400 transition-colors" />
      </div>
    ),
    ShieldCheck: (
      <div className="transition-transform duration-300 group-hover:scale-115">
        <ShieldCheck className="w-6 h-6 text-zinc-300 group-hover:text-indigo-400 transition-colors" />
      </div>
    ),
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-28">
      
      {/* HERO SECTION - Sleek Rounded Minimal Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#07050e] border border-purple-900/40 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Radial Highlight - Pulsing slowly */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-125 h-125 bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" 
          />

          {/* Floating Subtle Particles System */}
          <HeroParticles />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Text & Buttons */}
            <div className="lg:col-span-6 space-y-6">
              {/* Title & Subtitle - Surge da Esquerda */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                  <span>Bem-vindo ao </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
                    CAJOO
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-xl">
                  Representamos, conectamos e apoiamos os estudantes de Ciência da Computação com eventos, recursos acadêmicos e iniciativas que fortalecem a nossa comunidade.
                </p>
              </motion.div>

              {/* Action Buttons - Sobem de Baixo */}
              <motion.div 
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link to="/recursos">
                  <button className="px-7 py-3.5 rounded-full font-sans font-semibold text-xs sm:text-sm text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 active:scale-[0.98] transition-all flex items-center gap-2.5">
                    <span>Acessar Recursos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to="/ca">
                  <button className="px-6 py-3.5 rounded-full font-sans font-semibold text-xs sm:text-sm text-zinc-300 hover:text-white bg-zinc-900/90 border border-zinc-700/80 hover:border-zinc-500 active:scale-[0.98] transition-all flex items-center gap-2.5">
                    <PlayCircle className="w-4 h-4 text-purple-400" />
                    <span>Conhecer o CAJOO</span>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Laptop 3D Artwork - Surge da Direita */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end overflow-visible">
              <motion.div 
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-162.5 lg:max-w-200 xl:max-w-220"
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative group w-full"
                >
                  <CajooLaptopIllustration className="w-full" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION: ECOSSISTEMA CAJOO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeInSection direction="up">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[11px] font-bold tracking-widest text-purple-400 uppercase font-sans inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              Ecossistema CAJOO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5">
              <Layers className="w-7 h-7 text-purple-400 animate-pulse hidden sm:inline-block" />
              <span>Tudo em um só lugar</span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed font-sans">
              Serviços e módulos construídos pensando na rotina do estudante de computação.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {HOME_FEATURES.map((feature, idx) => (
            <FadeInSection key={feature.id} delay={idx * 80} direction="up">
              <Link to={feature.link} className="block h-full group">
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#0a0a0f] border border-zinc-800/70 hover:border-zinc-700/90 transition-all duration-300 transform group-hover:scale-[1.03] group-hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/40 hover:bg-[#0f0e17] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-center text-zinc-300 group-hover:border-zinc-700 transition-colors">
                      {iconMap[feature.iconName]}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform pt-2">
                    <span>Acessar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* SECTION: ACONTECENDO AGORA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <FadeInSection direction="up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
              <span>Acontecendo Agora</span>
            </h2>
            
            <Link to="/comunicados" className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group">
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ACONTECENDO_AGORA.map((item, idx) => (
            <FadeInSection key={item.id} delay={idx * 100} direction="up">
              <Link to={item.link} className="block group h-full">
                <div className="h-full p-5 rounded-2xl bg-[#0c0c12]/80 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 transform group-hover:scale-[1.03] group-hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/30 hover:bg-[#101018] flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500 font-mono">{item.date}</span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform pt-2">
                    <span>{item.buttonText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* SECTION: CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection direction="up">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-r from-[#0d0a18] via-[#0a0a12] to-[#08080f] border border-zinc-800/80 text-center space-y-6 overflow-hidden">
            <div className="max-w-xl mx-auto space-y-3 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Faça parte da comunidade do CAJOO
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Representatividade, inovação e suporte contínuo para o seu crescimento acadêmico e profissional em Ciência da Computação.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-2">
              <Link to="/ca">
                <button className="px-6 py-3 rounded-xl font-sans font-bold text-xs text-white bg-linear-to-r from-purple-600 to-indigo-600 border border-purple-400/20 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Conhecer o Centro Acadêmico</span>
                </button>
              </Link>
              <Link to="/contato">
                <button className="px-6 py-3 rounded-xl font-sans font-bold text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Fale Conosco</span>
                </button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

    </div>
  );
};



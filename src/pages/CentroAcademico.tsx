import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Target, 
  Eye, 
  Heart, 
  History, 
  Terminal,
  Code2,
  HeartHandshake,
  FolderArchive
} from 'lucide-react';

import { DIRETORIA, CA_ACTIVITIES } from '../data/mockData';
import { CyberCard } from '../components/CyberCard';
import { HeroParticles } from '../components/HeroParticles';
import { FadeInSection } from '../components/FadeInSection';

export const CentroAcademico: React.FC = () => {
  const activityIconMap: Record<string, React.ReactNode> = {
    Terminal: <Terminal className="w-6 h-6 text-purple-400" />,
    Code2: <Code2 className="w-6 h-6 text-cyan-400" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-fuchsia-400" />,
    FolderArchive: <FolderArchive className="w-6 h-6 text-blue-400" />
  };

  const valores = [
    { icon: <Target className="w-6 h-6 text-cyan-400" />, title: 'Missão', desc: 'Representar os acadêmicos de Ciência da Computação, garantindo direitos, qualidade no ensino e integração da comunidade.' },
    { icon: <Eye className="w-6 h-6 text-purple-400" />, title: 'Visão', desc: 'Ser referência em gestão estudantil, promovendo liderança tech, inovação científica e excelência no acolhimento.' },
    { icon: <Heart className="w-6 h-6 text-fuchsia-400" />, title: 'Valores', desc: 'Transparência, Ética, Inclusão, Espírito de Equipe, Paixão por Tecnologia e Responsabilidade Social.' }
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HERO SECTION - Landing Pattern */}
      <section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-[#07050e] border border-purple-900/40 overflow-hidden shadow-2xl text-center space-y-4"
        >
          {/* Ambient Glows */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-112.5 h-112.5 bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" 
          />

          <HeroParticles />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Centro Acadêmico <span className="bg-linear-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">CAJOO</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              A voz, o suporte e a energia da comunidade de Ciência da Computação.
            </p>
          </div>
        </motion.div>
      </section>

      {/* MISSÃO, VISÃO E VALORES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {valores.map((item) => (
          <CyberCard key={item.title} glowColor="mixed" className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mx-auto">
              {item.icon}
            </div>
            <h3 className="text-xl font-mono font-bold text-white">{item.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{item.desc}</p>
          </CyberCard>
        ))}
      </section>

      {/* HISTÓRIA DO CAJOO */}
      <section className="glass-panel-neon rounded-3xl p-8 sm:p-10 border border-purple-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-mono font-bold text-white">Nossa História</h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
          Fundado pela união das primeiras turmas de Ciência da Computação, o CAJOO nasceu da necessidade de criar um canal direto entre estudantes e a direção do campus. Desde a sua criação, o Centro Acadêmico tem atuado fortemente na conquista de melhorias nos laboratórios de informática, ampliação do acervo de livros da biblioteca, além de ser o principal organizador da Semana Acadêmica de Ciência da Computação e dos Hackathons de inovação.
        </p>
      </section>

      {/* DIRETORIA ATUAL - NOSSA GESTÃO */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
            NOSSA GESTÃO <span className="text-purple-400">2026</span>
          </h2>
          <div className="flex-1 h-px bg-zinc-800/80 hidden sm:block" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-6 sm:gap-x-8 items-start justify-items-center">
          {DIRETORIA.map((membro) => (
            <div key={membro.id} className="flex flex-col items-center group text-center max-w-40">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-linear-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 shadow-xl group-hover:border-purple-500/60 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300">
                <img 
                  src={membro.photoUrl} 
                  alt={membro.name} 
                  className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="text-base font-bold text-white mt-4 tracking-tight group-hover:text-purple-300 transition-colors">
                {membro.name}
              </h3>
              
              <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-zinc-400 uppercase mt-1">
                {membro.role}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* COMO PARTICIPAR */}
      <section>
        <CyberCard glowColor="purple" className="p-8 sm:p-10 border border-purple-500/30 text-center space-y-6 max-w-4xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">Como participar</h2>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Qualquer aluno pode colaborar
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans max-w-2xl mx-auto">
              O Centro Acadêmico é construído pelos estudantes e para os estudantes. Se você deseja contribuir com ideias, participar da organização de eventos ou fazer parte da equipe, entre em contato conosco.
            </p>
          </div>
        </CyberCard>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Brain, 
  Layout, 
  Shield, 
  Server, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Award,
  Clock,
  FileText,
  Calendar,
  Layers
} from 'lucide-react';

import { COURSE_AREAS, COURSE_SEMESTERS, CURRICULUM_SUMMARY } from '../data/mockData';
import { CyberCard } from '../components/CyberCard';
import { FadeInSection } from '../components/FadeInSection';
import { HeroParticles } from '../components/HeroParticles';

export const SobreCurso: React.FC = () => {
  const [openSemester, setOpenSemester] = useState<number | null>(1);

  const iconMap: Record<string, React.ReactNode> = {
    Brain: (
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        <Brain className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      </div>
    ),
    Layout: (
      <div className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
        <Layout className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
      </div>
    ),
    Shield: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <Shield className="w-8 h-8 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
      </div>
    ),
    Server: (
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        <Server className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
      </div>
    )
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
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
              Sobre o Curso de <span className="bg-linear-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Ciência da Computação</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              Formando profissionais capazes de solucionar problemas complexos, liderar inovação tecnológica e transformar o futuro digital.
            </p>
          </div>
        </motion.div>
      </section>

      {/* VISÃO GERAL E OBJETIVOS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeInSection direction="left">
          <CyberCard glowColor="purple" className="space-y-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-mono font-bold text-white">O que é a Ciência da Computação?</h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              A Ciência da Computação estuda os fundamentos teóricos da informação, computação, além de técnicas práticas para suas aplicações em sistemas computacionais. O curso abrange lógica, estruturas de dados, algoritmos avançados, desenvolvimento de software, arquitetura de sistemas e inteligência artificial.
            </p>
          </CyberCard>
        </FadeInSection>

        <FadeInSection direction="right">
          <CyberCard glowColor="cyan" className="space-y-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-mono font-bold text-white">Objetivo da Graduação</h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Formar bacharéis aptos a atuar no desenvolvimento de sistemas complexos, gerenciamento de infraestruturas em nuvem, segurança da informação, análise de grandes volumes de dados e condução de pesquisas científicas e tecnológicas.
            </p>
          </CyberCard>
        </FadeInSection>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="space-y-8">
        <FadeInSection direction="up">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-mono font-bold text-white">Áreas de Atuação Profissional</h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSE_AREAS.map((area, idx) => (
            <FadeInSection key={area.id} delay={idx * 100} direction="up">
              <CyberCard glowColor="mixed" className="space-y-4 h-full">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/40">
                    {iconMap[area.iconName]}
                  </div>
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white">{area.title}</h3>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">{area.description}</p>
                  </div>
                </div>
              </CyberCard>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Matriz Curricular Por Semestre</h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Estrutura curricular oficial de 3.200 horas com integralização em 8 semestres, abrangendo fundamentos teóricos, práticas laboratoriais, projetos e extensões.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0d091a] border border-purple-900/40 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Total</span>
            </div>
            <p className="text-lg font-black text-white">{CURRICULUM_SUMMARY.totalHours}</p>
            <p className="text-[10px] text-zinc-500 font-sans">Integralização</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0d091a] border border-purple-900/40 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Teórica</span>
            </div>
            <p className="text-lg font-black text-white">{CURRICULUM_SUMMARY.theoreticalHours}</p>
            <p className="text-[10px] text-zinc-500 font-sans">Aulas teóricas</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0d091a] border border-purple-900/40 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-mono font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>Prática</span>
            </div>
            <p className="text-lg font-black text-white">{CURRICULUM_SUMMARY.practicalHours}</p>
            <p className="text-[10px] text-zinc-500 font-sans">Laboratórios</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0d091a] border border-purple-900/40 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-mono font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Duração</span>
            </div>
            <p className="text-lg font-black text-white">8 Semestres</p>
            <p className="text-[10px] text-zinc-500 font-sans">Turno Integral</p>
          </div>
        </div>

        <div className="space-y-3">
          {COURSE_SEMESTERS.map((sem) => {
            const isOpen = openSemester === sem.semester;
            return (
              <div key={sem.semester} className="glass-panel rounded-2xl border border-purple-900/40 overflow-hidden transition-all duration-200 hover:border-purple-600/50">
                <button
                  onClick={() => setOpenSemester(isOpen ? null : sem.semester)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-mono hover:bg-purple-950/20 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div>
                      <span className="text-base sm:text-lg font-bold text-white block">{sem.title}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 sm:p-5 pt-0 border-t border-purple-900/30 bg-[#07050f]"
                  >
                    <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {sem.subjects.map((sub) => (
                        <div 
                          key={sub.code || sub.name} 
                          className={`p-3 rounded-xl border flex flex-col justify-between gap-1.5 transition-all ${
                            sub.isOptative 
                              ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' 
                              : 'bg-purple-950/30 border-purple-800/30 text-zinc-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-white font-sans">{sub.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

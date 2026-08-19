import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, Code, Database, Globe, Layers, Shapes, type LucideIcon } from 'lucide-react';

interface Semester {
  number: number;
  subjects: {
    name: string;
    workload: number;
    icon: LucideIcon;
    tags: string[];
  }[];
}

const CURRICULUM: Semester[] = [
  {
    number: 1,
    subjects: [
      { name: 'Algoritmos I', workload: 60, icon: Code, tags: ['Programação', 'C'] },
      { name: 'Cálculo I', workload: 75, icon: Clock, tags: ['Matemática'] },
      { name: 'Lógica Matemática', workload: 60, icon: Shapes, tags: ['Fundamentos'] },
      { name: 'Intro à Computação', workload: 45, icon: BookOpen, tags: ['Teoria'] },
    ]
  },
  {
    number: 2,
    subjects: [
      { name: 'Algoritmos II', workload: 60, icon: Code, tags: ['Programação', 'C++'] },
      { name: 'Estruturas de Dados', workload: 75, icon: Layers, tags: ['Base'] },
      { name: 'Álgebra Linear', workload: 60, icon: Shapes, tags: ['Matemática'] },
      { name: 'Arquitetura I', workload: 60, icon: Clock, tags: ['Hardware'] },
    ]
  },
  {
    number: 3,
    subjects: [
      { name: 'POO', workload: 60, icon: Code, tags: ['Programação', 'Java'] },
      { name: 'Banco de Dados I', workload: 60, icon: Database, tags: ['Dados'] },
      { name: 'Sistemas Operacionais', workload: 75, icon: Clock, tags: ['Sistemas'] },
      { name: 'Redes de Computadores', workload: 60, icon: Globe, tags: ['Infra'] },
    ]
  }
];

export default function AboutCourse() {
  const [selectedSemester, setSelectedSemester] = useState(1);

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="max-w-4xl mb-24 px-4">
        <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Grade Curricular</span>
        <h1 className="font-black mb-10 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', lineHeight: '0.9' }}>
          A Jornada da <span className="gradient-text">Computação</span>
        </h1>
        <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '42rem' }}>
          O curso de Ciência da Computação forma profissionais capacitados a resolver problemas complexos através da tecnologia, com base sólida em matemática e engenharia de software.
        </p>
      </div>

      {/* Areas of Operation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '10rem' }}>
         {[
           { title: 'Desenvolvimento', text: 'Engenharia de Software, Web, Mobile e Sistemas Distribuídos.' },
           { title: 'Inteligência Artificial', text: 'Machine Learning, Visão Computacional e Processamento de Linguagem Natural.' },
           { title: 'Dados & Ciência', text: 'Big Data, Análise Estatística e Mineração de Dados.' }
         ].map((area, i) => (
           <div key={i} className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h4 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#8b5cf6', marginBottom: '1.5rem' }}>Área de Atuação</h4>
             <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem', letterSpacing: '-0.025em' }}>{area.title}</h3>
             <p style={{ color: '#71717a', fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.6 }}>{area.text}</p>
           </div>
         ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {/* Semester Selector */}
        <div style={{ position: 'sticky', top: '8rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowX: 'auto', padding: '0.5rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedSemester(num)}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '1.25rem 2rem', borderRadius: '9999px', fontSize: '10px', 
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', 
                  cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                  backgroundColor: selectedSemester === num ? 'white' : '#111111',
                  color: selectedSemester === num ? 'black' : '#52525b',
                  border: '1px solid',
                  borderColor: selectedSemester === num ? 'white' : 'rgba(255,255,255,0.05)'
                }}
              >
                <span>{num}º Semestre</span>
                <Calendar size={14} style={{ opacity: selectedSemester === num ? 1 : 0.2 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Subjects List */}
        <div style={{ flex: 3 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSemester}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
            >
              {CURRICULUM.find(s => s.number === selectedSemester)?.subjects.map((subject, i) => (
                <div key={i} className="glass-card" style={{ padding: '2.5rem', display: 'flex', alignItems: 'start', gap: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f4f4f5', flexShrink: 0 }}>
                    <subject.icon size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.025em', color: 'white' }}>{subject.name}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {subject.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#52525b', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#71717a' }}>
                      <Clock size={12} style={{ color: '#8b5cf6', opacity: 0.5 }} /> <span>{subject.workload} Horas</span>
                    </div>
                  </div>
                </div>
              )) || (
                <div style={{ gridColumn: '1 / -1', padding: '8rem 0', textAlign: 'center', borderRadius: '3rem', border: '1px dashed rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                   <p style={{ color: '#3f3f46', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.3em' }}>Informações em breve para o {selectedSemester}º semestre</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Information Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginTop: '10rem', paddingTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {[
          { title: 'Duração', text: '5 Anos (10 Semestres)' },
          { title: 'Turno', text: 'Predominantemente Integral' },
          { title: 'Vagas', text: '40 Vagas anuais' }
        ].map((info, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <h5 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#3f3f46', marginBottom: '1rem' }}>{info.title}</h5>
            <p style={{ fontSize: '1.875rem', fontWeight: 900, letterSpacing: '-0.025em', color: 'white' }}>{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

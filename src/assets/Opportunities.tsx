import  { useState } from 'react';
import { Briefcase, MapPin, DollarSign,  Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  tags: string[];
}

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Estágio em Desenvolvimento Full Stack', company: 'Empresa Parceira', location: 'Remoto / Híbrido', salary: 'Bolsa Auxílio', type: 'Estágio', postedAt: '2 dias atrás', tags: ['React', 'TypeScript', 'Node.js'] },
  { id: '2', title: 'Bolsista de Monitoria: Algoritmos I', company: 'Coordenação de Computação', location: 'No Campus', salary: 'R$ 400,00', type: 'Monitoria', postedAt: '1 semana atrás', tags: ['C', 'Lógica', 'Ensino'] },
  { id: '3', title: 'Iniciação Científica: Visão Computacional', company: 'Grupo de Pesquisa IA', location: 'Híbrido', salary: 'Bolsa FAPESP/CNPq', type: 'Pesquisa', postedAt: 'Recém publicada', tags: ['Python', 'CV', 'Research'] },
  { id: '4', title: 'Hackathon Nacional: Inovação Sustentável', company: 'Patrocínio Tech', location: 'Online', salary: 'Premiação R$ 10k', type: 'Hackathon', postedAt: '5 dias atrás', tags: ['Inovação', 'Pitch', 'MVP'] },
];

export default function Opportunities() {
  const [filter, setFilter] = useState('Todos');

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem', padding: '0 1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '3rem' }}>
          <div style={{ maxWidth: '48rem' }}>
            <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Carreira & Academia</span>
            <h1 className="font-black mb-10 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', lineHeight: '0.9' }}>
              Oportunidades <span className="gradient-text">Acadêmicas</span>
            </h1>
            <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              Curadoria de estágios, bolsas de pesquisa, monitorias e eventos focados no seu crescimento profissional e acadêmico.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem' }}>
             {['Todos', 'Estágio', 'Pesquisa', 'Monitoria', 'Hackathon'].map(t => (
               <button 
                key={t}
                onClick={() => setFilter(t)}
                style={{ 
                  padding: '0.875rem 2rem', borderRadius: '9999px', fontSize: '10px', 
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', 
                  cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                  backgroundColor: filter === t ? 'white' : '#111111',
                  color: filter === t ? 'black' : '#52525b',
                  border: filter === t ? '1px solid white' : '1px solid rgba(255,255,255,0.05)'
                }}
               >
                 {t}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {MOCK_JOBS.filter(j => filter === 'Todos' || j.type === filter).map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
          >
             <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '3rem' }}>
                <div style={{ flexGrow: 1 }}>
                   <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ padding: '0.375rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '9999px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#71717a' }}>
                        {job.company}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em', color: '#10b981', textTransform: 'uppercase' }}>
                        <div style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        {job.postedAt}
                      </span>
                   </div>
                   <h3 style={{ fontSize: '1.875rem', fontWeight: 900, marginBottom: '2rem', color: 'white', letterSpacing: '-0.025em', lineHeight: 1.2 }}>{job.title}</h3>
                   <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: '2.5rem', rowGap: '1rem', color: '#71717a', fontSize: '0.875rem', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <MapPin size={16} style={{ color: '#3f3f46' }} /> <span>{job.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <DollarSign size={16} style={{ color: '#3f3f46' }} /> <span>{job.salary}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <Briefcase size={16} style={{ color: '#3f3f46' }} /> <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(139,92,246,0.8)' }}>{job.type}</span>
                      </div>
                   </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                   <div style={{ display: 'flex', gap: '0.5rem', marginRight: '1.5rem' }}>
                      {/* Hide tags on small screens for brevity */}
                      <div style={{ display: 'flex', gap: '0.5rem' }} className="flex-md-row">
                        {job.tags.map(tag => (
                          <span key={tag} style={{ padding: '0.5rem 1rem', background: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '9999px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#52525b' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                   </div>
                   <button style={{ padding: '1.25rem', borderRadius: '50%', background: '#111111', border: '1px solid rgba(255,255,255,0.05)', color: '#52525b', cursor: 'pointer' }}>
                      <Bookmark size={20} />
                   </button>
                   <button className="gradient-button" style={{ padding: '1.25rem 2.5rem', borderRadius: '9999px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      Candidatar-se <ExternalLink size={16} />
                   </button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '8rem', borderRadius: '3rem', background: '#111111', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(2rem, 10vw, 8rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
         <div className="absolute" style={{ top: '-3rem', right: '-3rem', width: '24rem', height: '24rem', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '50%', filter: 'blur(120px)', zIndex: -1 }} />
         <h4 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.025em', color: 'white' }}>Tem uma vaga para divulgar?</h4>
         <p style={{ color: '#71717a', fontWeight: 500, fontSize: '1.125rem', marginBottom: '3rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.6 }}>Sua empresa quer contratar talentos da computação do IF?</p>
         <button style={{ padding: '1.25rem 3rem', borderRadius: '9999px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>
            Falar com a Gestão
         </button>
      </div>
    </div>
  );
}

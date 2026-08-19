import  { useState } from 'react';
import {  AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { motion, } from 'motion/react';

interface Demand {
  id: string;
  title: string;
  category: 'Infraestrutura' | 'Pedagógico' | 'Eventos' | 'Outros';
  status: 'Aberto' | 'Em Análise' | 'Resolvido' | 'Encaminhado';
  date: string;
  description: string;
}

const MOCK_DEMANDS: Demand[] = [
  { id: '1', title: 'Melhoria no Wi-Fi do Bloco B', category: 'Infraestrutura', status: 'Em Análise', date: '02 Mai 2024', description: 'O sinal está instável no laboratório 4.' },
  { id: '2', title: 'Sugestão de Hackathon 2024.2', category: 'Eventos', status: 'Aberto', date: '01 Mai 2024', description: 'Proposta de evento focado em desenvolvimento mobile.' },
  { id: '3', title: 'Ajuste de horário (Cálculo III)', category: 'Pedagógico', status: 'Resolvido', date: '25 Abr 2024', description: 'Conflito de horário resolvido pela coordenação.' },
  { id: '4', title: 'Compra de novos adaptadores', category: 'Infraestrutura', status: 'Encaminhado', date: '20 Abr 2024', description: 'Solicitação de adaptadores HDMI enviada à reitoria.' },
];

export default function UserDemands() {
  const [filter, setFilter] = useState('Todos');

  const filteredDemands = MOCK_DEMANDS.filter(d => filter === 'Todos' || d.category === filter);

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="max-w-4xl mb-24 px-4">
        <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Voz Ativa</span>
        <h1 className="font-black mb-10 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', lineHeight: '0.9' }}>
          Demandas dos <span className="gradient-text">Alunos</span>
        </h1>
        <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '42rem' }}>
          Canal aberto para sugestões, reclamações e melhorias. O CAJOO atua como sua voz diante da coordenação e diretoria.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', padding: '0 1rem' }}>
        {/* Actions Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'white' }}>
              Acompanhamento de Demandas
            </span>
          </div>
          <a 
            href="https://forms.google.com" // Link do formulário de terceiro (pode ser alterado conforme necessário)
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none', fontSize: '10px', fontWeight: 900, 
              textTransform: 'uppercase', letterSpacing: '0.2rem',
              color: '#8b5cf6',
              transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              cursor: 'pointer',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px'
            }}
          >
            <Plus size={14} /> Registrar Nova Demanda
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1rem' }}>
             {['Todos', 'Infraestrutura', 'Pedagógico', 'Eventos', 'Outros'].map(f => (
               <button 
                key={f}
                onClick={() => setFilter(f)}
                style={{ 
                  padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '9px', 
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1rem',
                  background: filter === f ? 'white' : 'rgba(255,255,255,0.02)',
                  color: filter === f ? 'black' : '#52525b',
                  border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer'
                }}
               >
                 {f}
               </button>
             ))}
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredDemands.map((demand) => (
              <div 
                key={demand.id} 
                className="glass-card" 
                style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}
              >
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{demand.title}</h4>
                    <span style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1rem', color: '#3f3f46' }}>{demand.category}</span>
                  </div>
                  <p style={{ color: '#52525b', fontSize: '0.875rem' }}>{demand.description}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                   <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.1rem', color: '#3f3f46' }}>{demand.date}</span>
                   <div style={{ 
                     display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', 
                     borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                     fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1rem',
                     color: demand.status === 'Resolvido' ? '#10b981' : demand.status === 'Em Análise' ? '#f59e0b' : '#3f3f46'
                   }}>
                     {demand.status === 'Resolvido' ? <CheckCircle size={12} /> : demand.status === 'Em Análise' ? <Clock size={12} /> : <AlertCircle size={12} />}
                     {demand.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

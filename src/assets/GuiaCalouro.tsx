import { Compass, Lightbulb, Map, Coffee, HelpCircle, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

export default function GuiaCalouro() {
  const sections = [
    {
      icon: Compass,
      title: 'Primeiros Passos',
      items: [
        'Como acessar o sistema acadêmico (SUAP)',
        'Localização das salas e laboratórios',
        'Obtendo sua carteirinha estudantil',
        'Cadastro na rede Wi-Fi do campus'
      ]
    },
    {
      icon: Map,
      title: 'Estrutura do IF',
      items: [
        'Bloco de Informática (onde a mágica acontece)',
        'Biblioteca Central e salas de estudo',
        'Restaurante Estudantil (R.U.)',
        'Áreas de convivência e quadras'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Dicas de Sobrevivência',
      items: [
        'Não deixe Cálculo para a última hora',
        'Participe de projetos de extensão cedo',
        'Conheça o CAJOO e seus benefícios',
        'Organize seu tempo desde a primeira semana'
      ]
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="max-w-4xl mb-24 px-4">
        <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Bem-vindo ao Curso</span>
        <h1 className="font-black mb-10 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', lineHeight: '0.9' }}>
          Manual de <span className="gradient-text">Sobrevivência</span>
        </h1>
        <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '42rem' }}>
          Preparamos este guia para facilitar sua entrada na Computação e garantir que você aproveite cada momento desde o primeiro dia.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '8rem', padding: '0 1rem' }}>
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div style={{ width: '4rem', height: '4rem', borderRadius: '1rem', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
               <section.icon size={28} style={{ color: '#8b5cf6' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.025em', textTransform: 'uppercase' }}>{section.title}</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1, listStyle: 'none', padding: 0 }}>
              {section.items.map((item, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'start', gap: '1rem', color: '#71717a', fontWeight: 500, fontSize: '0.875rem' }}>
                   <ChevronRight size={16} style={{ color: 'rgba(139, 92, 246, 0.5)', marginTop: '0.125rem', flexShrink: 0 }} />
                   <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* FAQ or Common Questions */}
      <div style={{ borderRadius: '3rem', background: '#111111', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(2rem, 10vw, 8rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute" style={{ top: 0, right: 0, width: '600px', height: '600px', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '50%', filter: 'blur(120px)', zIndex: -1, transform: 'translate(25%, -25%)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
             <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f4f4f5' }}>
               <HelpCircle size={28} />
             </div>
             <h2 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em' }}>Perguntas Frequentes</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {[
              { q: 'O curso é focado só em programação?', a: 'Não. O curso abrange desde fundamentos matemáticos até hardware, redes, IA e gestão de projetos tecnológicos.' },
              { q: 'Preciso ter um notebook potente agora?', a: 'Para o início, qualquer computador básico atende. Conforme você avança para áreas como Deep Learning, pode precisar de mais hardware.' },
              { q: 'Como entrar em um projeto de pesquisa?', a: 'Fique atento ao mural de oportunidades do CAJOO e converse diretamente com os professores das áreas que você mais se identifica.' }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: i === 2 ? 'none' : '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'white', letterSpacing: '-0.025em' }}>Q: {faq.q}</h4>
                <p style={{ color: '#71717a', fontWeight: 500, lineHeight: 1.6, maxWidth: '42rem' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717a' }}>
               <Coffee size={32} />
            </div>
            <div>
               <p style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: '0.25rem', color: 'white' }}>Ainda com dúvidas?</p>
               <p style={{ color: '#52525b', fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.6 }}>Passe na sala do CAJOO, tome um café conosco.</p>
            </div>
         </div>
         <button className="gradient-button" style={{ padding: '1.25rem 3rem', borderRadius: '9999px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>
            Ver Mapa Estrutural
         </button>
      </div>
    </div>
  );
}

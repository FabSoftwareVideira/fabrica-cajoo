import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Instagram,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { FAQS } from '../data/mockData';
import { NeonButton } from '../components/NeonButton';
import { CyberCard } from '../components/CyberCard';
import { HeroParticles } from '../components/HeroParticles';

export const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'Dúvidas Acadêmicas',
    mensagem: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = 'Por favor, informe seu nome completo.';
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail.';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'E-mail inválido. Verifique o formato.';
    }
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Escreva sua mensagem antes de enviar.';
    } else if (formData.mensagem.length < 10) {
      newErrors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    setFormData({ nome: '', email: '', assunto: 'Dúvidas Acadêmicas', mensagem: '' });
    setErrors({});
  };

  return (
    <div className="pt-28 pb-20 space-y-12 sm:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
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
            className="absolute top-0 right-0 w-[450px] h-[450px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" 
          />

          <HeroParticles />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Canais de <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Contato</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              Tem sugestões, dúvidas acadêmicas ou deseja propor parcerias? Envie uma mensagem diretamente ao CAJOO.
            </p>
          </div>
        </motion.div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact Info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <CyberCard glowColor="purple" className="space-y-6">
            <h2 className="text-xl font-mono font-bold text-white border-b border-purple-900/30 pb-3">
              Informações Gerais
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 shrink-0">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase">E-mail Oficial</h4>
                  <p className="text-xs text-gray-300 font-mono mt-0.5">cajoo.ifc@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 shrink-0">
                  <Instagram className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase">Instagram Oficial</h4>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-gray-300 hover:text-fuchsia-300 font-mono mt-0.5 inline-block transition-colors"
                  >
                    @cajoo.ifc
                  </a>
                </div>
              </div>
            </div>


          </CyberCard>
        </div>

        {/* Contact Form (3 cols) */}
        <div className="lg:col-span-3">
          <CyberCard glowColor="cyan" className="space-y-6">
            <h2 className="text-xl font-mono font-bold text-white border-b border-purple-900/30 pb-3">
              Envie sua Mensagem
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-cyan-950/60 border border-cyan-500/40 rounded-2xl text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-mono font-bold text-white">Mensagem Enviada com Sucesso!</h3>
                <p className="text-xs text-gray-300 font-sans">
                  Agradecemos seu contato. Nossa diretoria responderá no e-mail informado o mais breve possível.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-mono bg-purple-900/60 text-cyan-300 border border-cyan-500/30 rounded-xl hover:bg-purple-800/80"
                >
                  Enviar Outra Mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-cyan-300 mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-[#080812] border border-purple-900/50 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-500 outline-none transition-colors"
                  />
                  {errors.nome && (
                    <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.nome}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-cyan-300 mb-1">Seu E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@estudante.ifc.edu.br"
                    className="w-full bg-[#080812] border border-purple-900/50 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-500 outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-cyan-300 mb-1">Assunto</label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full bg-[#080812] border border-purple-900/50 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none transition-colors cursor-pointer"
                  >
                    <option value="Dúvidas Acadêmicas">Dúvidas Acadêmicas / Grade</option>
                    <option value="Eventos e Semana Acadêmica">Eventos & Hackathons</option>
                    <option value="Sugerir Melhorias">Sugestão ou Reclamação</option>
                    <option value="Parcerias e Patrocínio">Parcerias com Empresas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-cyan-300 mb-1">Sua Mensagem *</label>
                  <textarea
                    name="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Escreva detalhadamente sua dúvida ou sugestão..."
                    className="w-full bg-[#080812] border border-purple-900/50 focus:border-cyan-400 rounded-xl p-4 text-xs font-mono text-white placeholder-gray-500 outline-none transition-colors"
                  />
                  {errors.mensagem && (
                    <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mensagem}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <NeonButton variant="primary" type="submit" fullWidth icon={<Send className="w-4 h-4" />}>
                    Enviar Mensagem
                  </NeonButton>
                </div>
              </form>
            )}
          </CyberCard>
        </div>

      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            DÚVIDAS FREQUENTES
          </span>
          <h2 className="text-3xl font-mono font-bold text-white">Perguntas Frequentes</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-mono hover:bg-purple-950/30 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 border-t border-purple-900/30 bg-[#080812] text-xs font-sans text-gray-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

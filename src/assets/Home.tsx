import { motion } from "motion/react";
import {
  FileText,
  Bell,
  Briefcase,
  ArrowRight,
  Zap,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Background Glows */}
        <div
          className="absolute"
          style={{
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "800px",
            background:
              "linear-gradient(to bottom, rgba(139, 92, 246, 0.05), transparent)",
            zIndex: -10,
          }}
        />

        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white-5 border-white-10 text-zinc-100 uppercase tracking-extra-widest mb-12 shadow-2xl backdrop-blur-sm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.5rem",
                borderRadius: "9999px",
                fontSize: "10px",
                fontWeight: "900",
              }}
            >
              <Zap size={14} style={{ color: "#8b5cf6" }} /> O portal oficial da
              computação
            </motion.span>

            <h1
              className="font-black mb-10 text-white tracking-tighter"
              style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1 }}
            >
              Centralizando tudo que{" "}
              <span className="gradient-text">você precisa</span> no curso.
            </h1>

            <p
              className="text-zinc-400 mb-16 max-w-2xl mx-auto font-medium"
              style={{ fontSize: "1.25rem", lineHeight: 1.6 }}
            >
              Central de comunicação, recursos e representação estudantil. Tudo
              o que você precisa para sua jornada acadêmica em um só lugar.
            </p>

            <div className="flex flex-col flex-md-row items-center justify-center gap-6">
              <Link
                to="/recursos"
                className="gradient-button font-black uppercase tracking-widest"
                style={{
                  padding: "1.25rem 3rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                }}
              >
                Recursos Oficiais{" "}
                <ArrowRight size={18} style={{ marginLeft: "0.75rem" }} />
              </Link>
              <Link
                to="/comunicados"
                className="secondary-button font-black uppercase tracking-widest"
                style={{
                  padding: "1.25rem 3rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                }}
              >
                Ver comunicados
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESTAQUES / RECENT SECTION */}
      <section className="container">
        <div className="flex flex-col flex-md-row items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-xl">
            <span
              className="text-purple-500 uppercase tracking-extra-widest mb-4 font-black"
              style={{ fontSize: "10px", display: "block" }}
            >
              Feed Acadêmico
            </span>
            <h2
              className="font-black mb-6 tracking-tight"
              style={{ fontSize: "clamp(2.125rem, 5vw, 3rem)" }}
            >
              Acontecendo Agora
            </h2>
            <p
              className="text-zinc-500 font-medium"
              style={{ fontSize: "1.125rem" }}
            >
              Fique por dentro dos últimos editais, eventos e decisões
              institucionais.
            </p>
          </div>
          <Link
            to="/comunicados"
            className="text-zinc-100 uppercase tracking-widest font-black"
            style={{
              fontSize: "10px",
              textDecoration: "none",
              borderBottom: "2px solid rgba(255,255,255,0.05)",
              paddingBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-md-3 gap-8">
          {[
            {
              tag: "Evento",
              title: "I Semana de Computação Avançada",
              date: "15 Mai - 18 Mai",
              color: "rgba(139,92,246,0.1)",
            },
            {
              tag: "Edital",
              title: "Monitoria Estrutura de Dados 2024.1",
              date: "Encerra em 3 dias",
              color: "rgba(236,72,153,0.05)",
            },
            {
              tag: "Aviso",
              title: "Ajuste de matrícula extraordinário",
              date: "Publicado hoje",
              color: "rgba(249,115,22,0.05)",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden"
              style={{
                cursor: "pointer",
                background: `linear-gradient(to bottom right, ${card.color}, transparent)`,
              }}
            >
              <div
                style={{
                  padding: "2.5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: "900",
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      opacity: 0.6,
                    }}
                  >
                    {card.tag}
                  </span>
                  <h3
                    className="font-bold text-white tracking-tight"
                    style={{
                      fontSize: "1.5rem",
                      marginTop: "1.5rem",
                      marginBottom: "0.5rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                <div
                  className="flex items-center gap-2 text-zinc-500 font-black uppercase tracking-widest mt-12 pt-6"
                  style={{
                    fontSize: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Bell size={12} style={{ color: "#8b5cf6" }} />{" "}
                  <span>{card.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section
        className="py-32 overflow-hidden"
      >
        <div className="container">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <span
              className="text-purple-500 uppercase tracking-extra-widest mb-4 font-black"
              style={{ fontSize: "10px", display: "block" }}
            >
              Ecosistema CAJOO
            </span>
            <h2
              className="font-black mb-8 tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Tudo em um só lugar
            </h2>
            <p
              className="text-zinc-500 font-medium"
              style={{ fontSize: "1.125rem" }}
            >
              Componentes construídos pensando na experiência real do estudante.
            </p>
          </div>

          <div className="grid grid-md-2 grid-lg-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Recursos",
                desc: "Links para Sigaa, Moodle e documentações técnicas oficiais.",
                link: "/recursos",
              },
              {
                icon: MessageSquare,
                title: "Demandas",
                desc: "Canal direto para sugestões e reclamações à gestão do CA.",
                link: "/demandas",
              },
              {
                icon: Briefcase,
                title: "Carreira",
                desc: "Estágios, bolsas de pesquisa e monitorias focadas no curso.",
                link: "/oportunidades",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white-5 border-white-10"
                style={{
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  cursor: "pointer",
                }}
              >
                <Link to={feature.link} style={{ textDecoration: "none" }}>
                  <div
                    className="bg-white-5 border-white-10"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f4f4f5",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <feature.icon size={26} />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-white tracking-tight"
                      style={{ fontSize: "1.25rem", marginBottom: "1rem" }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-zinc-500 font-medium"
                      style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container pt-12 pb-24">
        <div
          className="relative rounded-3xl overflow-hidden text-center"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "clamp(2rem, 10vw, 8rem)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: 0,
              right: 0,
              width: "600px",
              height: "600px",
              background: "rgba(139, 92, 246, 0.1)",
              borderRadius: "50%",
              filter: "blur(150px)",
              zIndex: -1,
              transform: "translate(50%, -50%)",
            }}
          />

          <div className="max-w-3xl mx-auto z-10 relative">
            <span
              className="text-zinc-500 uppercase tracking-extra-widest mb-8 font-black"
              style={{ fontSize: "10px", display: "block" }}
            >
              Conecte-se
            </span>
            <h2
              className="font-black mb-10 tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 8vw, 4rem)", lineHeight: 1.1 }}
            >
              Siga o CAJOO nas <br />{" "}
              <span className="gradient-text">redes sociais</span>
            </h2>
            <p
              className="text-zinc-500 mb-16 font-medium"
              style={{ fontSize: "1.25rem", lineHeight: 1.6 }}
            >
              Fique por dentro das pautas em tempo real, receba lembretes de
              eventos e participe das discussões da comunidade.
            </p>

            <div className="flex flex-col flex-md-row items-center justify-center gap-6">
              <a
                href="#"
                className="gradient-button font-black uppercase tracking-widest"
                style={{
                  padding: "1.25rem 3rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Instagram
              </a>
              <a
                href="#"
                className="secondary-button font-black uppercase tracking-widest"
                style={{
                  padding: "1.25rem 3rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Discord da Computação
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Target, Rocket, Award, Mail } from "lucide-react";
import { motion } from "motion/react";

export default function AboutCA() {
  const teamMembers = [
    {
      name: "Ana Paula",
      role: "Presidente",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    {
      name: "Lucas Silva",
      role: "Vice-Presidente",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    },
    {
      name: "Marina Costa",
      role: "Diretora de Eventos",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina",
    },
    {
      name: "Pedro Souza",
      role: "Diretor Acadêmico",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
    {
      name: "Beatriz Lima",
      role: "Comunicação",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz",
    },
    {
      name: "Gabriel Mendes",
      role: "Financeiro",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel",
    },
  ];

  return (
    <div
      className="container"
      style={{ paddingTop: "10rem", paddingBottom: "8rem" }}
    >
      <div className="max-w-4xl mb-32 px-4">
        <span
          className="text-purple-500 font-black uppercase tracking-extra-widest mb-4"
          style={{ display: "block", fontSize: "10px" }}
        >
          Nossa História
        </span>
        <h1
          className="font-black mb-10 text-white tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)", lineHeight: "0.9" }}
        >
          Nós somos o <span className="gradient-text">CAJOO</span>
        </h1>
        <p
          className="text-zinc-500 font-medium"
          style={{ fontSize: "1.25rem", lineHeight: "1.6", maxWidth: "42rem" }}
        >
          Mais do que um centro acadêmico, somos o ecossistema que conecta
          estudantes, professores e o mercado de trabalho no campus de
          computação.
        </p>
      </div>

      {/* Mission/Vision/Values */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginBottom: "10rem",
        }}
      >
        {[
          {
            icon: Target,
            title: "Missão",
            text: "Representar os interesses dos alunos de forma transparente e eficiente, garantindo voz ativa em todas as instâncias.",
          },
          {
            icon: Rocket,
            title: "Visão",
            text: "Ser referência nacional em integração estudantil e fomento tecnológico no ensino superior.",
          },
          {
            icon: Award,
            title: "Valores",
            text: "Inovação, Ética, Colaboração e Inclusão. Construindo o futuro da computação com responsabilidade.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="glass-card"
            style={{ padding: "3rem", transition: "all 0.5s ease" }}
          >
            <div
              style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f4f4f5",
                marginBottom: "2rem",
              }}
            >
              <item.icon size={24} />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1rem",
                letterSpacing: "-0.025em",
                textTransform: "uppercase",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                color: "#71717a",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <section style={{ marginBottom: "10rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginBottom: "5rem",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.025em",
              whiteSpace: "nowrap",
            }}
          >
            Nossa Gestão <span style={{ color: "#8b5cf6" }}>2024</span>
          </h2>
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.05)",
              flexGrow: 1,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                style={{
                  position: "relative",
                  marginBottom: "1.5rem",
                  display: "inline-block",
                }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    filter: "grayscale(100%)",
                    border: "2px solid rgba(255,255,255,0.05)",
                    position: "relative",
                    zIndex: 10,
                    transition: "all 0.5s ease",
                  }}
                />
              </div>
              <h4
                style={{
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.025em",
                }}
              >
                {member.name}
              </h4>
              <p
                style={{
                  fontSize: "9px",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  letterSpacing: "0.25em",
                  color: "#71717a",
                }}
              >
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How to Participate */}
      <section style={{ marginBottom: "10rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.025em",
                marginBottom: "2rem",
              }}
            >
              Como <br /> <span className="gradient-text">Participar?</span>
            </h2>
            <p
              style={{
                color: "#71717a",
                fontWeight: 500,
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              A participação ativa dos alunos é o motor do CAJOO. Existem
              diversas formas de você contribuir com o curso e com a comunidade
              acadêmica.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {[
              {
                title: "Reuniões Abertas",
                text: "Participe de nossas reuniões mensais para discutir pautas do curso e propor novos projetos.",
              },
              {
                title: "Grupos de Trabalho",
                text: "Ajude na organização de eventos, recepção de calouros ou gestão de redes sociais.",
              },
              {
                title: "Comissões Temáticas",
                text: "Contribua tecnicamente em comissões de melhoria de laboratórios ou revisão de grade.",
              },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "#3f3f46",
                  }}
                >
                  0{i + 1}
                </div>
                <div>
                  <h4
                    style={{
                      color: "white",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      color: "#52525b",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social and Participation CTA */}
      <div
        style={{
          borderRadius: "3rem",
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(2rem, 10vw, 8rem)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute"
          style={{
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "rgba(139, 92, 246, 0.05)",
            borderRadius: "50%",
            filter: "blur(100px)",
            zIndex: -1,
            transform: "translate(33%, -33%)",
          }}
        />
        <h2
          style={{
            fontSize: "clamp(2rem, 8vw, 4rem)",
            fontWeight: 900,
            marginBottom: "3rem",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          Quer fazer a diferença? <br />{" "}
          <span className="gradient-text">Junte-se a nós.</span>
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "5rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <button
            className="secondary-button"
            style={{
              padding: "1.25rem 2.5rem",
              borderRadius: "9999px",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Mail size={16} /> Ouvidoria do CA
          </button>
          <button
            className="gradient-button"
            style={{
              padding: "1.25rem 2.5rem",
              borderRadius: "9999px",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            Siga no Instagram
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "4rem",
            maxWidth: "48rem",
            margin: "0 auto",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              className="font-black text-white tracking-tighter"
              style={{ fontSize: "3rem" }}
            >
              450+
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#52525b",
              }}
            >
              Alunos Representados
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              borderLeft: "1px solid rgba(255,255,255,0.05)",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              padding: "0 2rem",
            }}
          >
            <span
              className="font-black text-white tracking-tighter"
              style={{ fontSize: "3rem" }}
            >
              20+
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#52525b",
              }}
            >
              Eventos Anuais
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              className="font-black text-emerald-500 tracking-tighter"
              style={{ fontSize: "3rem" }}
            >
              100%
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#52525b",
              }}
            >
              Comprometimento
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

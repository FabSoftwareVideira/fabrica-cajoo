import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div
      className="container"
      style={{ paddingTop: "10rem", paddingBottom: "8rem" }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <span
          className="text-purple-500 font-black uppercase tracking-extra-widest mb-4"
          style={{
            display: "block",
            fontSize: "10px",
            textAlign: "center",
            letterSpacing: "0.3em",
          }}
        >
          Fale Conosco
        </span>
        <h1
          className="font-black mb-10 text-white tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 5rem)",
            lineHeight: "0.9",
            textAlign: "center",
          }}
        >
          Dúvidas? <br />{" "}
          <span className="gradient-text">Entre em Contato.</span>
        </h1>
        <p
          className="text-zinc-500 font-medium text-center mb-24 max-w-2xl mx-auto"
          style={{ fontSize: "1.25rem", lineHeight: "1.6" }}
        >
          Tem alguma sugestão, reclamação ou quer apenas trocar uma ideia? Nossa
          equipe está pronta para te ouvir e ajudar.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
          }}
        >
          {/* Contact Form */}
          <div style={{ flexGrow: 1.5 }}>
            <div
              style={{
                borderRadius: "3rem",
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "clamp(2rem, 5vw, 4rem)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              <form
                action="https://formspree.io/f/xvzvpqnw"
                method="POST"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "10px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#71717a",
                        marginLeft: "1rem",
                      }}
                    >
                      Nome Completo
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      required
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "9999px",
                        padding: "1rem 2rem",
                        outline: "none",
                        color: "#d4d4d8",
                        transition: "all 0.3s",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "10px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#71717a",
                        marginLeft: "1rem",
                      }}
                    >
                      E-mail Acadêmico
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="aluno@instituto.edu.br"
                      required
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "9999px",
                        padding: "1rem 2rem",
                        outline: "none",
                        color: "#d4d4d8",
                        transition: "all 0.3s",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#71717a",
                      marginLeft: "1rem",
                    }}
                  >
                    Assunto
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      name="subject"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "9999px",
                        padding: "1rem 2rem",
                        outline: "none",
                        appearance: "none",
                        color: "#a1a1aa",
                      }}
                    >
                      <option value="Sugestão Geral">Sugestão Geral</option>
                      <option value="Reclamação ou Denúncia">
                        Reclamação ou Denúncia
                      </option>
                      <option value="Dúvida sobre Materiais">
                        Dúvida sobre Materiais
                      </option>
                      <option value="Eventos & Parcerias">
                        Eventos & Parcerias
                      </option>
                      <option value="Outros">Outros</option>
                    </select>
                    <div
                      style={{
                        position: "absolute",
                        right: "1.5rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "#52525b",
                      }}
                    >
                      <MessageSquare size={16} />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#71717a",
                      marginLeft: "1rem",
                    }}
                  >
                    Sua Mensagem
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Como o CAJOO pode te ajudar hoje?"
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2rem",
                      padding: "1.5rem 2rem",
                      outline: "none",
                      color: "#d4d4d8",
                      transition: "all 0.3s",
                      resize: "none",
                    }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="gradient-button"
                  style={{
                    width: "100%",
                    padding: "1.25rem",
                    borderRadius: "9999px",
                    fontSize: "10px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                  }}
                >
                  Enviar Mensagem <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div
              className="glass-card"
              style={{
                padding: "2.5rem",
                display: "flex",
                alignItems: "start",
                gap: "2rem",
                transition: "all 0.5s",
              }}
            >
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "1rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a78bfa",
                  flexShrink: 0,
                }}
              >
                <Mail size={24} />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                    color: "white",
                    letterSpacing: "-0.025em",
                  }}
                >
                  E-mail Oficial
                </h4>
                <p
                  style={{
                    color: "#71717a",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  ca.computacao@if.edu.br
                </p>
              </div>
            </div>

            <div
              className="glass-card"
              style={{
                padding: "2.5rem",
                display: "flex",
                alignItems: "start",
                gap: "2rem",
                transition: "all 0.5s",
              }}
            >
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "1rem",
                  background: "rgba(249, 115, 22, 0.1)",
                  border: "1px solid rgba(249, 115, 22, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fb923c",
                  flexShrink: 0,
                }}
              ></div>
              <div>
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                    color: "white",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Direct Instagram
                </h4>
                <p
                  style={{
                    color: "#71717a",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  @cajoo_oficial
                </p>
              </div>
            </div>

            <div
              className="glass-card"
              style={{
                padding: "2.5rem",
                display: "flex",
                alignItems: "start",
                gap: "2rem",
                transition: "all 0.5s",
              }}
            >
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "1rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#60a5fa",
                  flexShrink: 0,
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                    color: "white",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Localização
                </h4>
                <p
                  style={{
                    color: "#71717a",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  Bloco B, Sala 12 - Campus Principal
                </p>
              </div>
            </div>

            <div
              style={{
                borderRadius: "2.5rem",
                background: "linear-gradient(to bottom right, #111111, black)",
                padding: "2.5rem",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute"
                style={{
                  bottom: "-2.5rem",
                  left: "-2.5rem",
                  width: "8rem",
                  height: "8rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "50%",
                  filter: "blur(32px)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  color: "#a78bfa",
                }}
              >
                <MessageSquare size={20} />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                  }}
                >
                  Canal de Ética
                </span>
              </div>
              <h5
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "white",
                  letterSpacing: "-0.025em",
                }}
              >
                Ouvidoria Anônima
              </h5>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#52525b",
                  fontWeight: 500,
                  lineHeight: 1.6,
                  marginBottom: "2.5rem",
                }}
              >
                Precisa fazer uma denúncia ou reclamação sem se identificar?
                Nosso canal de ouvidoria garante total sigilo e proteção de
                dados.
              </p>{" "}
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "10px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#a78bfa",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                  paddingBottom: "0.25rem",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                Acessar canal seguro →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

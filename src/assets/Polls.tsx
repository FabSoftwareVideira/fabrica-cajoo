import  { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { motion } from "framer-motion";
import {
  Lock,
  CheckCircle,
  BarChart3,
  Clock,
  AlertTriangle,
  LogIn,
} from "lucide-react";

interface Poll {
  id: string;
  question: string;
  description: string;
  options: { id: string; text: string; votes: number }[];
  endDate: string;
  voted?: boolean;
}

const MOCK_POLLS: Poll[] = [
  {
    id: "1",
    question: "Qual tema para o próximo Hackathon?",
    description:
      "Buscamos focar em áreas que a comunidade tenha maior interesse para trazer palestrantes específicos.",
    endDate: "2024-06-01",
    options: [
      { id: "a", text: "Inteligência Artificial & LLMs", votes: 45 },
      { id: "b", text: "Fintech & Blockchain", votes: 12 },
      { id: "c", text: "Desenvolvimento Sustentável", votes: 8 },
    ],
  },
  {
    id: "2",
    question: "Definição da nova identidade visual do CAJOO",
    description: "Votação formal para aprovação do manual da marca 2024.",
    endDate: "2024-05-15",
    options: [
      { id: "a1", text: "Opção A (Contemporânea)", votes: 30 },
      { id: "b1", text: "Opção B (Retrô Computer)", votes: 35 },
    ],
  },
];

export default function Polls() {
  const { user, signInWithGoogle } = useAuth();
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});

  const handleVote = (pollId: string, optionId: string) => {
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionId }));
    // In a real app, this would call Firestore
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "10rem", paddingBottom: "8rem" }}
    >
      <div className="max-w-4xl mb-24 px-4">
        <span
          className="text-purple-500 font-black uppercase tracking-extra-widest mb-4"
          style={{ display: "block", fontSize: "10px" }}
        >
          Democracia Digital
        </span>
        <h1
          className="font-black mb-10 text-white tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)", lineHeight: "0.9" }}
        >
          Votações e <span className="gradient-text">Enquetes</span>
        </h1>
        <p
          className="text-zinc-500 font-medium"
          style={{ fontSize: "1.25rem", lineHeight: "1.6", maxWidth: "42rem" }}
        >
          Participe ativamente das decisões do curso. Seu voto ajuda a moldar as
          prioridades da gestão e eventos futuros.
        </p>
      </div>

      {!user ? (
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "3rem",
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "clamp(3rem, 10vw, 8rem)",
            textAlign: "center",
          }}
        >
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "24rem",
              height: "24rem",
              background: "rgba(139, 92, 246, 0.1)",
              borderRadius: "50%",
              filter: "blur(120px)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "24rem",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "6rem",
                height: "6rem",
                borderRadius: "2rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2.5rem",
                color: "white",
              }}
            >
              <Lock size={40} />
            </div>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 900,
                marginBottom: "1.5rem",
                letterSpacing: "-0.025em",
              }}
            >
              Acesso Restrito
            </h2>
            <p
              style={{
                color: "#71717a",
                marginBottom: "3rem",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Para garantir a integridade das votações acadêmicas, apenas
              estudantes autenticados podem participar do sistema de decisões.
            </p>
            <button
              onClick={signInWithGoogle}
              className="gradient-button"
              style={{
                width: "100%",
                padding: "1.25rem",
                borderRadius: "9999px",
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <LogIn size={18} /> Entrar com Google
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {MOCK_POLLS.map((poll) => {
            const hasVoted = votedPolls[poll.id] || poll.voted;
            const totalVotes =
              poll.options.reduce((acc, opt) => acc + opt.votes, 0) +
              (votedPolls[poll.id] ? 1 : 0);

            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "9px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.2rem",
                      color: "#71717a",
                    }}
                  >
                    <Clock size={12} style={{ color: "#8b5cf6" }} /> Expira:{" "}
                    {poll.endDate}
                  </div>
                  {hasVoted && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#10b981",
                        fontSize: "10px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      <CheckCircle size={14} /> Votado
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: 900,
                    marginBottom: "1.5rem",
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    color: "white",
                  }}
                >
                  {poll.question}
                </h3>
                <p
                  style={{
                    color: "#71717a",
                    fontSize: "0.875rem",
                    marginBottom: "3rem",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {poll.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  {poll.options.map((option) => {
                    const optionVotes =
                      option.id === votedPolls[poll.id]
                        ? option.votes + 1
                        : option.votes;
                    const percentage =
                      Math.round((optionVotes / totalVotes) * 100) || 0;

                    return (
                      <button
                        key={option.id}
                        disabled={!!hasVoted}
                        onClick={() => handleVote(poll.id, option.id)}
                        style={{
                          position: "relative",
                          width: "100%",
                          textAlign: "left",
                          padding: "1.5rem",
                          borderRadius: "1rem",
                          border: "1px solid rgba(255,255,255,0.05)",
                          backgroundColor:
                            votedPolls[poll.id] === option.id
                              ? "rgba(139,92,246,0.05)"
                              : "transparent",
                          transition: "all 0.3s ease",
                          cursor: hasVoted ? "default" : "pointer",
                          overflow: "hidden",
                          borderColor:
                            votedPolls[poll.id] === option.id
                              ? "rgba(139,92,246,0.5)"
                              : "rgba(255,255,255,0.05)",
                        }}
                      >
                        {/* Progress Bar Background */}
                        {hasVoted && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.05))",
                              zIndex: -1,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        )}

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            position: "relative",
                            zIndex: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: hasVoted ? "#a1a1aa" : "#71717a",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {option.text}
                          </span>
                          {hasVoted && (
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 900,
                                color: "rgba(139, 92, 246, 1)",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {percentage}%
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#52525b",
                    fontSize: "10px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    paddingTop: "2rem",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <BarChart3 size={14} style={{ color: "#3f3f46" }} />{" "}
                    <span>{totalVotes} Participações</span>
                  </div>
                  {!hasVoted && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#f97316",
                        opacity: 0.8,
                      }}
                    >
                      <AlertTriangle size={12} /> <span>Votação Aberta</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

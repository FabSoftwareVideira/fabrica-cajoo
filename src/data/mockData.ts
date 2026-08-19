import {
  Comunicado,
  Recurso,
  MembroDiretoria,
  EventoGaleria,
  StatItem,
  CourseArea,
  CourseSemester,
  CAActivity,
} from "../types";

export const HERO_DATA = {
  title: "PORTAL OFICIAL DO CENTRO ACADÊMICO",
  subtitle: "CIÊNCIA DA COMPUTAÇÃO - CAJOO",
  description:
    "Conectando estudantes, promovendo inovação, integrando tecnologia e fortalecendo a comunidade acadêmica de Ciência da Computação.",
  tagline: "Sua jornada tech começa aqui no IFC",
  ctaPrimary: "Explorar Portal",
  ctaSecondary: "Acessar Recursos",
};

export const HOME_FEATURES = [
  {
    id: "recursos",
    title: "Recursos Oficiais",
    description:
      "Acesso rápido ao SIGAA, Moodle, Biblioteca, Horários de Aulas e Repositórios.",
    iconName: "ExternalLink",
    link: "/recursos",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "comunicados",
    title: "Comunicados & Avisos",
    description:
      "Fique por dentro das notícias, vagas de estágio, editais e novidades do curso.",
    iconName: "Bell",
    link: "/comunicados",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "eventos",
    title: "Eventos & Workshops",
    description:
      "Semanas acadêmicas, minicursos, torneios de programação e encontros sociais.",
    iconName: "Calendar",
    link: "/galeria",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "contatos",
    title: "Canais do CAJOO",
    description:
      "Fale diretamente com a diretoria, envie sugestões ou tire dúvidas acadêmicas.",
    iconName: "MessageSquare",
    link: "/contato",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "curso",
    title: "Guia do Curso",
    description:
      "Grade curricular, professores, áreas de atuação e mercado de trabalho em TI.",
    iconName: "BookOpen",
    link: "/curso",
    color: "from-violet-500 to-fuchsia-600",
  },
];

export const ACONTECENDO_AGORA = [
  {
    id: "act-1",
    title: "Semana de Inovação & Tecnologia CAJOO 2026",
    date: "15 a 18 de Agosto",
    tag: "Destaque",
    description:
      "48 horas de desenvolvimento e workshops intensos com mentoria de empresas de tecnologia e premiações em PIX e gadgets.",
    link: "/comunicados",
    buttonText: "Garantir Vaga",
  },
  {
    id: "act-2",
    title: "Inscrições Abertas: Monitoria Acadêmica 2026/2",
    date: "Inscrições até 05 de Agosto",
    tag: "Acadêmico",
    description:
      "Oportunidade para ser monitor de Algoritmos, Estrutura de Dados e Engenharia de Software com bolsa discente.",
    link: "/comunicados",
    buttonText: "Ver Edital",
  },
  {
    id: "act-3",
    title: "Torneio e-Sports Inter-Cursos: Valorant & CS2",
    date: "Sábado, 22 de Agosto",
    tag: "Integração",
    description:
      "Traga sua equipe e participe do maior campeonato de jogos eletrônicos promovido pelo CAJOO.",
    link: "/galeria",
    buttonText: "Saiba Mais",
  },
];

export const STATS: StatItem[] = [
  {
    number: "450+",
    label: "Estudantes Ativos",
    subtext: "Matriculados no curso de Ciência da Computação",
    icon: "Users",
  },
  {
    number: "35+",
    label: "Eventos Realizados",
    subtext: "Palestras, minicursos e integrações",
    icon: "Trophy",
  },
  {
    number: "18+",
    label: "Projetos de Extensão",
    subtext: "Inovação tecnológica e impacto na comunidade",
    icon: "Code",
  },
  {
    number: "100%",
    label: "Apoio Discente",
    subtext: "Defesa dos direitos e suporte diário ao aluno",
    icon: "ShieldCheck",
  },
];

export const COURSE_AREAS: CourseArea[] = [
  {
    id: "ai-data",
    title: "Inteligência Artificial & Dados",
    description:
      "Machine Learning, Aprendizado Profundo, Visão Computacional e Ciência de Dados Aplicada.",
    iconName: "Brain",
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Data Analytics"],
  },
  {
    id: "dev-fullstack",
    title: "Desenvolvimento Full-Stack",
    description:
      "Construção de aplicações web e mobile modernas com arquitetura escalável e nuvem.",
    iconName: "Layout",
    skills: ["React", "Node.js", "TypeScript", "Docker", "REST/GraphQL"],
  },
  {
    id: "cybersecurity",
    title: "Cibersegurança & Redes",
    description:
      "Análise de vulnerabilidades, criptografia aplicada, segurança em redes e computação forense.",
    iconName: "Shield",
    skills: ["Linux", "PenTesting", "Criptografia", "Redes de Computadores"],
  },
  {
    id: "systems-architecture",
    title: "Sistemas Distribuídos & Cloud",
    description:
      "Computação em nuvem, microserviços, orquestração de containers e alta disponibilidade.",
    iconName: "Server",
    skills: ["AWS/GCP", "Kubernetes", "DevOps", "Go", "Rust"],
  },
];

export const COURSE_SEMESTERS: CourseSemester[] = [
  {
    semester: 1,
    title: "1º Semestre",
    totalHours: "330h",
    subjects: [
      { code: "CCC0701", name: "Algoritmos", hours: "90h" },
      { code: "CCC0702", name: "Fundamentos da Computação", hours: "60h" },
      {
        code: "CCC0703",
        name: "Fundamentos Matemáticos da Computação",
        hours: "60h",
      },
      { code: "CCC0704", name: "Inglês Instrumental", hours: "30h" },
      { code: "CCC0705", name: "Metodologia Científica", hours: "30h" },
      { code: "CCC0706", name: "Pré-Cálculo", hours: "60h" },
    ],
  },
  {
    semester: 2,
    title: "2º Semestre",
    totalHours: "360h",
    subjects: [
      { code: "CCC0707", name: "Álgebra Linear", hours: "60h" },
      {
        code: "CCC0708",
        name: "Cálculo Diferencial e Integral I",
        hours: "60h",
        prerequisite: "Pré-Cálculo",
      },
      { code: "CCC0709", name: "Circuitos Digitais", hours: "30h" },
      {
        code: "CCC0710",
        name: "Estrutura de Dados I",
        hours: "60h",
        prerequisite: "Algoritmos",
      },
      { code: "CCC0711", name: "Ética e Legislação", hours: "30h" },
      { code: "CCC0712", name: "Matemática Discreta", hours: "60h" },
      {
        code: "CCC0713",
        name: "Programação Orientada a Objetos I",
        hours: "60h",
      },
    ],
  },
  {
    semester: 3,
    title: "3º Semestre",
    totalHours: "360h",
    subjects: [
      {
        code: "CCC0714",
        name: "Arquitetura de Computadores",
        hours: "60h",
        prerequisite: "Circuitos Digitais",
      },
      { code: "CCC0715", name: "Banco de Dados I", hours: "60h" },
      {
        code: "CCC0716",
        name: "Cálculo Diferencial e Integral II",
        hours: "60h",
        prerequisite: "Cálculo I",
      },
      { code: "CCC0717", name: "Epistemologia e Filosofia", hours: "30h" },
      {
        code: "CCC0718",
        name: "Estrutura de Dados II",
        hours: "60h",
        prerequisite: "Estrutura de Dados I",
      },
      { code: "CCC0719", name: "Paradigmas de Programação", hours: "30h" },
      {
        code: "CCC0720",
        name: "Programação Orientada a Objetos II",
        hours: "60h",
        prerequisite: "POO I",
      },
    ],
  },
  {
    semester: 4,
    title: "4º Semestre",
    totalHours: "360h",
    subjects: [
      {
        code: "CCC0721",
        name: "Banco de Dados II",
        hours: "60h",
        prerequisite: "Banco de Dados I",
      },
      {
        code: "CCC0722",
        name: "Ciência, Tecnologia e Sociedade",
        hours: "30h",
      },
      { code: "CCC0723", name: "Desenvolvimento Web I", hours: "60h" },
      {
        code: "CCC0724",
        name: "Extensão e Pesquisa em Computação",
        hours: "60h",
      },
      { code: "CCC0725", name: "Física", hours: "30h" },
      {
        code: "CCC0726",
        name: "Métodos Numéricos",
        hours: "60h",
        prerequisite: "Cálculo II",
      },
      { code: "CCC0727", name: "Sistemas Operacionais", hours: "60h" },
    ],
  },
  {
    semester: 5,
    title: "5º Semestre",
    totalHours: "360h",
    subjects: [
      {
        code: "CCC0728",
        name: "Desenvolvimento Web II",
        hours: "60h",
        prerequisite: "Desenvolvimento Web I",
      },
      { code: "CCC0729", name: "Engenharia de Software I", hours: "60h" },
      {
        code: "CCC0730",
        name: "Interação Humana com Dispositivos",
        hours: "30h",
      },
      { code: "CCC0731", name: "Probabilidade e Estatística", hours: "60h" },
      { code: "CCC0732", name: "Programação Lógica e Funcional", hours: "30h" },
      { code: "CCC0733", name: "Projeto Aplicado I", hours: "60h" },
      { code: "CCC0734", name: "Redes de Computadores I", hours: "60h" },
    ],
  },
  {
    semester: 6,
    title: "6º Semestre",
    totalHours: "360h",
    subjects: [
      {
        code: "CCC0735",
        name: "Engenharia de Software II",
        hours: "60h",
        prerequisite: "Eng. Software I",
      },
      { code: "CCC0736", name: "Inteligência Artificial", hours: "60h" },
      { code: "CCC0737", name: "Linguagens Formais e Autômatos", hours: "60h" },
      { code: "CCC0738", name: "Projeto Aplicado II", hours: "60h" },
      {
        code: "CCC0739",
        name: "Redes de Computadores II",
        hours: "60h",
        prerequisite: "Redes I",
      },
      { name: "Optativa I", hours: "60h", isOptative: true },
    ],
  },
  {
    semester: 7,
    title: "7º Semestre",
    totalHours: "360h",
    subjects: [
      {
        code: "CCC0740",
        name: "Aprendizado de Máquina",
        hours: "60h",
        prerequisite: "Probabilidade e Estatística",
      },
      {
        code: "CCC0741",
        name: "Compiladores",
        hours: "60h",
        prerequisite: "Linguagens Formais e Autômatos",
      },
      { code: "CCC0742", name: "Computação Gráfica", hours: "60h" },
      {
        code: "CCC0743",
        name: "Projeto de Trabalho de Conclusão de Curso",
        hours: "60h",
        prerequisite: "60% Obrigatórias",
      },
      {
        code: "CCC0744",
        name: "Sistemas Embarcados",
        hours: "60h",
        prerequisite: "Circuitos Digitais",
      },
      { name: "Optativa II", hours: "60h", isOptative: true },
    ],
  },
  {
    semester: 8,
    title: "8º Semestre",
    totalHours: "360h",
    subjects: [
      {
        code: "CCC0745",
        name: "Ciência de Dados",
        hours: "60h",
        prerequisite: "Aprendizado de Máquina",
      },
      { code: "CCC0746", name: "Empreendedorismo", hours: "60h" },
      { code: "CCC0747", name: "Segurança em Sistemas", hours: "60h" },
      { code: "CCC0748", name: "Teoria da Computação", hours: "60h" },
      {
        code: "CCC0749",
        name: "Trabalho de Conclusão de Curso",
        hours: "60h",
        prerequisite: "Projeto de TCC",
      },
      { name: "Optativa III", hours: "60h", isOptative: true },
    ],
  },
];

export const CURRICULUM_SUMMARY = {
  totalHours: "3200h",
  theoreticalHours: "1645h",
  practicalHours: "1205h",
  optativeHours: "180h",
  accHours: "260h",
  extensionResearchHours: "550h",
  semestersCount: 8,
  periodicity: "Anual",
  turn: "Integral",
  vagas: 40,
};

export const DIRETORIA: MembroDiretoria[] = [
  {
    id: "dir-1",
    name: "Gustavo",
    role: "PRESIDENTE",
    photoUrl: "src/assets/images/gustavo.jpg",
    bio: "Estudante do 7º semestre. Liderança executiva e representação do CAJOO junto ao instituto.",
    email: "anapaula.ca@estudante.ifc.edu.br",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "dir-2",
    name: "Lucas ",
    role: "VICE-PRESIDENTE",
    photoUrl: "src/assets/images/lucas.jpg",
    bio: "Estudante do 6º semestre. Coordenador de integração discente e suporte à presidência.",
    email: "lucas.ca@estudante.ifc.edu.br",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "dir-3",
    name: "Gabriela",
    role: "DIRETORA DE COMUNICAÇÃO",
    photoUrl: "src/assets/images/gabriela.jpg",
    bio: "Estudante do 5º semestre. Organização da Semana Acadêmica, workshops e minicursos.",
    email: "marina.ca@estudante.ifc.edu.br",
    instagram: "https://instagram.com",
  },
  {
    id: "dir-4",
    name: "Ana Paula",
    role: "SECRETÁRIA-GERAL",
    photoUrl: "src/assets/images/ana.jpeg",
    bio: "Estudante do 5º semestre. Gestão de grupos de estudos, representação em colegiado e tutoria.",
    email: "pedro.ca@estudante.ifc.edu.br",
    github: "https://github.com",
  },
  {
    id: "dir-5",
    name: "Willian",
    role: "TESOUREIRO",
    photoUrl: "src/assets/images/willian.jpg",
    bio: "Estudante do 4º semestre. Responsável pelas redes sociais, comunicados e identidade visual.",
    email: "beatriz.ca@estudante.ifc.edu.br",
    instagram: "https://instagram.com",
  },
  {
    id: "dir-6",
    name: "Calebe",
    role: "SUPLENTE",
    photoUrl: "src/assets/images/calebe.jpg",
    bio: "Estudante do 6º semestre. Gerenciamento de tesouraria, patrimônio e apoio a eventos.",
    email: "gabriel.ca@estudante.ifc.edu.br",
    linkedin: "https://linkedin.com",
  },

  {
    id: "dir-7",
    name: "Iarla",
    role: "SUPLENTE",
    photoUrl: "src/assets/images/iarla.jpg",
    bio: "Estudante do 6º semestre. Gerenciamento de tesouraria, patrimônio e apoio a eventos.",
    email: "gabriel.ca@estudante.ifc.edu.br",
    linkedin: "https://linkedin.com",
  },

  {
    id: "dir-8",
    name: "Alexandre",
    role: "SUPLENTE",
    photoUrl: "src/assets/images/alexandre.jpg",
    bio: "Estudante do 6º semestre. Gerenciamento de tesouraria, patrimônio e apoio a eventos.",
    email: "gabriel.ca@estudante.ifc.edu.br",
    linkedin: "https://linkedin.com",
  },

  {
    id: "dir-9",
    name: "Davi",
    role: "SUPLENTE",
    photoUrl: "src/assets/images/davi.jpg",
    bio: "Estudante do 6º semestre. Gerenciamento de tesouraria, patrimônio e apoio a eventos.",
    email: "gabriel.ca@estudante.ifc.edu.br",
    linkedin: "https://linkedin.com",
  },
];

export const CA_ACTIVITIES: CAActivity[] = [
  {
    id: "act-2",
    title: "Maratona Interina de Programação",
    description:
      "Competição interna no formato ICPC para treinar lógica, algoritmos e resolução rápida de problemas.",
    iconName: "Code2",
    period: "Semestral",
  },
];

export const RECURSOS_OFICIAIS: Recurso[] = [
  {
    id: "rec-1",
    title: "SIGAA - Sistema Acadêmico",
    description:
      "Consulta de notas, frequência, emissão de atestados, plano de ensino e matrículas online.",
    url: "https://sig.ifc.edu.br/sigaa/verTelaLogin.do",
    category: "Sistemas",
    iconName: "GraduationCap",
    badge: "Essencial",
    isExternal: true,
  },
  {
    id: "rec-2",
    title: "Moodle Institucional",
    description:
      "Ambiente Virtual de Aprendizagem (AVA) para acesso a materiais das disciplinas, tarefas e fóruns.",
    url: "https://moodle.ifc.edu.br",
    category: "Sistemas",
    iconName: "Laptop",
    badge: "Aulas",
    isExternal: true,
  },
  {
    id: "rec-3",
    title: "Portal de Periódicos & Biblioteca",
    description:
      "Acesso à Biblioteca Pearson, Periódicos CAPES e acervo físico e digital do IFC.",
    url: "https://biblioteca.ifc.edu.br",
    category: "Biblioteca",
    iconName: "BookMarked",
    isExternal: true,
  },
  {
    id: "rec-5",
    title: "Horários de Aulas & Calendário",
    description:
      "Grade horária atualizada de todos os semestres e calendário acadêmico oficial.",
    url: "#",
    category: "Institucional",
    iconName: "CalendarDays",
    isExternal: false,
  },
  {
    id: "rec-6",
    title: "Manual do Calouro CAJOO",
    description:
      "Guia completo de sobrevivência no curso, dicas de estudos, mapa do campus e contatos úteis.",
    url: "#",
    category: "Institucional",
    iconName: "Compass",
    badge: "Download PDF",
    isExternal: false,
  },
];

export const COMUNICADOS_DATA: Comunicado[] = [
  {
    id: "com-1",
    title:
      "Abertas as Inscrições para a Semana Acadêmica de Ciência da Computação 2026 - O Maior Evento de TI do IFC",
    category: "Eventos",
    date: "28 de Julho, 2026",
    description:
      "A Semana Acadêmica de Ciência da Computação contará com 15 palestrantes renomados e mais de R$ 5.000 em prêmios.",
    content: `A diretoria do CAJOO orgulhosamente anuncia a abertura das inscrições para a edição 2026 da Semana Acadêmica de Ciência da Computação.\n\nNeste ano, o tema central será "Inteligência Artificial Responsável e Arquiteturas Escaláveis em Nuvem". Teremos a participação de profissionais que atuam em grandes multinacionais de tecnologia, workshops hands-on de Docker, Kubernetes, React, Python para ML e Cibersegurança.\n\nData do Evento: 15 a 18 de Agosto de 2026\nInscrições gratuitas para todos os estudantes de Ciência da Computação através deste portal!`,
    author: "Diretoria de Mídia",
    featured: true,
    tags: ["Semana Acadêmica", "Inscrições", "Workshops", "IA"],
  },
  {
    id: "com-2",
    title: "Programa de Estágio Dev&Tech na empresa Senior Systems",
    category: "Estágio",
    date: "25 de Julho, 2026",
    description:
      "Vagas exclusivas para estudantes a partir do 4º semestre com possibilidade de atuação remota e híbrida.",
    content: `Está buscando sua primeira oportunidade no mercado de tecnologia?\n\nA Senior Systems abriu processo seletivo para estagiários em Desenvolvimento Backend (Java/Node), Frontend (React/TypeScript) e Análise de Dados.\n\nRequisitos:\n- Estar cursando Ciência da Computação a partir do 4º período\n- Conhecimento básico em lógica e estruturas de dados\n- Vontade de aprender e trabalhar em equipe\n\nBolsa auxílio: R$ 2.100,00 + Vale Alimentação + Plano de Saúde. Envie seu currículo até 10/08.`,
    author: "Diretoria Acadêmica",
    tags: ["Estágio", "Carreira", "Senior Systems", "Vagas"],
  },
  {
    id: "com-3",
    title: "Divulgação do Calendário das Provas Regimentais do 1º Semestre",
    category: "Acadêmico",
    date: "20 de Julho, 2026",
    description:
      "Confira as datas das avaliações finais de todas as turmas para evitar conflitos de horários.",
    content: `A coordenação do curso de Ciência da Computação liberou a tabela atualizada de exames do primeiro semestre de 2026.\n\nPedimos a todos os acadêmicos que revisem atentamente as datas para evitar overlapping. Em caso de duas provas agendadas no mesmo turno para o mesmo aluno devido a dependências, entre em contato com a coordenação em até 5 dias úteis.`,
    author: "Coordenação do Curso",
    tags: ["Provas", "SIGAA", "Calendário"],
  },
  {
    id: "com-4",
    title:
      "Resultado Final do Edital de Monitoria para Algoritmos e Programação",
    category: "Acadêmico",
    date: "18 de Julho, 2026",
    description:
      "Confira a lista dos alunos selecionados para atuar como monitores no próximo semestre.",
    content: `O Centro Acadêmico parabeniza os acadêmicos aprovados no processo seletivo de monitoria discente. Os horários de atendimento aos alunos serão publicados no Moodle no primeiro dia de aulas do semestre letivo.`,
    author: "Diretoria Acadêmica",
    tags: ["Monitoria", "Aprovados", "Algoritmos"],
  },
  {
    id: "com-5",
    title: "Torneio e-Sports CAJOO: Regulamento e Inscrições Abertas",
    category: "Eventos",
    date: "12 de Julho, 2026",
    description:
      "Monte seu time de Valorant ou Counter-Strike 2 e dispute o troféu do CAJOO 2026.",
    content: `Chegou a hora de provar suas habilidades nos jogos! O CAJOO promove o torneio online de e-Sports nos dias 22 e 23 de Agosto.\n\nPremiação para os 1º e 2º colocados de cada modalidade. Inscrições de times abertas até 18 de Agosto!`,
    author: "Diretoria de Eventos",
    tags: ["eSports", "Jogos", "Integração"],
  },
];

export const GALERIA_DATA: EventoGaleria[] = [
  {
    id: "gal-1",
    title: "Semana Acadêmica de Ciência da Computação (2025)",
    eventDate: "Outubro de 2025",
    category: "Acadêmico",
    mainImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
    ],
    description:
      "Palestras magnas sobre Inteligência Artificial, Engenharia de Software e Maratona de Programação com mais de 200 participantes.",
    location: "Auditório Principal IFC",
  },
  {
    id: "gal-2",
    title: "Maratona CAJOO - Devs pela Sustentabilidade",
    eventDate: "Novembro de 2025",
    category: "Competição",
    mainImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    ],
    description:
      "36 horas de desenvolvimento ininterrupto resolvendo problemas de cidades inteligentes e energias renováveis.",
    location: "Laboratório de Informática Avançada",
  },
  {
    id: "gal-3",
    title: "Recepção e Acolhimento dos Calouros",
    eventDate: "Março de 2026",
    category: "Integração",
    mainImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80",
    ],
    description:
      "Acolhimento da nova turma de Ciência da Computação com doação de alimentos para a comunidade local.",
    location: "Área Convivencial do Campus",
  },
  {
    id: "gal-4",
    title: "Visita Técnica ao Polo Tecnológico de TI",
    eventDate: "Maio de 2026",
    category: "Visita Técnica",
    mainImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80",
    ],
    description:
      "Estudantes conhecendo o dia a dia de empresas líderes em desenvolvimento de software e infraestrutura cloud.",
    location: "Parque Tecnológico",
  },
];

export const FAQS = [
  {
    q: "Como posso entrar em contato com o CAJOO?",
    a: "Você pode enviar uma mensagem pelo formulário da página de Contato, nos mandar um e-mail em cajoo.ifc@gmail.com ou nos procurar presencialmente na sala do Centro Acadêmico.",
  },
  {
    q: "O que é necessário para participar da diretoria do CAJOO?",
    a: "Qualquer acadêmico regularmente matriculado no curso de Ciência da Computação pode formar ou integrar uma chapa nas eleições para a gestão do CA.",
  },
  {
    q: "O CAJOO emite certificados para participantes de eventos?",
    a: "Sim! Todos os participantes cadastrados em nossos workshops, minicursos e semanas acadêmicas recebem certificado digital válido como horas complementares.",
  },
];

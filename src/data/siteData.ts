import { CAActivity, CourseArea, CourseSemester, Recurso, StatItem } from '../types';

export const HERO_DATA = {
  title: 'PORTAL OFICIAL DO CENTRO ACADÊMICO',
  subtitle: 'CIÊNCIA DA COMPUTAÇÃO - CAJOO',
  description:
    'Conectando estudantes, promovendo inovação, integrando tecnologia e fortalecendo a comunidade acadêmica de Ciência da Computação.',
  tagline: 'Sua jornada tech começa aqui no IFC',
  ctaPrimary: 'Explorar Portal',
  ctaSecondary: 'Acessar Recursos',
};

export const HOME_FEATURES = [
  {
    id: 'recursos',
    title: 'Recursos Oficiais',
    description: 'Acesso rápido ao SIGAA, Moodle, Biblioteca, Horários de Aulas e Repositórios.',
    iconName: 'ExternalLink',
    link: '/recursos',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'comunicados',
    title: 'Comunicados & Avisos',
    description: 'Fique por dentro das notícias, vagas de estágio, editais e novidades do curso.',
    iconName: 'Bell',
    link: '/comunicados',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'eventos',
    title: 'Eventos & Workshops',
    description: 'Semanas acadêmicas, minicursos, torneios de programação e encontros sociais.',
    iconName: 'Calendar',
    link: '/galeria',
    color: 'from-fuchsia-500 to-purple-600',
  },
  {
    id: 'equipe',
    title: 'Nossa Comunidade',
    description: 'Fale diretamente com a diretoria, envie sugestões ou tire dúvidas acadêmicas.',
    iconName: 'Users',
    link: '/ca',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'curso',
    title: 'Guia do Curso',
    description: 'Grade curricular, professores, áreas de atuação e mercado de trabalho em TI.',
    iconName: 'BookOpen',
    link: '/curso',
    color: 'from-violet-500 to-fuchsia-600',
  },
  {
    id: 'galeria',
    title: 'Memórias do CAJOO',
    description: 'Relembre os encontros, eventos e momentos que fazem parte da nossa comunidade.',
    iconName: 'GraduationCap',
    link: '/galeria',
    color: 'from-purple-500 to-pink-500',
  },
];

export const STATS: StatItem[] = [
  {
    number: '450+',
    label: 'Estudantes Ativos',
    subtext: 'Matriculados no curso de Ciência da Computação',
    icon: 'Users',
  },
  {
    number: '35+',
    label: 'Eventos Realizados',
    subtext: 'Palestras, minicursos e integrações',
    icon: 'Trophy',
  },
  {
    number: '18+',
    label: 'Projetos de Extensão',
    subtext: 'Inovação tecnológica e impacto na comunidade',
    icon: 'Code',
  },
  {
    number: '100%',
    label: 'Apoio Discente',
    subtext: 'Defesa dos direitos e suporte diário ao aluno',
    icon: 'ShieldCheck',
  },
];

export const COURSE_AREAS: CourseArea[] = [
  {
    id: 'ai-data',
    title: 'Inteligência Artificial & Dados',
    description: 'Machine Learning, Aprendizado Profundo, Visão Computacional e Ciência de Dados Aplicada.',
    iconName: 'Brain',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Data Analytics'],
  },
  {
    id: 'dev-fullstack',
    title: 'Desenvolvimento Full-Stack',
    description: 'Construção de aplicações web e mobile modernas com arquitetura escalável e nuvem.',
    iconName: 'Layout',
    skills: ['React', 'Node.js', 'TypeScript', 'Docker', 'REST/GraphQL'],
  },
  {
    id: 'cybersecurity',
    title: 'Cibersegurança & Redes',
    description:
      'Análise de vulnerabilidades, criptografia aplicada, segurança em redes e computação forense.',
    iconName: 'Shield',
    skills: ['Linux', 'PenTesting', 'Criptografia', 'Redes de Computadores'],
  },
  {
    id: 'systems-architecture',
    title: 'Sistemas Distribuídos & Cloud',
    description: 'Computação em nuvem, microserviços, orquestração de containers e alta disponibilidade.',
    iconName: 'Server',
    skills: ['AWS/GCP', 'Kubernetes', 'DevOps', 'Go', 'Rust'],
  },
];

export const COURSE_SEMESTERS: CourseSemester[] = [
  {
    semester: 1,
    title: '1º Semestre',
    totalHours: '330h',
    subjects: [
      { code: 'CCC0701', name: 'Algoritmos', hours: '90h' },
      { code: 'CCC0702', name: 'Fundamentos da Computação', hours: '60h' },
      {
        code: 'CCC0703',
        name: 'Fundamentos Matemáticos da Computação',
        hours: '60h',
      },
      { code: 'CCC0704', name: 'Inglês Instrumental', hours: '30h' },
      { code: 'CCC0705', name: 'Metodologia Científica', hours: '30h' },
      { code: 'CCC0706', name: 'Pré-Cálculo', hours: '60h' },
    ],
  },
  {
    semester: 2,
    title: '2º Semestre',
    totalHours: '360h',
    subjects: [
      { code: 'CCC0707', name: 'Álgebra Linear', hours: '60h' },
      {
        code: 'CCC0708',
        name: 'Cálculo Diferencial e Integral I',
        hours: '60h',
        prerequisite: 'Pré-Cálculo',
      },
      { code: 'CCC0709', name: 'Circuitos Digitais', hours: '30h' },
      {
        code: 'CCC0710',
        name: 'Estrutura de Dados I',
        hours: '60h',
        prerequisite: 'Algoritmos',
      },
      { code: 'CCC0711', name: 'Ética e Legislação', hours: '30h' },
      { code: 'CCC0712', name: 'Matemática Discreta', hours: '60h' },
      {
        code: 'CCC0713',
        name: 'Programação Orientada a Objetos I',
        hours: '60h',
      },
    ],
  },
  {
    semester: 3,
    title: '3º Semestre',
    totalHours: '360h',
    subjects: [
      {
        code: 'CCC0714',
        name: 'Arquitetura de Computadores',
        hours: '60h',
        prerequisite: 'Circuitos Digitais',
      },
      { code: 'CCC0715', name: 'Banco de Dados I', hours: '60h' },
      {
        code: 'CCC0716',
        name: 'Cálculo Diferencial e Integral II',
        hours: '60h',
        prerequisite: 'Cálculo I',
      },
      { code: 'CCC0717', name: 'Epistemologia e Filosofia', hours: '30h' },
      {
        code: 'CCC0718',
        name: 'Estrutura de Dados II',
        hours: '60h',
        prerequisite: 'Estrutura de Dados I',
      },
      { code: 'CCC0719', name: 'Paradigmas de Programação', hours: '30h' },
      {
        code: 'CCC0720',
        name: 'Programação Orientada a Objetos II',
        hours: '60h',
        prerequisite: 'POO I',
      },
    ],
  },
  {
    semester: 4,
    title: '4º Semestre',
    totalHours: '360h',
    subjects: [
      {
        code: 'CCC0721',
        name: 'Banco de Dados II',
        hours: '60h',
        prerequisite: 'Banco de Dados I',
      },
      {
        code: 'CCC0722',
        name: 'Ciência, Tecnologia e Sociedade',
        hours: '30h',
      },
      { code: 'CCC0723', name: 'Desenvolvimento Web I', hours: '60h' },
      {
        code: 'CCC0724',
        name: 'Extensão e Pesquisa em Computação',
        hours: '60h',
      },
      { code: 'CCC0725', name: 'Física', hours: '30h' },
      {
        code: 'CCC0726',
        name: 'Métodos Numéricos',
        hours: '60h',
        prerequisite: 'Cálculo II',
      },
      { code: 'CCC0727', name: 'Sistemas Operacionais', hours: '60h' },
    ],
  },
  {
    semester: 5,
    title: '5º Semestre',
    totalHours: '360h',
    subjects: [
      {
        code: 'CCC0728',
        name: 'Desenvolvimento Web II',
        hours: '60h',
        prerequisite: 'Desenvolvimento Web I',
      },
      { code: 'CCC0729', name: 'Engenharia de Software I', hours: '60h' },
      {
        code: 'CCC0730',
        name: 'Interação Humana com Dispositivos',
        hours: '30h',
      },
      { code: 'CCC0731', name: 'Probabilidade e Estatística', hours: '60h' },
      { code: 'CCC0732', name: 'Programação Lógica e Funcional', hours: '30h' },
      { code: 'CCC0733', name: 'Projeto Aplicado I', hours: '60h' },
      { code: 'CCC0734', name: 'Redes de Computadores I', hours: '60h' },
    ],
  },
  {
    semester: 6,
    title: '6º Semestre',
    totalHours: '360h',
    subjects: [
      {
        code: 'CCC0735',
        name: 'Engenharia de Software II',
        hours: '60h',
        prerequisite: 'Eng. Software I',
      },
      { code: 'CCC0736', name: 'Inteligência Artificial', hours: '60h' },
      { code: 'CCC0737', name: 'Linguagens Formais e Autômatos', hours: '60h' },
      { code: 'CCC0738', name: 'Projeto Aplicado II', hours: '60h' },
      {
        code: 'CCC0739',
        name: 'Redes de Computadores II',
        hours: '60h',
        prerequisite: 'Redes I',
      },
      { name: 'Optativa I', hours: '60h', isOptative: true },
    ],
  },
  {
    semester: 7,
    title: '7º Semestre',
    totalHours: '360h',
    subjects: [
      {
        code: 'CCC0740',
        name: 'Aprendizado de Máquina',
        hours: '60h',
        prerequisite: 'Probabilidade e Estatística',
      },
      {
        code: 'CCC0741',
        name: 'Compiladores',
        hours: '60h',
        prerequisite: 'Linguagens Formais e Autômatos',
      },
      { code: 'CCC0742', name: 'Computação Gráfica', hours: '60h' },
      {
        code: 'CCC0743',
        name: 'Projeto de Trabalho de Conclusão de Curso',
        hours: '60h',
        prerequisite: '60% Obrigatórias',
      },
      {
        code: 'CCC0744',
        name: 'Sistemas Embarcados',
        hours: '60h',
        prerequisite: 'Circuitos Digitais',
      },
      { name: 'Optativa II', hours: '60h', isOptative: true },
    ],
  },
  {
    semester: 8,
    title: '8º Semestre',
    totalHours: '360h',
    subjects: [
      {
        code: 'CCC0745',
        name: 'Ciência de Dados',
        hours: '60h',
        prerequisite: 'Aprendizado de Máquina',
      },
      { code: 'CCC0746', name: 'Empreendedorismo', hours: '60h' },
      { code: 'CCC0747', name: 'Segurança em Sistemas', hours: '60h' },
      { code: 'CCC0748', name: 'Teoria da Computação', hours: '60h' },
      {
        code: 'CCC0749',
        name: 'Trabalho de Conclusão de Curso',
        hours: '60h',
        prerequisite: 'Projeto de TCC',
      },
      { name: 'Optativa III', hours: '60h', isOptative: true },
    ],
  },
];

export const CURRICULUM_SUMMARY = {
  totalHours: '3200h',
  theoreticalHours: '1645h',
  practicalHours: '1205h',
  optativeHours: '180h',
  accHours: '260h',
  extensionResearchHours: '550h',
  semestersCount: 8,
  periodicity: 'Anual',
  turn: 'Integral',
  vagas: 40,
};

export const CA_ACTIVITIES: CAActivity[] = [
  {
    id: 'act-2',
    title: 'Maratona Interina de Programação',
    description:
      'Competição interna no formato ICPC para treinar lógica, algoritmos e resolução rápida de problemas.',
    iconName: 'Code2',
    period: 'Semestral',
  },
];

export const RECURSOS_OFICIAIS: Recurso[] = [
  {
    id: 'rec-1',
    title: 'SIGAA - Sistema Acadêmico',
    description: 'Consulta de notas, frequência, emissão de atestados, plano de ensino e matrículas online.',
    url: 'https://sig.ifc.edu.br/sigaa/verTelaLogin.do',
    category: 'Sistemas',
    iconName: 'GraduationCap',
    badge: 'Essencial',
    isExternal: true,
  },
  {
    id: 'rec-2',
    title: 'Moodle Institucional',
    description:
      'Ambiente Virtual de Aprendizagem (AVA) para acesso a materiais das disciplinas, tarefas e fóruns.',
    url: 'https://moodle.ifc.edu.br',
    category: 'Sistemas',
    iconName: 'Laptop',
    badge: 'Aulas',
    isExternal: true,
  },
  {
    id: 'rec-3',
    title: 'Portal de Periódicos & Biblioteca',
    description: 'Acesso à Biblioteca Pearson, Periódicos CAPES e acervo físico e digital do IFC.',
    url: 'https://biblioteca.ifc.edu.br',
    category: 'Biblioteca',
    iconName: 'BookMarked',
    isExternal: true,
  },
  {
    id: 'rec-5',
    title: 'Horários de Aulas & Calendário',
    description: 'Grade horária atualizada de todos os semestres e calendário acadêmico oficial.',
    url: '#',
    category: 'Institucional',
    iconName: 'CalendarDays',
    isExternal: false,
  },
  {
    id: 'rec-6',
    title: 'Manual do Calouro CAJOO',
    description:
      'Guia completo de sobrevivência no curso, dicas de estudos, mapa do campus e contatos úteis.',
    url: '#',
    category: 'Institucional',
    iconName: 'Compass',
    badge: 'Download PDF',
    isExternal: false,
  },
];

export const FAQS = [
  {
    q: 'Como posso entrar em contato com o CAJOO?',
    a: 'Você pode falar com o CAJOO pelo Instagram @ca.computacao, enviar um e-mail para cajoo.ifc@gmail.com ou nos procurar presencialmente.',
  },
  {
    q: 'O que é necessário para participar da diretoria do CAJOO?',
    a: 'Qualquer acadêmico regularmente matriculado no curso de Ciência da Computação pode formar ou integrar uma chapa nas eleições para a gestão do CA.',
  },
  {
    q: 'O CAJOO emite certificados para participantes de eventos?',
    a: 'Sim! Todos os participantes cadastrados em nossos workshops, minicursos e semanas acadêmicas recebem certificado digital válido como horas complementares.',
  },
];

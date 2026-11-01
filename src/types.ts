export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  mustChangePassword: boolean;
  hasAccess: boolean;
  position: string;
  photoUrl: string;
  bio: string;
  visible: boolean;
  order: number;
  year: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  year: number;
}

export interface Comunicado {
  id: string;
  title: string;
  category: 'Geral' | 'Acadêmico' | 'Eventos' | 'Oportunidades' | 'Estágio';
  date: string;
  description: string;
  content: string;
  author: string;
  featured?: boolean;
  tags: string[];
}

export interface Recurso {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'Sistemas' | 'Biblioteca' | 'Estudos' | 'Institucional';
  iconName: string;
  badge?: string;
  isExternal: boolean;
}

export interface MembroDiretoria {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface EventoGaleria {
  id: string;
  title: string;
  eventDate: string;
  category: string;
  mainImage: string;
  galleryImages: string[];
  description: string;
  location: string;
  featured?: boolean;
}

export interface StatItem {
  number: string;
  label: string;
  subtext: string;
  icon: string;
}

export interface CourseArea {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: string[];
}

export interface CourseSubject {
  code?: string;
  name: string;
  hours: string;
  prerequisite?: string;
  isOptative?: boolean;
}

export interface CourseSemester {
  semester: number;
  title: string;
  totalHours: string;
  subjects: CourseSubject[];
}

export interface CAActivity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  period: string;
}

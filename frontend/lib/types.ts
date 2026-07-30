export type Role = 'student' | 'instructor' | 'admin';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  learningStats?: {
    hoursLearned: number;
    lessonsCompleted: number;
    currentStreakDays: number;
  };
}

export type DiagramId =
  | 'osi-model'
  | 'tcp-ip-stack'
  | 'encapsulation'
  | 'topology-star'
  | 'topology-mesh'
  | 'topology-bus'
  | 'lan-wan'
  | 'network-devices'
  | 'cabling-types'
  | 'switch-mac-table'
  | 'collision-broadcast-domain'
  | 'vlan-segmentation'
  | 'trunk-link'
  | 'spanning-tree'
  | 'ip-address-anatomy'
  | 'subnet-mask'
  | 'router-table'
  | 'static-vs-dynamic'
  | 'nat'
  | 'cia-triad'
  | 'firewall-acl'
  | 'vpn-tunnel'
  | 'wireless-security';

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface LessonQuiz {
  id: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface LessonPage {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
  diagram?: DiagramId;
  diagramCaption?: string;
  callout?: { label: string; text: string };
}

export interface Lesson {
  id: string;
  title: string;
  type: 'reading' | 'quiz';
  estimatedMinutes: number;
  isPreview: boolean;
  pages: LessonPage[];
  quiz: LessonQuiz;
  completed?: boolean;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  priceCents: number;
  coverImageUrl?: string;
  iconTint?: 'brand' | 'sage' | 'amber';
  curriculum: Section[];
  averageRating: number;
  reviewCount: number;
  enrollmentCount: number;
  instructor?: { fullName: string; avatarUrl?: string };
}

export interface Enrollment {
  _id: string;
  courseId: string | Course;
  percentComplete: number;
  status: 'active' | 'completed' | 'refunded';
}

export interface Certificate {
  _id: string;
  certificateId: string;
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  qrCodeDataUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[];
  completedLessons: string[];
  totalProgress: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar?: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  lessons: number;
  rating: number;
  students: number;
  price: number;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl: string;
  thumbnail?: string;
  order: number;
  isCompleted: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link' | 'download';
  url: string;
  size?: string;
}

export interface Progress {
  courseId: string;
  completedLessons: string[];
  totalLessons: number;
  percentage: number;
  lastAccessed: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  courseCount: number;
} 
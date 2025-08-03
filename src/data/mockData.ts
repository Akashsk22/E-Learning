import { Course, Lesson, User, Category, Progress } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.',
    instructor: 'College Wallah',
    instructorAvatar: 'https://i.ytimg.com/vi/HBqWsrqK89U/sddefault.jpg',
    category: 'Web Development',
    level: 'Beginner',
    duration: 172800, // 48 hours in seconds
    lessons: 24,
    rating: 4.8,
    students: 15420,
    price: 0,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming and data analysis with pandas, numpy, and matplotlib.',
    instructor: 'Code with Harry',
    instructorAvatar: 'data:image/jpeg;base64,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',
    category: 'Data Science',
    level: 'Intermediate',
    duration: 129600, // 36 hours in seconds
    lessons: 18,
    rating: 4.9,
    students: 8920,
    price: 0,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Learn modern design principles, Figma, and create stunning user interfaces.',
    instructor: 'Intellipaat',
    instructorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTWJGkldLJ_ZIq79jZTJcqKTym06qhbW5GJQ&s',
    category: 'Design',
    level: 'Beginner',
    duration: 108000, // 30 hours in seconds
    lessons: 15,
    rating: 4.7,
    students: 6780,
    price: 0,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'User Research'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '4',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps using React Native and JavaScript.',
    instructor: 'Sheryians Coding School',
    instructorAvatar: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&h=150&fit=crop&crop=face',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: 144000, // 40 hours in seconds
    lessons: 20,
    rating: 4.6,
    students: 5430,
    price: 0,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    tags: ['React Native', 'JavaScript', 'Mobile Development', 'iOS', 'Android'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals',
    description: 'Understand the basics of machine learning algorithms and their applications.',
    instructor: 'Dr. Meera Kapoor',
    instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    category: 'Data Science',
    level: 'Advanced',
    duration: 216000, // 60 hours in seconds
    lessons: 30,
    rating: 4.9,
    students: 3240,
    price: 0,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'TensorFlow', 'Neural Networks'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '6',
    title: 'Digital Marketing Strategy',
    description: 'Learn modern digital marketing techniques including SEO, social media, and content marketing.',
    instructor: 'Vikram Malhotra',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: 'Marketing',
    level: 'Beginner',
    duration: 86400, // 24 hours in seconds
    lessons: 12,
    rating: 4.5,
    students: 4560,
    price: 0,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Analytics'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
];

export const mockLessons: Lesson[] = [
  // Course 1: Web Development Bootcamp (24 lessons)
  {
    id: '1-1',
    courseId: '1',
    title: 'Introduction to Web Development',
    description: 'Overview of web development and setting up your development environment.',
    duration: 900, // 15 minutes
    videoUrl: 'https://www.youtube.com/watch?v=HBqWsrqK89U&t=2461s',
    order: 1,
    isCompleted: false
  },
  {
    id: '1-2',
    courseId: '1',
    title: 'HTML Basics and Structure',
    description: 'Learn the fundamentals of HTML markup language and document structure.',
    duration: 1500, // 25 minutes
    videoUrl: '',
    order: 2,
    isCompleted: false
  },
  {
    id: '1-3',
    courseId: '1',
    title: 'CSS Styling and Layout',
    description: 'Master CSS for beautiful and responsive web designs with Flexbox and Grid.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 3,
    isCompleted: false
  },
  {
    id: '1-4',
    courseId: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn JavaScript basics, variables, functions, and DOM manipulation.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 4,
    isCompleted: false
  },
  {
    id: '1-5',
    courseId: '1',
    title: 'ES6+ Modern JavaScript',
    description: 'Master modern JavaScript features including arrow functions, destructuring, and modules.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 5,
    isCompleted: false
  },
  {
    id: '1-6',
    courseId: '1',
    title: 'React Basics and Components',
    description: 'Introduction to React, JSX, components, and state management.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 6,
    isCompleted: false
  },
  {
    id: '1-7',
    courseId: '1',
    title: 'React Hooks and State',
    description: 'Learn useState, useEffect, and other React hooks for state management.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 7,
    isCompleted: false
  },
  {
    id: '1-8',
    courseId: '1',
    title: 'React Router and Navigation',
    description: 'Implement client-side routing and navigation in React applications.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 8,
    isCompleted: false
  },
  {
    id: '1-9',
    courseId: '1',
    title: 'Node.js and Express.js',
    description: 'Build backend APIs using Node.js and Express.js framework.',
    duration: 3000, // 50 minutes
    videoUrl: '',
    order: 9,
    isCompleted: false
  },
  {
    id: '1-10',
    courseId: '1',
    title: 'Database Integration with MongoDB',
    description: 'Connect your application to MongoDB database and perform CRUD operations.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 10,
    isCompleted: false
  },
  {
    id: '1-11',
    courseId: '1',
    title: 'Authentication and Authorization',
    description: 'Implement user authentication and authorization using JWT tokens.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 11,
    isCompleted: false
  },
  {
    id: '1-12',
    courseId: '1',
    title: 'Deployment and Hosting',
    description: 'Deploy your full-stack application to cloud platforms like Heroku and Vercel.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 12,
    isCompleted: false
  },

  // Course 2: Python for Data Science (18 lessons)
  {
    id: '2-1',
    courseId: '2',
    title: 'Python Fundamentals',
    description: 'Introduction to Python programming language and basic syntax.',
    duration: 1200, // 20 minutes
    videoUrl: 'https://www.youtube.com/watch?v=UrsmFxEIp5k',
    order: 1,
    isCompleted: false
  },
  {
    id: '2-2',
    courseId: '2',
    title: 'Data Structures in Python',
    description: 'Learn lists, tuples, dictionaries, and sets for efficient data handling.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 2,
    isCompleted: false
  },
  {
    id: '2-3',
    courseId: '2',
    title: 'Object-Oriented Programming',
    description: 'Master classes, objects, inheritance, and polymorphism in Python.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 3,
    isCompleted: false
  },
  {
    id: '2-4',
    courseId: '2',
    title: 'NumPy Fundamentals',
    description: 'Learn NumPy for numerical computing and array operations.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 4,
    isCompleted: false
  },
  {
    id: '2-5',
    courseId: '2',
    title: 'Pandas Data Manipulation',
    description: 'Master pandas for data manipulation and analysis with DataFrames.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 5,
    isCompleted: false
  },
  {
    id: '2-6',
    courseId: '2',
    title: 'Data Cleaning and Preprocessing',
    description: 'Learn techniques for cleaning, transforming, and preparing data for analysis.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 6,
    isCompleted: false
  },
  {
    id: '2-7',
    courseId: '2',
    title: 'Data Visualization with Matplotlib',
    description: 'Create compelling visualizations using Matplotlib and Seaborn.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 7,
    isCompleted: false
  },
  {
    id: '2-8',
    courseId: '2',
    title: 'Statistical Analysis',
    description: 'Perform statistical analysis and hypothesis testing on datasets.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 8,
    isCompleted: false
  },
  {
    id: '2-9',
    courseId: '2',
    title: 'Exploratory Data Analysis (EDA)',
    description: 'Master the art of exploring and understanding your data through analysis.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 9,
    isCompleted: false
  },

  // Course 3: UI/UX Design Masterclass (15 lessons)
  {
    id: '3-1',
    courseId: '3',
    title: 'Introduction to UI/UX Design',
    description: 'Learn the fundamentals of user interface and user experience design.',
    duration: 1800, // 30 minutes
    videoUrl: 'https://www.youtube.com/watch?v=jdmX8ZIMRUU',
    order: 1,
    isCompleted: false
  },
  {
    id: '3-2',
    courseId: '3',
    title: 'Design Principles and Fundamentals',
    description: 'Master the core principles of design including typography, color theory, and layout.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 2,
    isCompleted: false
  },
  {
    id: '3-3',
    courseId: '3',
    title: 'User Research and Personas',
    description: 'Learn how to conduct user research and create user personas for better design decisions.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 3,
    isCompleted: false
  },
  {
    id: '3-4',
    courseId: '3',
    title: 'Information Architecture',
    description: 'Organize and structure information to create intuitive user experiences.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 4,
    isCompleted: false
  },
  {
    id: '3-5',
    courseId: '3',
    title: 'Wireframing and Sketching',
    description: 'Create wireframes and sketches to plan your design before moving to digital tools.',
    duration: 1500, // 25 minutes
    videoUrl: '',
    order: 5,
    isCompleted: false
  },
  {
    id: '3-6',
    courseId: '3',
    title: 'Figma Basics and Interface',
    description: 'Learn to use Figma for creating wireframes, mockups, and interactive prototypes.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 6,
    isCompleted: false
  },
  {
    id: '3-7',
    courseId: '3',
    title: 'Component Design and Systems',
    description: 'Create reusable design components and maintainable design systems.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 7,
    isCompleted: false
  },
  {
    id: '3-8',
    courseId: '3',
    title: 'Prototyping and Interactions',
    description: 'Build interactive prototypes to test and validate your design concepts.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 8,
    isCompleted: false
  },
  {
    id: '3-9',
    courseId: '3',
    title: 'Usability Testing',
    description: 'Learn how to conduct usability tests and gather feedback from users.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 9,
    isCompleted: false
  },
  {
    id: '3-10',
    courseId: '3',
    title: 'Design Handoff and Collaboration',
    description: 'Effectively hand off designs to developers and collaborate with team members.',
    duration: 1500, // 25 minutes
    videoUrl: '',
    order: 10,
    isCompleted: false
  },

  // Course 4: Mobile App Development with React Native (20 lessons)
  {
    id: '4-1',
    courseId: '4',
    title: 'Introduction to React Native',
    description: 'Learn the basics of React Native and cross-platform mobile development.',
    duration: 1800, // 30 minutes
    videoUrl: 'https://www.youtube.com/watch?v=JKccS9k56_I',
    order: 1,
    isCompleted: false
  },
  {
    id: '4-2',
    courseId: '4',
    title: 'Setting Up Development Environment',
    description: 'Configure your development environment for React Native development.',
    duration: 1200, // 20 minutes
    videoUrl: '',
    order: 2,
    isCompleted: false
  },
  {
    id: '4-3',
    courseId: '4',
    title: 'React Native Components',
    description: 'Learn about core React Native components and their usage.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 3,
    isCompleted: false
  },
  {
    id: '4-4',
    courseId: '4',
    title: 'Navigation and Routing',
    description: 'Implement navigation between screens using React Navigation.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 4,
    isCompleted: false
  },
  {
    id: '4-5',
    courseId: '4',
    title: 'State Management with Redux',
    description: 'Manage application state using Redux in React Native apps.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 5,
    isCompleted: false
  },
  {
    id: '4-6',
    courseId: '4',
    title: 'API Integration and Networking',
    description: 'Connect your app to backend APIs and handle network requests.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 6,
    isCompleted: false
  },
  {
    id: '4-7',
    courseId: '4',
    title: 'Local Storage and Data Persistence',
    description: 'Store data locally using AsyncStorage and SQLite databases.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 7,
    isCompleted: false
  },
  {
    id: '4-8',
    courseId: '4',
    title: 'Push Notifications',
    description: 'Implement push notifications to engage users and provide updates.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 8,
    isCompleted: false
  },
  {
    id: '4-9',
    courseId: '4',
    title: 'App Performance Optimization',
    description: 'Optimize your React Native app for better performance and user experience.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 9,
    isCompleted: false
  },
  {
    id: '4-10',
    courseId: '4',
    title: 'Testing and Debugging',
    description: 'Learn testing strategies and debugging techniques for React Native apps.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 10,
    isCompleted: false
  },

  // Course 5: Machine Learning Fundamentals (30 lessons)
  {
    id: '5-1',
    courseId: '5',
    title: 'Introduction to Machine Learning',
    description: 'Understand the basics of machine learning and its applications.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 1,
    isCompleted: false
  },
  {
    id: '5-2',
    courseId: '5',
    title: 'Mathematics for Machine Learning',
    description: 'Learn essential mathematical concepts including linear algebra and calculus.',
    duration: 3600, // 60 minutes
    videoUrl: '',
    order: 2,
    isCompleted: false
  },
  {
    id: '5-3',
    courseId: '5',
    title: 'Supervised Learning Basics',
    description: 'Introduction to supervised learning algorithms and concepts.',
    duration: 3000, // 50 minutes
    videoUrl: '',
    order: 3,
    isCompleted: false
  },
  {
    id: '5-4',
    courseId: '5',
    title: 'Linear Regression',
    description: 'Implement and understand linear regression for prediction tasks.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 4,
    isCompleted: false
  },
  {
    id: '5-5',
    courseId: '5',
    title: 'Logistic Regression',
    description: 'Learn logistic regression for classification problems.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 5,
    isCompleted: false
  },
  {
    id: '5-6',
    courseId: '5',
    title: 'Decision Trees and Random Forests',
    description: 'Master decision tree algorithms and ensemble methods.',
    duration: 3000, // 50 minutes
    videoUrl: '',
    order: 6,
    isCompleted: false
  },
  {
    id: '5-7',
    courseId: '5',
    title: 'Support Vector Machines (SVM)',
    description: 'Learn SVM for classification and regression tasks.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 7,
    isCompleted: false
  },
  {
    id: '5-8',
    courseId: '5',
    title: 'Unsupervised Learning',
    description: 'Introduction to clustering and dimensionality reduction techniques.',
    duration: 3000, // 50 minutes
    videoUrl: '',
    order: 8,
    isCompleted: false
  },
  {
    id: '5-9',
    courseId: '5',
    title: 'K-Means Clustering',
    description: 'Implement K-means clustering for data segmentation.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 9,
    isCompleted: false
  },
  {
    id: '5-10',
    courseId: '5',
    title: 'Neural Networks Fundamentals',
    description: 'Learn the basics of artificial neural networks and deep learning.',
    duration: 3600, // 60 minutes
    videoUrl: '',
    order: 10,
    isCompleted: false
  },

  // Course 6: Digital Marketing Strategy (12 lessons)
  {
    id: '6-1',
    courseId: '6',
    title: 'Introduction to Digital Marketing',
    description: 'Overview of digital marketing landscape and modern marketing strategies.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 1,
    isCompleted: false
  },
  {
    id: '6-2',
    courseId: '6',
    title: 'Search Engine Optimization (SEO)',
    description: 'Learn SEO techniques to improve website visibility and organic traffic.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 2,
    isCompleted: false
  },
  {
    id: '6-3',
    courseId: '6',
    title: 'Content Marketing Strategy',
    description: 'Develop effective content marketing strategies to engage your audience.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 3,
    isCompleted: false
  },
  {
    id: '6-4',
    courseId: '6',
    title: 'Social Media Marketing',
    description: 'Master social media platforms and create engaging marketing campaigns.',
    duration: 2700, // 45 minutes
    videoUrl: '',
    order: 4,
    isCompleted: false
  },
  {
    id: '6-5',
    courseId: '6',
    title: 'Email Marketing Campaigns',
    description: 'Design and execute effective email marketing campaigns for lead generation.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 5,
    isCompleted: false
  },
  {
    id: '6-6',
    courseId: '6',
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Learn Google Ads and Facebook Ads for targeted digital advertising.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 6,
    isCompleted: false
  },
  {
    id: '6-7',
    courseId: '6',
    title: 'Marketing Analytics and Metrics',
    description: 'Track and analyze marketing performance using key metrics and tools.',
    duration: 2100, // 35 minutes
    videoUrl: '',
    order: 7,
    isCompleted: false
  },
  {
    id: '6-8',
    courseId: '6',
    title: 'Conversion Rate Optimization',
    description: 'Optimize websites and landing pages to improve conversion rates.',
    duration: 1800, // 30 minutes
    videoUrl: '',
    order: 8,
    isCompleted: false
  },
  {
    id: '6-9',
    courseId: '6',
    title: 'Marketing Automation',
    description: 'Implement marketing automation tools to streamline campaigns.',
    duration: 1500, // 25 minutes
    videoUrl: '',
    order: 9,
    isCompleted: false
  },
  {
    id: '6-10',
    courseId: '6',
    title: 'Digital Marketing Strategy Planning',
    description: 'Create comprehensive digital marketing strategies for businesses.',
    duration: 2400, // 40 minutes
    videoUrl: '',
    order: 10,
    isCompleted: false
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Anurag Kumar',
  email: 'akanuragkumar2005@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
  enrolledCourses: ['1', '2'],
  completedLessons: ['1-1', '1-2'],
  totalProgress: 35
};

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Learn to build modern websites and web applications',
    icon: '🌐',
    courseCount: 15
  },
  {
    id: '2',
    name: 'Data Science',
    description: 'Master data analysis, machine learning, and AI',
    icon: '📊',
    courseCount: 12
  },
  {
    id: '3',
    name: 'Design',
    description: 'Create beautiful user interfaces and experiences',
    icon: '🎨',
    courseCount: 8
  },
  {
    id: '4',
    name: 'Mobile Development',
    description: 'Build apps for iOS and Android platforms',
    icon: '📱',
    courseCount: 10
  },
  {
    id: '5',
    name: 'Marketing',
    description: 'Learn digital marketing strategies and techniques',
    icon: '📈',
    courseCount: 6
  }
];

export const mockProgress: Progress[] = [
  {
    courseId: '1',
    completedLessons: ['1-1', '1-2'],
    totalLessons: 24,
    percentage: 8.33,
    lastAccessed: '2024-01-25T10:30:00Z'
  },
  {
    courseId: '2',
    completedLessons: [],
    totalLessons: 18,
    percentage: 0,
    lastAccessed: '2024-01-24T15:45:00Z'
  }
]; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Award, 
  Calendar,
  Play,
  CheckCircle,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { mockCourses, mockProgress, mockUser } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const enrolledCourses = mockCourses.filter(course => 
    mockUser.enrolledCourses.includes(course.id)
  );

  const getCourseProgress = (courseId: string) => {
    const progress = mockProgress.find(p => p.courseId === courseId);
    return progress ? progress.percentage : 0;
  };

  const totalProgress = enrolledCourses.reduce((acc, course) => {
    return acc + getCourseProgress(course.id);
  }, 0) / enrolledCourses.length;

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: enrolledCourses.length,
      change: '+2 this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: '24.5',
      change: '+8.2 this week',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: '3',
      change: '+1 this month',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Target,
      label: 'Goals Achieved',
      value: '12',
      change: '+3 this week',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentActivity = [
    {
      type: 'lesson_completed',
      title: 'Completed HTML Basics',
      course: 'Complete Web Development Bootcamp',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'course_enrolled',
      title: 'Enrolled in Python for Data Science',
      course: 'Python for Data Science',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      type: 'lesson_started',
      title: 'Started CSS Styling',
      course: 'Complete Web Development Bootcamp',
      time: '3 days ago',
      icon: Play,
      color: 'text-purple-600'
    },
    {
      type: 'certificate_earned',
      title: 'Earned JavaScript Certificate',
      course: 'Complete Web Development Bootcamp',
      time: '1 week ago',
      icon: Award,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                  Welcome back, <span className="text-primary-600">{user?.name || 'Learner'}</span>! 👋
                </h1>
                <p className="text-secondary-600">
                  Continue your learning journey and track your progress
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enrolled Courses */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary-900">
                    Your Courses
                  </h2>
                  <Link
                    to="/courses"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View All
                  </Link>
                </div>

                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <CourseCard 
                          course={course} 
                          showProgress={true}
                          progress={getCourseProgress(course.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="card text-center py-12">
                    <BookOpen className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      No courses enrolled yet
                    </h3>
                    <p className="text-secondary-600 mb-6">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Link to="/courses" className="btn-primary">
                      Browse Courses
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Overall Progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Overall Progress
                </h3>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - totalProgress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-secondary-900">
                        {Math.round(totalProgress)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-secondary-600">
                    {enrolledCourses.length} courses in progress
                  </p>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 ${activity.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-secondary-500 truncate">
                          {activity.course}
                        </p>
                        <p className="text-xs text-secondary-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Learning Goals */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Learning Goals
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-900">
                        Complete 5 courses
                      </p>
                      <p className="text-xs text-secondary-500">
                        3 of 5 completed
                      </p>
                    </div>
                    <div className="w-16 h-2 bg-secondary-200 rounded-full">
                      <div className="w-12 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-900">
                        Learn 50 hours
                      </p>
                      <p className="text-xs text-secondary-500">
                        24.5 of 50 hours
                      </p>
                    </div>
                    <div className="w-16 h-2 bg-secondary-200 rounded-full">
                      <div className="w-8 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-900">
                        Earn 5 certificates
                      </p>
                      <p className="text-xs text-secondary-500">
                        3 of 5 earned
                      </p>
                    </div>
                    <div className="w-16 h-2 bg-secondary-200 rounded-full">
                      <div className="w-10 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 
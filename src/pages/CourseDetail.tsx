import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Circle,
  BookOpen,
  Download,
  Share2,
  Heart,
  Award,
  Trophy
} from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import { mockCourses, mockLessons, mockProgress } from '../data/mockData';
import { Course, Lesson } from '../types';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import databaseService from '../services/database';
import certificateService from '../services/certificateService';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [certificateMessage, setCertificateMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login with current course URL as redirect destination
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
      return;
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Show brief message when redirecting to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-secondary-400" />
          </div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Authentication Required</h2>
          <p className="text-secondary-600">Please log in to access this course.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Only load course data if user is authenticated
    if (!isAuthenticated) return;

    const foundCourse = mockCourses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      const courseLessons = mockLessons.filter(l => l.courseId === id);
      setLessons(courseLessons);
      if (courseLessons.length > 0) {
        setCurrentLesson(courseLessons[0]);
      }
    }

    // Check if user is enrolled
    setIsEnrolled(['1', '2'].includes(id || ''));
    
    // Get progress
    const courseProgress = mockProgress.find(p => p.courseId === id);
    if (courseProgress) {
      setProgress(courseProgress.percentage);
    }

    // Check course completion status
    if (user && id) {
      checkCourseCompletion();
    }
  }, [id, isAuthenticated, user]);

  const checkCourseCompletion = async () => {
    if (!user || !id) return;
    
    try {
      const completed = await databaseService.isCourseCompleted(user.id, id, lessons.length);
      setIsCourseCompleted(completed);
    } catch (error) {
      console.error('Error checking course completion:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`;
  };

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleVideoProgress = (progress: number) => {
    // Update lesson progress
    if (currentLesson) {
      // In a real app, this would save to backend
      console.log(`Lesson ${currentLesson.title} progress: ${progress}%`);
    }
  };

  const handleVideoComplete = async () => {
    if (currentLesson && user) {
      try {
        // Mark lesson as completed in database
        const result = await databaseService.markLessonCompleted(user.id, currentLesson.id);
        
        if (result.success) {
          // Update local state
          setLessons(prev => prev.map(lesson => 
            lesson.id === currentLesson.id 
              ? { ...lesson, isCompleted: true }
              : lesson
          ));

          // Check if course is now completed
          await checkCourseCompletion();
        }
      } catch (error) {
        console.error('Error marking lesson as completed:', error);
      }
    }
  };

  const handleDownloadCertificate = async () => {
    if (!user || !course) return;

    try {
      setCertificateMessage(null);
      const result = await certificateService.generateCertificate(
        user,
        course.title,
        course.instructor,
        formatDuration(course.duration)
      );

      if (result.success) {
        setCertificateMessage({ type: 'success', message: result.message });
      } else {
        setCertificateMessage({ type: 'error', message: result.message });
      }
    } catch (error) {
      setCertificateMessage({ type: 'error', message: 'Failed to generate certificate' });
    }
  };

  const enrollInCourse = () => {
    setIsEnrolled(true);
    // In a real app, this would make an API call
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-secondary-400" />
          </div>
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Course not found</h2>
          <p className="text-secondary-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Course Header */}
      <section className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <span className="text-secondary-500">•</span>
                  <span className="text-secondary-600">{course.category}</span>
                  {isCourseCompleted && (
                    <>
                      <span className="text-secondary-500">•</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    </>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  {course.title}
                </h1>

                {isEnrolled && user && (
                  <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <p className="text-primary-700 text-sm">
                      Welcome back, <span className="font-semibold">{user.name}</span>! Continue your learning journey.
                    </p>
                  </div>
                )}

                <p className="text-lg text-secondary-600 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-secondary-900">Created by</p>
                      <p className="text-secondary-600">{course.instructor}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-secondary-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students enrolled</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card sticky top-24"
              >
                <div className="relative mb-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <span className={`text-3xl font-bold ${
                      course.price === 0 ? 'text-green-600' : 'text-secondary-900'
                    }`}>
                      {formatPrice(course.price)}
                    </span>
                    {course.price === 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-green-600 font-medium">
                          🎉 All courses are completely free!
                        </span>
                      </div>
                    )}
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-secondary-600 mb-2">Your Progress</p>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-secondary-600 mt-1">{Math.round(progress)}% Complete</p>
                      </div>
                      
                      {isCourseCompleted ? (
                        <div className="space-y-3">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-green-800 mb-1">Course Completed!</h3>
                            <p className="text-sm text-green-700">Congratulations on completing this course!</p>
                          </div>
                          <button 
                            onClick={handleDownloadCertificate}
                            className="btn-primary w-full flex items-center justify-center space-x-2"
                          >
                            <Award className="w-5 h-5" />
                            <span>Download Certificate</span>
                          </button>
                        </div>
                      ) : (
                        <button className="btn-primary w-full">
                          Continue Learning
                        </button>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={enrollInCourse}
                      className="btn-primary w-full"
                    >
                      Enroll Now
                    </button>
                  )}

                  <div className="border-t border-secondary-200 pt-4">
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors duration-200">
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                        <span>{isLiked ? 'Liked' : 'Like'}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors duration-200">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors duration-200">
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Message */}
      {certificateMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            certificateMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {certificateMessage.type === 'success' ? (
              <Award className="w-5 h-5" />
            ) : (
              <BookOpen className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{certificateMessage.message}</span>
          </div>
        </motion.div>
      )}

      {/* Course Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {currentLesson ? (
                  <VideoPlayer
                    url={currentLesson.videoUrl}
                    title={currentLesson.title}
                    onProgress={handleVideoProgress}
                    onComplete={handleVideoComplete}
                  />
                ) : (
                  <div className="bg-secondary-100 rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                      <p className="text-secondary-600">Select a lesson to start learning</p>
                    </div>
                  </div>
                )}

                {currentLesson && (
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                      {currentLesson.title}
                    </h2>
                    <p className="text-secondary-600 mb-4">
                      {currentLesson.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-secondary-500">
                      <span>{formatDuration(currentLesson.duration)}</span>
                      <span>•</span>
                      <span>Lesson {currentLesson.order}</span>
                      {currentLesson.isCompleted && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 font-medium flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Completed</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Lesson List */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Course Content
                </h3>
                
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        currentLesson?.id === lesson.id
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-secondary-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-secondary-400" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            currentLesson?.id === lesson.id
                              ? 'text-primary-600'
                              : 'text-secondary-900'
                          }`}>
                            {lesson.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Course Completion Status */}
                {isCourseCompleted && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Course Completed!</span>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      You've successfully completed all lessons in this course.
                    </p>
                    <button 
                      onClick={handleDownloadCertificate}
                      className="w-full btn-primary py-2 flex items-center justify-center space-x-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail; 
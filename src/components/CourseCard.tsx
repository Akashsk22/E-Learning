import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Play } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
}

const CourseCard = ({ course, showProgress = false, progress = 0 }: CourseCardProps) => {
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

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group cursor-pointer"
    >
      <Link to={`/courses/${course.id}`}>
        {/* Course Image */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Level Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
              course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {course.level}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              course.price === 0 
                ? 'bg-green-500 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-secondary-900'
            }`}>
              {formatPrice(course.price)}
            </span>
          </div>
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-secondary-600 mt-1 line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-2">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-secondary-600">{course.instructor}</span>
          </div>

          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-secondary-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(course.duration)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Progress</span>
                <span className="text-secondary-900 font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-md">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard; 
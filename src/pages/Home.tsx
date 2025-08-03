import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Users, 
  Award, 
  Clock, 
  ArrowRight, 
  Star,
  BookOpen,
  TrendingUp,
  Globe
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { mockCourses, mockCategories } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const featuredCourses = mockCourses.slice(0, 6);
  const stats = [
    { icon: Users, value: '50K+', label: 'Active Students' },
    { icon: BookOpen, value: '200+', label: 'Courses Available' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: Globe, value: '150+', label: 'Countries' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {isAuthenticated && user ? (
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary-100 mb-2">
                    Welcome back, <span className="text-yellow-300 font-bold">{user.name}</span>! 👋
                  </h2>
                  <p className="text-lg text-primary-200">
                    Ready to continue your learning journey?
                  </p>
                </div>
              ) : null}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Learn Without
                <span className="text-yellow-300"> Limits</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
                Access world-class education from anywhere. Master new skills with 
                expert-led courses designed for your success.
              </p>
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-4 mb-8">
                <p className="text-green-100 text-lg font-semibold flex items-center space-x-2">
                  <span>🎉</span>
                  <span>All courses are completely FREE!</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Students learning"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">Learning Progress</p>
                      <p className="text-lg font-bold text-secondary-900">87% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</h3>
                <p className="text-secondary-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Choose from a wide range of topics and start your learning journey today
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="card group cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-secondary-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-secondary-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{category.courseCount} courses</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Discover our most popular courses and start learning from industry experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/courses"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Join thousands of satisfied learners who have transformed their careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                             {
                 name: "Shreya Singh",
                 role: "Web Developer",
                 avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                 text: "The web development course completely changed my career path. The instructors are amazing and the content is up-to-date with industry standards.",
                 rating: 5
               },
              {
                name: "Anshu Kumar",
                role: "Data Scientist",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                text: "Excellent platform for learning data science. The practical projects helped me build a strong portfolio and land my dream job.",
                rating: 5
              },
              {
                name: "Pihu Sharma",
                role: "UI/UX Designer",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                text: "The design courses are comprehensive and well-structured. I learned modern design tools and principles that I use daily in my work.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-secondary-900">{testimonial.name}</h4>
                    <p className="text-sm text-secondary-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
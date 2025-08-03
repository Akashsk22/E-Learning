import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Edit3,
  Save,
  X,
  Shield,
  Bell,
  Globe,
  Palette,
  AlertCircle,
  CheckCircle,
  Upload,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate learner and technology enthusiast. Always eager to learn new skills and share knowledge with others.',
    website: 'https://johndoe.dev',
    twitter: '@johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    avatar: user?.avatar || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setMessage(null);
    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar
    });
    
    if (result.success) {
      setMessage({ type: 'success', message: result.message });
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', message: result.message });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Passionate learner and technology enthusiast. Always eager to learn new skills and share knowledge with others.',
      website: 'https://johndoe.dev',
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
    setMessage(null);
  };

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
                  Profile Settings
                </h1>
                <p className="text-secondary-600">
                  Welcome, <span className="text-primary-600 font-semibold">{user?.name || 'Learner'}</span>! Manage your account settings and preferences
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" color="white" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg flex items-center space-x-2 mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{message.message}</span>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={formData.avatar || user?.avatar || 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face'}
                    alt={formData.name || user?.name || 'User'}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  {isEditing && (
                    <div className="absolute bottom-6 right-1/2 transform translate-x-1/2 flex space-x-2">
                      <button className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors duration-200">
                        <Upload className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                  {formData.name}
                </h2>
                <p className="text-secondary-600 mb-4">{formData.email}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-secondary-600">
                    <MapPin className="w-4 h-4" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-secondary-600">
                    <Phone className="w-4 h-4" />
                    <span>{formData.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-secondary-900">12</p>
                      <p className="text-sm text-secondary-600">Courses</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary-900">8</p>
                      <p className="text-sm text-secondary-600">Certificates</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary-900">156</p>
                      <p className="text-sm text-secondary-600">Hours</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-6">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-6">
                    Social Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Twitter
                      </label>
                      <input
                        type="text"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-6">
                    Account Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-secondary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">Two-Factor Authentication</p>
                          <p className="text-sm text-secondary-600">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="btn-secondary">Enable</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-secondary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">Email Notifications</p>
                          <p className="text-sm text-secondary-600">Manage your notification preferences</p>
                        </div>
                      </div>
                      <button className="btn-secondary">Configure</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-secondary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">Language</p>
                          <p className="text-sm text-secondary-600">English (US)</p>
                        </div>
                      </div>
                      <button className="btn-secondary">Change</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Palette className="w-5 h-5 text-secondary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">Theme</p>
                          <p className="text-sm text-secondary-600">Light mode</p>
                        </div>
                      </div>
                      <button className="btn-secondary">Change</button>
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

export default Profile; 
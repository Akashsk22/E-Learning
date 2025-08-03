# E-Learning Platform

A modern, interactive e-learning platform built with React, TypeScript, and Tailwind CSS. Features course listing, progress tracking, video embedding, user authentication with database storage, and a beautiful multi-page interface.

## 🚀 Features

### Core Features
- **Course Listing**: Browse and search through available courses
- **Progress Tracking**: Monitor your learning progress across all enrolled courses
- **Video Embedding**: Watch course videos with a custom video player
- **Multi-page Interface**: Navigate between different sections seamlessly
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Authentication & Database
- **User Registration**: Create accounts with email validation and database storage
- **User Login**: Secure authentication with database verification
- **Session Management**: Persistent login with token-based sessions
- **Profile Management**: Edit profiles with real-time database updates
- **Protected Routes**: Secure access to dashboard and profile pages
- **Database Storage**: Complete localStorage-based database system
- **Admin Panel**: Development panel for database management

### User Experience
- **Interactive Animations**: Smooth page transitions and hover effects using Framer Motion
- **Modern UI/UX**: Clean, professional design with intuitive navigation
- **Search & Filter**: Find courses by category, level, and search terms
- **User Dashboard**: Track learning statistics and enrolled courses
- **Profile Management**: Update personal information and preferences

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing for seamless navigation
- **Tailwind CSS**: Utility-first styling with custom design system
- **Component Architecture**: Reusable, modular components
- **Mock Data**: Simulated API responses for development

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Video Player**: React Player
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS, Autoprefixer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar with auth integration
│   ├── Footer.tsx      # Footer component
│   ├── CourseCard.tsx  # Course display card
│   ├── VideoPlayer.tsx # Custom video player
│   ├── ProtectedRoute.tsx # Route protection component
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── AdminPanel.tsx  # Database management panel
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Courses.tsx     # Course listing
│   ├── CourseDetail.tsx # Individual course view
│   ├── Dashboard.tsx   # User dashboard
│   ├── Profile.tsx     # User profile
│   ├── Login.tsx       # Login page
│   └── Register.tsx    # Registration page
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state management
├── services/           # Database and API services
│   └── database.ts     # Database service for user management
├── data/               # Mock data
│   └── mockData.ts     # Sample data for development
├── types/              # TypeScript type definitions
│   └── index.ts        # User, Course, Lesson interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`primary-500` to `primary-700`)
- **Secondary**: Gray scale (`secondary-50` to `secondary-900`)
- **Accent**: Green for success states

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Animations
- **Fade In**: `fade-in` class for smooth element appearance
- **Slide Up**: `slide-up` class for upward transitions
- **Pulse**: `pulse-slow` for attention-grabbing elements

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with call-to-action
- Learning statistics
- Course categories
- Featured courses
- Testimonials

### Courses Page (`/courses`)
- Course grid/list view toggle
- Search and filtering
- Category and level filters
- Sorting options

### Course Detail (`/courses/:id`)
- Course information and description
- Video player for lessons
- Lesson list with progress
- Course enrollment

### Dashboard (`/dashboard`)
- Learning statistics
- Enrolled courses with progress
- Recent activity
- Learning goals

### Profile (`/profile`)
- Personal information editing
- Account settings
- Social links
- Preferences

### Authentication
- **Login** (`/login`): Email/password and social login
- **Register** (`/register`): New user registration

## 🔧 Customization

### Adding New Components
1. Create a new file in `src/components/`
2. Export the component as default
3. Import and use in your pages

### Modifying Styles
- Edit `src/index.css` for global styles
- Use Tailwind classes for component-specific styling
- Modify `tailwind.config.js` for theme customization

### Adding New Pages
1. Create a new file in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation if needed

## 📊 Data Structure

### Course Interface
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  price: number;
  category: string;
  tags: string[];
}
```

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: string[];
  completedLessons: string[];
  totalProgress: number;
}
```

## 🗄️ Database System

The application includes a complete localStorage-based database system:

### User Management
- **User Registration**: Stores new users with unique IDs and timestamps
- **Email Validation**: Prevents duplicate email registrations
- **Password Storage**: Stores passwords (in production, these would be hashed)
- **User Profiles**: Complete user profile management with updates

### Session Management
- **Session Tokens**: Secure token-based session management
- **Session Validation**: Automatic validation of session tokens
- **Session Expiration**: Automatic cleanup of expired sessions
- **Persistent Login**: Users stay logged in across browser refreshes

### Database Schema
```typescript
// Users Table
interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  enrolledCourses: string[];
  completedLessons: string[];
  totalProgress: number;
  createdAt: string;
  updatedAt: string;
}

// Sessions Table
interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}
```

### Admin Panel
The application includes a development admin panel (red database icon in bottom-right corner) that provides:
- **Database Statistics**: View number of registered users and active sessions
- **Data Management**: Clear all database data for testing
- **Real-time Updates**: Refresh statistics in real-time

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [React Player](https://github.com/cookpete/react-player) - Video player

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@example.com]

---

**Happy Learning! 🎓** 
import { User } from '../types';

// Database keys
const USERS_KEY = 'edulearn_users';
const SESSIONS_KEY = 'edulearn_sessions';

// User interface for database storage
interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  avatar: string;
  enrolledCourses: string[];
  completedLessons: string[];
  totalProgress: number;
  createdAt: string;
  updatedAt: string;
  provider?: string; // For social authentication
  socialId?: string; // For social authentication
}

// Session interface
interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}

class DatabaseService {
  // Initialize database
  private initDatabase() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(SESSIONS_KEY)) {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify([]));
    }
  }

  // Get all users
  private getUsers(): StoredUser[] {
    this.initDatabase();
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to database
  private saveUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Get all sessions
  private getSessions(): Session[] {
    this.initDatabase();
    const sessions = localStorage.getItem(SESSIONS_KEY);
    return sessions ? JSON.parse(sessions) : [];
  }

  // Save sessions to database
  private saveSessions(sessions: Session[]) {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }

  // Check if email already exists
  async checkEmailExists(email: string): Promise<boolean> {
    const users = this.getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Check if social user exists
  async checkSocialUserExists(socialId: string, provider: string): Promise<boolean> {
    const users = this.getUsers();
    return users.some(user => user.socialId === socialId && user.provider === provider);
  }

  // Register or login social user
  async registerSocialUser(userData: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    provider: 'google' | 'github';
  }): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = this.getUsers();
      
      // Check if social user already exists
      const existingUser = users.find(user => 
        user.socialId === userData.id && user.provider === userData.provider
      );

      if (existingUser) {
        // User exists, return existing user data
        const user: User = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          avatar: existingUser.avatar,
          enrolledCourses: existingUser.enrolledCourses,
          completedLessons: existingUser.completedLessons,
          totalProgress: existingUser.totalProgress
        };
        return { success: true, message: 'Social login successful!', user };
      }

      // Check if email already exists with different provider
      const emailExists = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (emailExists) {
        // Link social account to existing email account
        emailExists.socialId = userData.id;
        emailExists.provider = userData.provider;
        emailExists.avatar = userData.avatar || emailExists.avatar;
        emailExists.updatedAt = new Date().toISOString();
        
        this.saveUsers(users);

        const user: User = {
          id: emailExists.id,
          name: emailExists.name,
          email: emailExists.email,
          avatar: emailExists.avatar,
          enrolledCourses: emailExists.enrolledCourses,
          completedLessons: emailExists.completedLessons,
          totalProgress: emailExists.totalProgress
        };
        return { success: true, message: 'Account linked successfully!', user };
      }

      // Create new social user
      const newUser: any = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
        enrolledCourses: [],
        completedLessons: [],
        totalProgress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        provider: userData.provider,
        socialId: userData.id
      };

      users.push(newUser);
      this.saveUsers(users);

      const user: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        enrolledCourses: newUser.enrolledCourses,
        completedLessons: newUser.completedLessons,
        totalProgress: newUser.totalProgress
      };

      return { success: true, message: 'Social registration successful!', user };
    } catch (error) {
      console.error('Social registration error:', error);
      return { success: false, message: 'An error occurred during social registration' };
    }
  }

  // Register a new user
  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Check if email already exists
      const emailExists = await this.checkEmailExists(userData.email);
      if (emailExists) {
        return { success: false, message: 'Email already registered' };
      }

      // Create new user
      const newUser: StoredUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In production, hash this password
        avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
        enrolledCourses: [],
        completedLessons: [],
        totalProgress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to database
      const users = this.getUsers();
      users.push(newUser);
      this.saveUsers(users);

      // Convert to User type (without password)
      const user: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        enrolledCourses: newUser.enrolledCourses,
        completedLessons: newUser.completedLessons,
        totalProgress: newUser.totalProgress
      };

      return { success: true, message: 'Registration successful!', user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration' };
    }
  }

  // Authenticate user
  async authenticateUser(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = this.getUsers();
      const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );

      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Create session
      const session: Session = {
        userId: user.id,
        token: this.generateToken(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };

      const sessions = this.getSessions();
      sessions.push(session);
      this.saveSessions(sessions);

      // Convert to User type (without password)
      const userData: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        enrolledCourses: user.enrolledCourses,
        completedLessons: user.completedLessons,
        totalProgress: user.totalProgress
      };

      return { success: true, message: 'Login successful!', user: userData };
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const users = this.getUsers();
      const user = users.find(u => u.id === userId);
      
      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        enrolledCourses: user.enrolledCourses,
        completedLessons: user.completedLessons,
        totalProgress: user.totalProgress
      };
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Update user profile
  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return { success: false, message: 'User not found' };
      }

      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.saveUsers(users);

      // Convert to User type (without password)
      const updatedUser: User = {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        avatar: users[userIndex].avatar,
        enrolledCourses: users[userIndex].enrolledCourses,
        completedLessons: users[userIndex].completedLessons,
        totalProgress: users[userIndex].totalProgress
      };

      return { success: true, message: 'Profile updated successfully!', user: updatedUser };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'An error occurred while updating profile' };
    }
  }

  // Mark lesson as completed
  async markLessonCompleted(userId: string, lessonId: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return { success: false, message: 'User not found' };
      }

      const user = users[userIndex];
      
      // Add lesson to completed lessons if not already completed
      if (!user.completedLessons.includes(lessonId)) {
        user.completedLessons.push(lessonId);
        user.updatedAt = new Date().toISOString();
        
        this.saveUsers(users);
      }

      // Convert to User type (without password)
      const updatedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        enrolledCourses: user.enrolledCourses,
        completedLessons: user.completedLessons,
        totalProgress: user.totalProgress
      };

      return { success: true, message: 'Lesson marked as completed!', user: updatedUser };
    } catch (error) {
      console.error('Mark lesson completed error:', error);
      return { success: false, message: 'An error occurred while marking lesson as completed' };
    }
  }

  // Get user's completed lessons for a specific course
  async getCompletedLessonsForCourse(userId: string, courseId: string): Promise<string[]> {
    try {
      const users = this.getUsers();
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        return [];
      }

      // Filter completed lessons for the specific course
      // This assumes lesson IDs contain the course ID
      return user.completedLessons.filter(lessonId => lessonId.includes(courseId));
    } catch (error) {
      console.error('Get completed lessons error:', error);
      return [];
    }
  }

  // Check if user has completed a specific course
  async isCourseCompleted(userId: string, courseId: string, totalLessons: number): Promise<boolean> {
    try {
      const completedLessons = await this.getCompletedLessonsForCourse(userId, courseId);
      return completedLessons.length >= totalLessons;
    } catch (error) {
      console.error('Check course completion error:', error);
      return false;
    }
  }

  // Get course progress percentage
  async getCourseProgress(userId: string, courseId: string, totalLessons: number): Promise<number> {
    try {
      const completedLessons = await this.getCompletedLessonsForCourse(userId, courseId);
      if (totalLessons === 0) return 0;
      return Math.round((completedLessons.length / totalLessons) * 100);
    } catch (error) {
      console.error('Get course progress error:', error);
      return 0;
    }
  }

  // Validate session
  async validateSession(token: string): Promise<User | null> {
    try {
      const sessions = this.getSessions();
      const session = sessions.find(s => s.token === token);
      
      if (!session) return null;

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        // Remove expired session
        const updatedSessions = sessions.filter(s => s.token !== token);
        this.saveSessions(updatedSessions);
        return null;
      }

      return await this.getUserById(session.userId);
    } catch (error) {
      console.error('Session validation error:', error);
      return null;
    }
  }

  // Logout user (remove session)
  async logout(token: string): Promise<void> {
    try {
      const sessions = this.getSessions();
      const updatedSessions = sessions.filter(s => s.token !== token);
      this.saveSessions(updatedSessions);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Generate a simple token (in production, use proper JWT)
  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Clear all data (for testing)
  clearDatabase(): void {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSIONS_KEY);
  }

  // Get database stats (for debugging)
  getDatabaseStats(): { users: number; sessions: number } {
    const users = this.getUsers();
    const sessions = this.getSessions();
    return {
      users: users.length,
      sessions: sessions.length
    };
  }
}

export default new DatabaseService(); 
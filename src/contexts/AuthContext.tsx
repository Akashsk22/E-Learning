import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import databaseService from '../services/database';
import socialAuthService from '../services/socialAuth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  loginWithGitHub: () => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>;
  checkPersistentLogin: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Check for existing user session on app load
  useEffect(() => {
    checkPersistentLogin();
  }, []);

  const checkPersistentLogin = async () => {
    try {
      // First check for regular session token
      const token = localStorage.getItem('sessionToken');
      if (token) {
        setSessionToken(token);
        // Validate session
        const user = await databaseService.validateSession(token);
        if (user) {
          setUser(user);
          setIsLoading(false);
          return;
        } else {
          // Session expired or invalid
          localStorage.removeItem('sessionToken');
          setSessionToken(null);
        }
      }

      // Check for social login tokens
      const socialResult = await socialAuthService.checkPersistentLogin();
      if (socialResult.success && socialResult.user) {
        // Register or login social user
        const result = await databaseService.registerSocialUser({
          id: socialResult.user.id,
          name: socialResult.user.name,
          email: socialResult.user.email,
          avatar: socialResult.user.avatar,
          provider: socialResult.user.provider
        });

        if (result.success && result.user) {
          setUser(result.user);
          // Create session token for social user
          const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
          setSessionToken(token);
          localStorage.setItem('sessionToken', token);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Auth initialization error:', error);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      const result = await databaseService.authenticateUser(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        // Store session token
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        setSessionToken(token);
        localStorage.setItem('sessionToken', token);
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      const result = await socialAuthService.loginWithGoogle();
      
      if (result.success && result.user) {
        // Register or login social user
        const dbResult = await databaseService.registerSocialUser({
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          avatar: result.user.avatar,
          provider: result.user.provider
        });

        if (dbResult.success && dbResult.user) {
          setUser(dbResult.user);
          // Create session token for social user
          const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
          setSessionToken(token);
          localStorage.setItem('sessionToken', token);
          return { success: true, message: dbResult.message };
        } else {
          return { success: false, message: dbResult.message };
        }
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during Google login' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async (): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      const result = await socialAuthService.loginWithGitHub();
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during GitHub login' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Logout from social providers
      await socialAuthService.logout();
      
      // Logout from regular session
      if (sessionToken) {
        await databaseService.logout(sessionToken);
      }
      
      setUser(null);
      setSessionToken(null);
      localStorage.removeItem('sessionToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Client-side validation
      if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }
      
      if (userData.password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }
      
      // Check if email already exists
      const emailExists = await databaseService.checkEmailExists(userData.email);
      if (emailExists) {
        return { success: false, message: 'Email already registered' };
      }
      
      // Register user in database
      const result = await databaseService.registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      
      if (result.success && result.user) {
        setUser(result.user);
        // Create session after registration
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        setSessionToken(token);
        localStorage.setItem('sessionToken', token);
        return { success: true, message: 'Registration successful!' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      if (user) {
        const result = await databaseService.updateUser(user.id, userData);
        
        if (result.success && result.user) {
          setUser(result.user);
          return { success: true, message: 'Profile updated successfully!' };
        } else {
          return { success: false, message: result.message };
        }
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred while updating profile' };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    register,
    updateProfile,
    checkPersistentLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
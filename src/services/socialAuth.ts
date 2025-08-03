import { User } from '../types';

// Social login providers
export type SocialProvider = 'google' | 'github';

// Social user data interface
interface SocialUserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: SocialProvider;
}

class SocialAuthService {
  private readonly GOOGLE_CLIENT_ID = 'demo-google-client-id';
  private readonly GITHUB_CLIENT_ID = 'demo-github-client-id';
  private readonly REDIRECT_URI = window.location.origin + '/auth/callback';

  // Google OAuth login (Demo mode)
  async loginWithGoogle(): Promise<{ success: boolean; user?: SocialUserData; message: string }> {
    try {
      // Simulate a delay to make it feel more realistic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, simulate Google login
      const mockGoogleUser: SocialUserData = {
        id: `google_${Date.now()}`,
        name: 'Demo Google User',
        email: 'demo.google@example.com',
        avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
        provider: 'google'
      };

      localStorage.setItem('google_id_token', 'demo_token_' + Date.now());

      return { success: true, user: mockGoogleUser, message: 'Google login successful! (Demo Mode)' };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, message: 'Google login failed. Please try again.' };
    }
  }

  // GitHub OAuth login (Demo mode)
  async loginWithGitHub(): Promise<{ success: boolean; user?: SocialUserData; message: string }> {
    try {
      // Store the intended redirect URL
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('github_redirect_after_login', currentPath);
      
      // For demo purposes, simulate GitHub redirect
      console.log('Redirecting to GitHub OAuth... (Demo Mode)');
      
      // Simulate the redirect by showing a demo message
      alert('Demo Mode: In a real app, this would redirect to GitHub OAuth. For now, we\'ll simulate the login.');
      
      // Simulate successful GitHub login
      const mockGitHubUser: SocialUserData = {
        id: `github_${Date.now()}`,
        name: 'Demo GitHub User',
        email: 'demo.github@example.com',
        avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
        provider: 'github'
      };

      localStorage.setItem('github_access_token', 'demo_token_' + Date.now());

      return { success: true, user: mockGitHubUser, message: 'GitHub login successful! (Demo Mode)' };
    } catch (error) {
      console.error('GitHub login error:', error);
      return { success: false, message: 'GitHub login failed. Please try again.' };
    }
  }

  // Handle GitHub OAuth callback (Demo mode)
  async handleGitHubCallback(code: string): Promise<{ success: boolean; user?: SocialUserData; message: string }> {
    try {
      const mockGitHubUser: SocialUserData = {
        id: `github_${Date.now()}`,
        name: 'Demo GitHub User',
        email: 'demo.github@example.com',
        avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
        provider: 'github'
      };

      localStorage.setItem('github_access_token', 'demo_token_' + Date.now());

      return { success: true, user: mockGitHubUser, message: 'GitHub login successful! (Demo Mode)' };
    } catch (error) {
      console.error('GitHub callback error:', error);
      return { success: false, message: 'GitHub login failed. Please try again.' };
    }
  }

  // Check if user has persistent social login
  async checkPersistentLogin(): Promise<{ success: boolean; user?: SocialUserData; message: string }> {
    try {
      const googleToken = localStorage.getItem('google_id_token');
      if (googleToken) {
        const mockGoogleUser: SocialUserData = {
          id: 'google_persistent_user',
          name: 'Demo Google User',
          email: 'demo.google@example.com',
          avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
          provider: 'google'
        };
        return { success: true, user: mockGoogleUser, message: 'Persistent Google login found! (Demo Mode)' };
      }

      const githubToken = localStorage.getItem('github_access_token');
      if (githubToken) {
        const mockGitHubUser: SocialUserData = {
          id: 'github_persistent_user',
          name: 'Demo GitHub User',
          email: 'demo.github@example.com',
          avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop&crop=face',
          provider: 'github'
        };
        return { success: true, user: mockGitHubUser, message: 'Persistent GitHub login found! (Demo Mode)' };
      }

      return { success: false, message: 'No persistent login found' };
    } catch (error) {
      console.error('Persistent login check error:', error);
      return { success: false, message: 'Error checking persistent login' };
    }
  }

  // Logout from social providers
  async logout(): Promise<void> {
    try {
      localStorage.removeItem('google_id_token');
      localStorage.removeItem('github_access_token');
      localStorage.removeItem('github_redirect_after_login');
    } catch (error) {
      console.error('Social logout error:', error);
    }
  }

  // Get redirect URL after GitHub login
  getGitHubRedirectUrl(): string | null {
    return localStorage.getItem('github_redirect_after_login');
  }

  // Clear redirect URL
  clearGitHubRedirectUrl(): void {
    localStorage.removeItem('github_redirect_after_login');
  }
}

const socialAuthService = new SocialAuthService();
export default socialAuthService;

declare global {
  interface Window {
    gapi?: any;
  }
} 
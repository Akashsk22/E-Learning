import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import socialAuthService from '../services/socialAuth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithGitHub } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage('Authentication was cancelled or failed');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }

        // Handle GitHub callback
        const result = await socialAuthService.handleGitHubCallback(code);
        
        if (result.success && result.user) {
          // Register or login the user
          const loginResult = await loginWithGitHub();
          
          if (loginResult.success) {
            setStatus('success');
            setMessage('Authentication successful! Redirecting...');
            
            // Get the redirect URL from storage
            const redirectUrl = socialAuthService.getGitHubRedirectUrl();
            socialAuthService.clearGitHubRedirectUrl();
            
            setTimeout(() => {
              navigate(redirectUrl || '/dashboard');
            }, 2000);
          } else {
            setStatus('error');
            setMessage(loginResult.message);
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          }
        } else {
          setStatus('error');
          setMessage(result.message);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('An error occurred during authentication');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithGitHub]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 text-primary-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                Processing Authentication
              </h2>
              <p className="text-secondary-600">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                Authentication Successful!
              </h2>
              <p className="text-secondary-600">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                Authentication Failed
              </h2>
              <p className="text-secondary-600">{message}</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthCallback; 
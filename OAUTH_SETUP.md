# OAuth Setup Guide

This guide will help you set up Google and GitHub OAuth authentication for the E-Learning platform.

## Google OAuth Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### 2. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "E-Learning Platform"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`
5. Add test users if needed

### 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - Your production domain
6. Copy the Client ID

### 4. Update Configuration
Replace `your-google-client-id` in `src/services/socialAuth.ts` with your actual Google Client ID:

```typescript
private readonly GOOGLE_CLIENT_ID = 'your-actual-google-client-id';
```

## GitHub OAuth Setup

### 1. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: "E-Learning Platform"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/callback`
4. Click "Register application"
5. Copy the Client ID

### 2. Update Configuration
Replace `your-github-client-id` in `src/services/socialAuth.ts` with your actual GitHub Client ID:

```typescript
private readonly GITHUB_CLIENT_ID = 'your-actual-github-client-id';
```

## Environment Variables (Recommended)

For better security, you can use environment variables:

1. Create a `.env` file in the root directory:
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GITHUB_CLIENT_ID=your-github-client-id
```

2. Update `src/services/socialAuth.ts`:
```typescript
private readonly GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
private readonly GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'your-github-client-id';
```

## Testing

1. Start the development server: `npm run dev`
2. Try logging in with Google or GitHub
3. Check that the authentication flow works correctly
4. Verify that users are redirected back to the original page after login

## Production Deployment

When deploying to production:

1. Update the authorized origins and redirect URIs in your OAuth apps
2. Use environment variables for the client IDs
3. Ensure HTTPS is enabled for production domains
4. Update the callback URL to your production domain

## Troubleshooting

### Common Issues:

1. **"Invalid client" error**: Check that your client ID is correct
2. **"Redirect URI mismatch"**: Ensure the redirect URI in your OAuth app matches exactly
3. **"Origin not allowed"**: Add your domain to the authorized JavaScript origins
4. **CORS errors**: Make sure your domain is in the authorized origins list

### Debug Tips:

1. Check the browser console for errors
2. Verify that the Google API script is loading correctly
3. Ensure all environment variables are set correctly
4. Test with both development and production URLs

## Security Notes

- Never commit your actual OAuth client IDs to version control
- Use environment variables for sensitive configuration
- Regularly rotate your OAuth client secrets
- Monitor your OAuth app usage for suspicious activity
- Implement proper error handling and user feedback 
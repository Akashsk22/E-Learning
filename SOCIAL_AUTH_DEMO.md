# Social Authentication Demo Guide

## 🎉 **Demo Mode is Active!**

The E-Learning platform now includes **Google and GitHub authentication** with **persistent login** functionality. The current implementation is in **Demo Mode** for easy testing.

## 🚀 **How to Test**

### **1. Start the Application**
```bash
npm run dev
```
The app will be available at `http://localhost:3001/` (or the next available port)

### **2. Test Social Login**

#### **Google Login:**
1. Go to `/login` or `/register`
2. Click "Continue with Google"
3. You'll see a demo message and be logged in as "Demo Google User"
4. The login will persist across browser sessions

#### **GitHub Login:**
1. Go to `/login` or `/register`
2. Click "Continue with GitHub"
3. You'll see a demo alert explaining the redirect
4. Click OK to simulate successful GitHub login
5. You'll be logged in as "Demo GitHub User"

### **3. Test Course Access**
1. Try accessing a course without logging in
2. You'll be redirected to login
3. Use social login to authenticate
4. You'll be redirected back to the course
5. You can now access the course content

### **4. Test Persistent Login**
1. Log in with Google or GitHub
2. Close the browser
3. Reopen the browser and go to the app
4. You should still be logged in automatically

## 🔧 **Features Working**

✅ **Google OAuth** (Demo Mode)
✅ **GitHub OAuth** (Demo Mode)
✅ **Persistent Login** across sessions
✅ **Course Access Protection**
✅ **Automatic Redirect** after login
✅ **Session Management**
✅ **Logout Functionality**

## 🎯 **Demo User Data**

### **Google Demo User:**
- Name: "Demo Google User"
- Email: "demo.google@example.com"
- Avatar: Default avatar image

### **GitHub Demo User:**
- Name: "Demo GitHub User"
- Email: "demo.github@example.com"
- Avatar: Default avatar image

## 🔄 **Authentication Flow**

1. **User clicks social login button**
2. **Demo mode simulates OAuth flow**
3. **User data is created and stored**
4. **Session token is generated**
5. **User is redirected to original destination**
6. **Login persists across browser sessions**

## 🛠️ **Real OAuth Setup**

To use real OAuth providers:

1. Follow the `OAUTH_SETUP.md` guide
2. Replace demo client IDs in `src/services/socialAuth.ts`
3. Configure your OAuth apps with real credentials
4. Update the authentication methods to use real OAuth APIs

## 🧪 **Testing Scenarios**

### **Scenario 1: New User Registration**
1. Go to `/register`
2. Click "Continue with Google"
3. Verify user is created and logged in
4. Check that user data is stored

### **Scenario 2: Existing User Login**
1. Log in with Google
2. Log out
3. Log in again with Google
4. Verify same user data is retrieved

### **Scenario 3: Course Access**
1. Go to `/courses/1` without logging in
2. Verify redirect to login page
3. Log in with social provider
4. Verify redirect back to course
5. Verify course content is accessible

### **Scenario 4: Persistent Login**
1. Log in with any social provider
2. Close browser completely
3. Reopen browser and go to app
4. Verify automatic login

## 🔍 **Debug Information**

### **Check Local Storage:**
- `google_id_token`: Google authentication token
- `github_access_token`: GitHub authentication token
- `sessionToken`: App session token
- `github_redirect_after_login`: Redirect URL for GitHub

### **Console Logs:**
- Social authentication events are logged
- Error messages for debugging
- Demo mode indicators

## 🎨 **UI Features**

- **Loading states** during authentication
- **Success/error messages**
- **Smooth animations**
- **Responsive design**
- **Accessibility support**

## 🔒 **Security Notes**

- Demo mode uses mock tokens
- Real implementation would validate tokens
- Session tokens are properly managed
- Logout clears all tokens
- HTTPS required for production

## 🚀 **Next Steps**

1. **Test all scenarios** above
2. **Configure real OAuth** if needed
3. **Deploy to production** with real credentials
4. **Monitor authentication** logs
5. **Implement additional** security measures

---

**Enjoy testing the social authentication features!** 🎉 
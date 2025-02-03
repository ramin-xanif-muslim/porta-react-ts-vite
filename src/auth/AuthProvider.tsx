import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    // Check if there's an auth token in the URL (OAuth2 callback)
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      // Exchange the code for an access token
      exchangeCodeForToken(code);
    } else {
      // Check if we have a valid token in storage
      checkAuthStatus();
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    try {
      // Make API call to your backend to exchange the code for a token
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      setIsAuthenticated(false);
    }
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  };

  const login = () => {
    // Redirect to OAuth2 provider's login page
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
    const redirectUri = encodeURIComponent(window.location.origin + '/callback');
    const authUrl = `https://app-vms-identity-test-cqfjgpfmdpfhd8cp.germanywestcentral-01.azurewebsites.net/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = authUrl;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  // If user is not authenticated and not on the callback route, redirect to login
  if (!isAuthenticated && location.pathname !== '/callback') {
    login();
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
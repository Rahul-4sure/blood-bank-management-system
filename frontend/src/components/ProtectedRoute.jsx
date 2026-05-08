import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, handleAuthError, restoreSessionFromCookie } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      if (isTokenValid()) {
        if (isMounted) {
          setIsAuthenticated(true);
          setIsCheckingAuth(false);
        }
        return;
      }

      const restored = await restoreSessionFromCookie().catch(() => false);

      if (!isMounted) return;

      if (restored && isTokenValid()) {
        setIsAuthenticated(true);
      } else {
        handleAuthError(navigate);
      }

      setIsCheckingAuth(false);
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isCheckingAuth) return null;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

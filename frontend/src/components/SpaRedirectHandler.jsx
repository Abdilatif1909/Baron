import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SpaRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('spa-redirect');
    if (redirectPath) {
      sessionStorage.removeItem('spa-redirect');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return null;
}

export default SpaRedirectHandler;

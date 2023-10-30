"use client"
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    else {
      setRedirecting(false);
    }
  }, []);

  if (redirecting) {
    return null; 
  }

  return children;
};

export default PrivateRoute;

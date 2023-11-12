"use client"
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
export function useDecodedToken() {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.sub) {
          setDecodedToken(decoded.sub);
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setDecodedToken(null);
      }
    }
  }, []);

  return decodedToken;
}

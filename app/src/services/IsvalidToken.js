const isTokenValid = (token) => {
    if (!token) {
      return false; 
    }
  
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1])); 
  
      if (tokenData.exp) {
        const expirationTime = tokenData.exp * 1000; 
        const currentTime = Date.now();
  
        if (currentTime >= expirationTime) {
          localStorage.removeItem('token');
          return false; 
        }
  
        return true;
      }
      
      return true; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      localStorage.removeItem('token');
      return false; 
    }
  };
  
  export default isTokenValid;
  
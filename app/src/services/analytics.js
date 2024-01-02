"use client"
import ReactGA from 'react-ga';

export const initGA = () => {
    console.log('Google Analytics está sendo inicializado...');
  ReactGA.initialize('G-LCHFKNEDK7'); 
};

export const logPageView = () => {
    console.log('Página visualizada:', window.location.pathname);

  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};

import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage'; // Import your Login page component
import Menu from './pages/Menu';
import RegisterPage from './pages/RegisterPage';
import Job from './pages/Job'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App(){
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole'); 
    setUserRole(role);
  }, []);

  if (userRole === null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/job" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/job" element={<Job />} />
      </Routes>
    </BrowserRouter>
  );
};
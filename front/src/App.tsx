import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Menu from './pages/Menu';
import RegisterPage from './pages/RegisterPage';
import Job from './pages/Job'
import Job_Emp from './pages/Job_Emp';
import Posting from './pages/JobPosting';
import Detail from './pages/Detail';


export default function App(){
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userID,setUserID]=useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem('user_role'));
    setUserID(localStorage.getItem('user_id'));
  }, []);

  if (userRole === null || userID===null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/job" element={<LoginPage />} />
          <Route path="/job_emp" element={<LoginPage />} />
          <Route path="/posting" element={<LoginPage />} />
          <Route path="/detail/:jobId" element={<LoginPage />} />

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
          <Route path="/job_emp" element={<Job_Emp />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/detail/:jobId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};
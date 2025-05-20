import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'; // Import Mantine notifications styles
import './global.css';
import { MantineProvider } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import IssueForm from './components/IssueForm/IssueForm';
import Navbar from './components/Navbar/Navbar';
import { Notifications } from '@mantine/notifications';
import React from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="top-right" zIndex={1000} />
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/issue-form"
                    element={
                      <ProtectedRoute>
                        <IssueForm />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

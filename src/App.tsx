import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'; // Import Mantine notifications styles
import './global.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import IssueForm from './components/IssueForm/IssueForm';
import Navbar from './components/Navbar/Navbar';
import { Notifications } from '@mantine/notifications';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// };

export default function App() {
  return (
    <MantineProvider
      defaultColorScheme="dark" // Set default color scheme to dark
    >
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
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/issue-form" element={<IssueForm />} />
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
